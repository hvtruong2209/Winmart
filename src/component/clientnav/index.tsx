import "./index.scss";
import { MenuItem, Menu, Button } from "@mui/material";
import { useState } from "react";
import { MailOutline, HeadsetMic } from "@mui/icons-material";
import {
  Dehaze as DehazeIcon,
  AccountCircle as AccountCircleIcon,
  AddShoppingCart as AddShoppingCartIcon,
} from "@mui/icons-material";
import Fade from "@mui/material/Fade";
import { getUrlImage } from "Utils";
const options = [
  "Giá siêu rẻ",
  "Sản phẩm khuyến mãi",
  "Uư đãi hội viên",
  "Sữa các loại",
  "Hoa quả",
  "Rau củ trái cây",
  "Bánh kẹo",
  "Đồ uống có cồn",
  "Chăm sóc cá nhân",
];
export const ClientNav = (props: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (e: any, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <div className="clientnav">
      <div className="wrap-container main-container">
        <img src={getUrlImage("logowhite.svg")} style={{ width: 190 }} alt="logo" />
        <input className="search-input" />
        <div className="nav-cart">
          <AddShoppingCartIcon style={{ color: "#fff" }} /> <span>Giỏ hàng</span>
        </div>
        <div className="nav-avatar">
          <AccountCircleIcon style={{ color: "#fff" }} /> <span>Hội viên</span>
        </div>
      </div>
      <div className="menu-nav">
        <div className="wrap-container">
          <Button
            id="fade-button"
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            style={{ color: "#000", fontSize: 13 }}
          >
            <DehazeIcon style={{ marginRight: 10 }} /> Danh sách danh mục
          </Button>
          <Menu
            id="fade-menu"
            MenuListProps={{
              "aria-labelledby": "fade-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            TransitionComponent={Fade}
          >
            {options.map((option, index) => (
              <MenuItem
                key={option}
                // disabled={index === 0}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))}
          </Menu>
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
    </div>
  );
};
