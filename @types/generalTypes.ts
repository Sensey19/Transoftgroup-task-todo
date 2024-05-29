export interface ITheadTable {
  title: string;
  field: string;
}
export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  [key: string]: string | number;
}
