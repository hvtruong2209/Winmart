import logo from "assets/images/logowhite.svg";
import { TextInput } from "component/textfield";
import "./index.scss";
export const ClientNav = (props: any) => {
  return (
    <div className="clientnav">
      <div className="main-container">
        <img src={logo} style={{ width: 190 }}></img>
        <input className="search-input" />
        <div>Giỏ hàng</div>
        <div>Hội viên</div>
      </div>
    </div>
  );
};
