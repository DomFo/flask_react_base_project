export interface User {
    id: number;
    username: string;
    role: UserRole;
    isAdmin: boolean;
    confirmed: boolean;
}

export enum UserRole {
    USER = 'user',
    ATHLETE = 'athlete',
    RESEARCHER = 'researcher',
    ADMIN = 'admin'
}

export type PartialUser = Partial<User>;