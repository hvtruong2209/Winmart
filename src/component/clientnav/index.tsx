import "./index.scss";
import { Button, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { MailOutline, HeadsetMic } from "@mui/icons-material";
import {
  Dehaze as DehazeIcon,
  AccountCircle as AccountCircleIcon,
  AddShoppingCart as AddShoppingCartIcon,
} from "@mui/icons-material";
import { getUrlImage } from "Utils";
import { useNavigate } from "react-router-dom";
import { CategoryService } from "api/Category";
import { ICategory } from "model";
import { LoginService } from "api/Login";
import { useDispatch } from "react-redux";
import { setIsAuth } from "../../redux/authSlice";
const options = [
  {
    id: 1,
    name: "Giá siêu rẻ",
  },
  {
    id: 2,
    name: "Sản phẩm khuyến mãi",
  },
  {
    id: 3,
    name: "Uư đãi hội viên",
  },
  {
    id: 4,
    name: "Sữa các loại",
  },
  {
    id: 5,
    name: "Hoa quả",
  },
  {
    id: 6,
    name: "Rau củ trái cây",
    categories: [
      {
        name: "Rau",
      },
      {
        name: "Củ",
      },
      {
        name: "Quả",
      },
    ],
  },
  {
    id: 7,
    name: "Bánh kẹo",
  },
  {
    id: 8,
    name: "Đồ uống có cồn",
  },
];
export const ClientNav = () => {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("accessToken");
  const [optionsSubmenu, setOptionsSubmenu] = useState<any[]>([]);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false);
  const dispatch = useDispatch();
  const openSubMenu = (isOpen: boolean, item?: any) => {
    if (isOpen) {
      setOptionsSubmenu(item.categories);
    }
  };

  const getCategories = async () => {
    const res = await CategoryService.getCategory();
    setCategories(res.length > 0 ? res : options);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="clientnav">
      <div className="wrap-container main-container">
        <img
          src={getUrlImage("logowhite.svg")}
          style={{ width: 190 }}
          alt="logo"
          onClick={() => {
            navigate("/");
          }}
        />
        <input className="search-input" placeholder="Tìm kiếm" />
        <div className="flex">
          <div
            className="nav-cart"
            onClick={() => {
              navigate("/cart");
            }}
          >
            <AddShoppingCartIcon style={{ color: "#fff" }} /> <span>Giỏ hàng</span>
            <div className="number-product">1</div>
          </div>
          <div
            className="nav-avatar"
            onMouseEnter={() => {
              setIsOpenProfile(true);
            }}
            onMouseLeave={() => {
              setIsOpenProfile(false);
            }}
            onClick={() => {
              if (isAuth) navigate("/customer/profile");
              else navigate("/login");
            }}
          >
            <div>
              <AccountCircleIcon style={{ color: "#fff" }} /> <span>Hội viên</span>
            </div>
            {isOpenProfile && !!isAuth && (
              <div className="nav-avatar-menu">
                <div
                  className="nav-avatar-menu-item-head"
                  onClick={() => {
                    navigate("/login");
                  }}
                ></div>
                <div
                  className="nav-avatar-menu-item"
                  onClick={() => {
                    navigate("/customer/profile");
                  }}
                >
                  Thông tin
                </div>
                <div
                  className="nav-avatar-menu-item"
                  onClick={() => {
                    LoginService.logout(() => {
                      dispatch(setIsAuth(false));
                    });
                    navigate("/");

                    window.location.reload();
                  }}
                >
                  Đăng xuất
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="menu-nav">
        <div className="wrap-container">
          <div className="container-menu">
            <Button
              id="fade-button"
              aria-haspopup="true"
              style={{ color: "#000", fontSize: 13 }}
              onMouseEnter={() => setIsOpenMenu(true)}
            >
              <DehazeIcon style={{ marginRight: 10 }} />
              <span>Danh mục sản phẩm</span>
            </Button>

            {isOpenMenu && (
              <div className="menu">
                {categories?.map((el, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-between menu-item"
                      onMouseEnter={() => openSubMenu(true, el)}
                      onMouseLeave={() => openSubMenu(false)}
                    >
                      <div>{el.name}</div>
                      {el?.categories && el?.categories?.length > 0 && <div style={{ fontSize: 12 }}>{`>`}</div>}
                    </div>
                  );
                })}
              </div>
            )}
            {isOpenMenu && optionsSubmenu?.length > 0 && (
              <div className="sub-menu">
                {optionsSubmenu?.map((el, index) => {
                  return (
                    <div key={index} className="flex justify-between menu-item">
                      <div>{el?.name}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="right">
            <div>
              <MailOutline /> <span>Tin tức WinMart</span>
            </div>
            <div>
              <HeadsetMic />
              <span>Tư vấn mua hàng</span>
            </div>
          </div>
        </div>
      </div>
      {isOpenMenu && (
        <div
          className="mark"
          onMouseEnter={() => {
            setIsOpenMenu(false);
          }}
        ></div>
      )}
    </div>
  );
};
