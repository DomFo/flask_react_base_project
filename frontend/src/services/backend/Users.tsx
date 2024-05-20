import { apiGet, apiDelete, apiPost, apiPatch } from "./common";
import { User } from "../../types/User";

export const apiGetUsers = async () => {
    const response = await apiGet('/users');
    return response.users;
}

export const apiGetUser = async (id: number) => {
    const repsonse = await apiGet(`/users/${id}`);
    return repsonse.json();
}

export const apiDeleteUser = async (id: number) => {
    const response = await apiDelete(`/users/${id}`);
    return response.json();
}


export const apiCreateUser = async (user: Partial<User>) => {
    const reponse = await apiPost('/users', user);
    return reponse.json();
}


export const apiUpdateUser = async (user: Partial<User>) => {
    const reponse = await apiPatch(`/users/${user.id}`, user);
    return reponse.json();
}