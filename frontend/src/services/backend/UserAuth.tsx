import { apiGet, apiPost } from "./common";

export const apiGetUserSession = async () => {
    const response = await apiGet("/users/me");
    console.log(response)
    return response;
};


export const apiLogin = async (username: string, password: string, remember_me: boolean) => {
    const response = await apiPost('/users/login', { username, password, remember_me });
    console.log(response);
    return response;
};


export const apiLogout = async () => {
    const response = await apiPost("/users/logout", {});
    return response;
};