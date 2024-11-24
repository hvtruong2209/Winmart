import { Accordion, AccordionDetails, AccordionSummary, CircularProgress } from "@mui/material";
import { OrderService } from "api/Order";
import { useEffect, useState } from "react";
import { getUnitProduct, getUrlImage } from "Utils";
import { getFormatCurrencyVND } from "Utils/Image";

interface IOrderListCart {
  status: number;
}

export const OrderListCart = (props: IOrderListCart) => {
  const { status } = props;
  const userId = localStorage.getItem("userId") || "";
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getOrderByStatus = async () => {
    const response = await OrderService.getOrdersByStatus(userId, status);
    setOrders(response);
  };

  useEffect(() => {
    setLoading(true);
    getOrderByStatus();
    setLoading(false);
  }, [status]);
  const convertDateTime = (input: string) => {
    const date = new Date(input);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${hours}:${minutes} ${day}-${month}-${year}`;
  };

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : orders?.length <= 0 ? (
        <div className="w-full flex justify-center">
          <div className="empty-cart">
            <img
              src={getUrlImage("findno.png")}
              style={{ width: 150, marginBottom: 16, display: "inline-block" }}
              alt="logo"
            />
            <div>Không có đơn hàng nào.</div>
          </div>
        </div>
      ) : (
        <div className="p-[20px] pt-[40px] pb-[40px] w-full cart-list-items">
          {orders?.map((order, index) => {
            return (
              <div key={index} className="mb-3">
                <Accordion className="w-full" style={{ border: "1px solid red" }}>
                  <AccordionSummary
                    // expandIcon={<ExpandMoreIc />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    style={{
                      width: "100%",
                      display: "flex",
                      // justifyContent: "space-between",
                    }}
                  >
                    {/* <div style={{ fontWeight: 600 }}>OrderId: {order?.id.slice(0, 7)}</div> */}
                    <div className="text-overflow w-[100px]">{order?.customerName}</div>
                    <div className="text-overflow w-[180px]">
                      {order?.payMethod === 0 ? "Thanh toán COD" : "Thanh toán Online"}
                    </div>
                    <span className="text-overflow w-[220px]">Thời gian: {convertDateTime(order?.modifiedTime)}</span>
                    <div className="flex-1">Địa chỉ: {order?.customerAddress}</div>
                    <div style={{ fontWeight: 600, textAlign: "right" }} className="text-overflow w-[100px]">
                      {getFormatCurrencyVND(order?.total || 0)}
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    {order?.details.map((pro: any) => {
                      return (
                        <div
                          key={pro.productId}
                          className="mb-4"
                          style={{
                            borderBottom: "1px solid rgb(247, 247, 247)",
                          }}
                        >
                          <div className="flex flex-col">
                            <div
                              style={{
                                fontWeight: 600,
                                fontSize: 16,
                                marginLeft: 20,
                              }}
                            >
                              {pro?.productName}
                            </div>
                          </div>
                          <div></div>
                          <div className="flex justify-between pr-10 pl-10">
                            <img src={pro?.imgUrl} alt="none" className="w-[80px]"></img>
                            <div>Số lượng: {pro?.quantity}</div>
                            <div>ĐVT: {getUnitProduct(pro?.unit)}</div>
                            <div>{getFormatCurrencyVND(pro?.salesPrice || 0)}</div>
                          </div>
                        </div>
                      );
                    })}
                  </AccordionDetails>
                </Accordion>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
