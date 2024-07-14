import axios from "axios";

//Getting All Products
export const GetProducts = async () => {
  return axios.get(`${process.env.PUBLIC_URL}/products.json`);
};
