import { LoginForm } from "./login.model";

export interface RegisterForm extends LoginForm {

    firstName: string;
    lastName: string;
    birthDate: Date;
    confirmPassword?: string;

}