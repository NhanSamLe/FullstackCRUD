import axios from "../util/base";

export interface Register{
    name: string;
    email: string;
    password: string;
}
export interface Login{
    email: string;
    password: string;
}
export interface SearchFilters {
  brand?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  cpu?: string;
  ram?: string;
  storage?: string;
}

export const register = (data: Register) => {
    return axios.post("/register", data);
};
export const login = async (data: Login) => {
  const res = await axios.post("/login", data);
  if (res.data?.token) {   // đổi accessToken thành token
    localStorage.setItem("token", res.data.token);
  }
  return res;
};
export const getProfile = () => {
    return axios.get("/users");
};

export const getProducts = async (page: number = 1) => {
  const res = await axios.get(`/product?page=${page}`);
  return res.data;
};

// Lấy tất cả categories
export const getCategories = async () => {
  const res = await axios.get("/cate");   
  return res.data;
};

// Lấy sản phẩm theo categoryId
export const getProductsByCategory = async (categoryId: string, page = 1, limit = 10) => {
  const res = await axios.get(`/product/category/${categoryId}?page=${page}&limit=${limit}`);
  return res.data; 
};

// export const fuzzySearch = async(keyword: string, page =1 , limit =10 )=> {
//   const res = await axios.get(`/product/search?keyword=${encodeURIComponent(keyword)}&page=${page}&limit=${limit}`);
//   return res.data;
// }

export const fuzzySearch = async (
  keyword: string,
  page = 1,
  limit = 10,
  filters: SearchFilters = {}
) => {
  const res = await axios.get("/product/search", {
    params: { keyword, page, limit, ...filters },
  });
  return res.data;
};

