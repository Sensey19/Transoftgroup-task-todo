export interface ITheadTable {
  title: string;
  field: string;
}
export interface IUsers {
  id: number;
  name: string;
  email: string;
  phone: string;
  [key: string]: string | number;
}
export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
