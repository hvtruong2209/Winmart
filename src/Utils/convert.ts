import { UnitProduct } from "model";

export const getUnitProduct = (unit: number) => {
  switch (unit) {
    case UnitProduct.Chai:
      return "Chai";
    case UnitProduct.Goi:
      return "Gói";
    case UnitProduct.Goi_4:
      return "Gói 4 bịch";
    case UnitProduct.Goi_6:
      return "Gói 6 bịch";
    case UnitProduct.KG:
      return "KG";
    case UnitProduct.Thung:
      return "Thùng";
    default:
      return "Chai";
  }
};

export function getFormattedDate() {
  const daysOfWeek = ["Chủ nhật", "Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7"];
  const today = new Date();
  const day = today.getDate();
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const dayOfWeek = daysOfWeek[today.getDay()];
  const formattedDate = `Hôm nay ${day}/${month}/${year}`;
  const formattedDayOfWeek = `${dayOfWeek} ${day + 1}/${month}/${year}`;

  return { formattedDate, formattedDayOfWeek };
}
