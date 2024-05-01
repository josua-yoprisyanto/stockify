export const getToken = () => {
  return localStorage.getItem("token") ? localStorage.getItem("token") : "";
};
