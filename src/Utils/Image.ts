export const getUrlImage = (name: string) => {
  return `${process.env.REACT_APP_API_URL}/images/${name}`;
};

export const getFormatCurrencyVND = (amount: number) => {
  return amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};
