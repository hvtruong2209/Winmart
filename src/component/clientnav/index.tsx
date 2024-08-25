import logo from "assets/images/logowhite.svg";
import { TextInput } from "component/textfield";
export const ClientNav = (props: any) => {
  return (
    <div className="clientnav">
      <div className="main-container">
        <img src={logo} style={{ width: 190 }}></img>
        <TextInput />
      </div>
    </div>
  );
};
