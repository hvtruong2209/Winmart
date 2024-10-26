import "./index.scss";
import { Button } from "@mui/material";
import { useState } from "react";
import { MailOutline, HeadsetMic } from "@mui/icons-material";
import {
  Dehaze as DehazeIcon,
  AccountCircle as AccountCircleIcon,
  AddShoppingCart as AddShoppingCartIcon,
} from "@mui/icons-material";
import { getUrlImage } from "Utils";
import { useNavigate } from "react-router-dom";
const options = [
  {
    id: 1,
    title: "Giá siêu rẻ",
  },
  {
    id: 2,
    title: "Sản phẩm khuyến mãi",
  },
  {
    id: 3,
    title: "Uư đãi hội viên",
  },
  {
    id: 4,
    title: "Sữa các loại",
  },
  {
    id: 5,
    title: "Hoa quả",
  },
  {
    id: 6,
    title: "Rau củ trái cây",
    subTitle: [
      {
        title: "Rau",
      },
      {
        title: "Củ",
      },
      {
        title: "Quả",
      },
    ],
  },
  {
    id: 7,
    title: "Bánh kẹo",
  },
  {
    id: 8,
    title: "Đồ uống có cồn",
  },
];
export const ClientNav = (props: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [optionsSubmenu, setOptionsSubmenu] = useState<any[]>([]);
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const openSubMenu = (isOpen: boolean, item?: any) => {
    if (isOpen) {
      setOptionsSubmenu(item.subTitle);
    }
  };

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
            onClick={() => {
              navigate("/login");
            }}
          >
            <AccountCircleIcon style={{ color: "#fff" }} /> <span>Hội viên</span>
          </div>
        </div>
      </div>
      <div className="menu-nav">
        <div className="wrap-container">
          <div className="container-menu">
            <Button
              id="fade-button"
              aria-controls={open ? "fade-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              style={{ color: "#000", fontSize: 13 }}
              onMouseEnter={() => setIsOpenMenu(true)}
            >
              <DehazeIcon style={{ marginRight: 10 }} />
              <span>Danh mục sản phẩm</span>
            </Button>

            {isOpenMenu && (
              <div className="menu">
                {options?.map((el, index) => {
                  return (
                    <div
                      key={index}
                      className="flex justify-between menu-item"
                      onMouseEnter={() => openSubMenu(true, el)}
                      onMouseLeave={() => openSubMenu(false)}
                    >
                      <div>{el.title}</div>
                      {el?.subTitle && el?.subTitle?.length > 0 && <div style={{ fontSize: 12 }}>{`>`}</div>}
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
                      <div>{el?.title}</div>
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
