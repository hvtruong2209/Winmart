export interface IRegisterUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}
export interface ILoginUser {
  email: string;
  password: string;
}
