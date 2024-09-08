import { ClientNav } from "component/clientnav";
import { Footer } from "component/footer";
import { getUrlImage } from "Utils";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import RemoveIcon from "@mui/icons-material/Remove";
import "./index.scss";
import { ButtonCustom } from "component/button";
export const Cart = () => {
  return (
    <>
      <div className="bg-bgGray">
        <ClientNav />
        <div className="flex justify-center">
          <div className="cart container-wrap flex flex-col  bg-white">
            <div className="cart-left">
              <div className="cart-item">
                <div>
                  <img src={getUrlImage("delivery.jpg")} alt="none"></img>
                  <div className="flex flex-col">
                    <div>Nuoc sieu sach</div>
                    <div>DVT: Can</div>
                  </div>
                </div>
                <div>
                  <span>40.000</span>
                  <span>112.000</span>
                </div>
                <div className="select-number">
                  <ButtonCustom
                    type="secondary"
                    style={{ color: "ed1c24", borderColor: "ed1c24" }}
                    aria-label="reduce"
                    onClick={() => {
                      // setCount(Math.max(count - 1, 0));
                    }}
                  >
                    <RemoveIcon style={{ color: "ed1c24" }} fontSize="small" />
                  </ButtonCustom>
                  <div className="number">1</div>

                  <ButtonCustom
                    type="secondary"
                    style={{ color: "ed1c24", borderColor: "ed1c24" }}
                    aria-label="increase"
                    onClick={() => {
                      // setCount(count + 1);
                    }}
                  >
                    <AddIcon style={{ color: "ed1c24" }} fontSize="small" />
                  </ButtonCustom>
                  <CloseIcon style={{ color: "ed1c24" }} />
                </div>
              </div>
            </div>
            <div className="cart-right"></div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};
