import { ICustomer } from './ICustomer';

export interface IOrder {
  id: number;
  customer: ICustomer;
  total: number;
  placed: Date;
  fulfilled: Date;
}
