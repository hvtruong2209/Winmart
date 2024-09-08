export const getUrlImage = (name: string) => {
  return `${process.env.REACT_APP_API_URL}/images/${name}`;
};
