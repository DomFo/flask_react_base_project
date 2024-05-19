import { apiGet, apiPost } from "./common";

export const apiGetUserSession = async () => {
    const response = await apiGet("/users/session");
    return response.data;
};


export const apiLogin = async (username: string, password: string, remember_me: boolean) => {
    const response = await apiPost('/users/login', { username, password, remember_me });
    return response.data;
};


export const apiLogout = async () => {
    const response = await apiPost("/users/logout", {});
    return response.data;
};