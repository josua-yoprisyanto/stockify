export const getPrice = (x: number) => {
  return `Rp. ${x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};
