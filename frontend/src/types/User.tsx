export interface User {
    id: number;
    username: string;
    role: UserRole;
}

export enum UserRole {
    USER = 'user',
    ADMIN = 'admin'
}

export type PartialUser = Partial<User>;