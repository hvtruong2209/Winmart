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
import { useDispatch, useSelector } from "react-redux";
import { setIsAuth } from "../../redux/authSlice";
import { connect } from "hubConnection";
import { HubConnectionState } from "@microsoft/signalr";
import { CartService } from "api/Cart";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

export const ClientNav = () => {
  const navigate = useNavigate();
  const amountCart = useSelector((state: any) => state.cart.cartAmountProduct);
  const isAuth = localStorage.getItem("accessToken");
  const userId = localStorage.getItem("userId") || "";
  const [optionsSubmenu, setOptionsSubmenu] = useState<any[]>([]);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isOpenProfile, setIsOpenProfile] = useState<boolean>(false);
  const [cart, setCart] = useState<any>(undefined);
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>("");
  const openSubMenu = (isOpen: boolean, item?: any) => {
    if (isOpen) {
      setOptionsSubmenu([...item.categories]);
    }
  };

  const getCategories = async () => {
    const res = await CategoryService.getCategory();
    setCategories(res);
  };

  const onStartConnectedHub = async () => {
    if (connect.state === HubConnectionState.Connected) return;
    await connect
      .start()
      .then(() => {
        console.log("Success connect!");
      })
      .catch(() => console.error("Error connect!"));
  };

  useEffect(() => {
    getCategories();
    onStartConnectedHub();
    getCart();
  }, []);

  useEffect(() => {
    getCart();
  }, [amountCart]);
  const getCart = async () => {
    const res = await CartService.getCart(userId);
    setCart(res);
  };

  return (
    <div className="clientnav">
      <div className="wrap-container main-container">
        {/* <img
          src={getUrlImage("logowhite.svg")}
          style={{ width: 190 }}
          alt="logo"
          onClick={() => {
            navigate("/");
          }}
        /> */}
        <div
          className="text-logo"
          onClick={() => {
            navigate("/");
          }}
        >
          SHmarket
        </div>
        <div className="search-input-container">
          <input
            className="search-input"
            placeholder="Tìm kiếm"
            value={search}
            onChange={(e: any) => {
              setSearch(e.target.value);
            }}
            onKeyDown={(e: any) => {
              if (e.key === "Enter") {
                const params = new URLSearchParams({ keyword: search });
                navigate(`/search?${params.toString()}`);
              }
            }}
          />
          <SearchOutlinedIcon
            className="icon-search"
            onClick={() => {
              const params = new URLSearchParams({ keyword: search });
              navigate(`/search?${params.toString()}`);
            }}
          />
        </div>
        <div className="flex">
          <div
            className="nav-cart"
            onClick={() => {
              navigate("/cart");
            }}
          >
            <AddShoppingCartIcon style={{ color: "#fff" }} /> <span>Giỏ hàng</span>
            {cart?.length > 0 && <div className="number-product">{cart.length}</div>}
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
                  <PersonOutlinedIcon className="icon-menuu" /> Thông tin
                </div>
                <div
                  className="nav-avatar-menu-item"
                  onClick={() => {
                    LoginService.logout(() => {
                      dispatch(setIsAuth(false));
                    });
                    navigate("/");
                    // window.location.reload();
                  }}
                >
                  <ExitToAppOutlinedIcon className="icon-menuu" /> Đăng xuất
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

            <div className="menu-container">
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
                  {isOpenMenu && optionsSubmenu?.length > 0 && (
                    <div className="sub-menu">
                      {optionsSubmenu?.map((el, index) => {
                        return (
                          <div
                            key={index}
                            className="flex justify-between menu-item cursor-pointer "
                            onClick={() => {
                              navigate(`/category/${el.id}`);
                            }}
                          >
                            <div className="cursor-pointer">{el?.name}</div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="right">
            <div>
              <MailOutline /> <span>Tin tức SHmarket</span>
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
