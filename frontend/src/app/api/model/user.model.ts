import { Role } from "./role.enum";

export interface User {

    id?: number;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    birthDate?: Date;
    role?: Role;
    authToken?: string;

}
