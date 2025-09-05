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
export const register = (data: Register) => {
    return axios.post("/auth/register", data);
};
export const login = (data: Login) => {
    return axios.post("/auth/login", data);
}
export const getProfile = () => {
    return axios.get("/auth/profile");
};

