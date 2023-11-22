import { Order } from "../order/order.interface";

// fullName interface
interface TFullName {
  firstName: string;
  lastName: string;
}
// Address interface
interface TAddress {
  street: string;
  city: string;
  country: string;
}

// user interface
export interface TUser {
  userId: number; //uniq
  username: string; //uniq
  password: string; // hash
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: Array<string>;
  address: TAddress;
  orders: Array<Order>;
}
