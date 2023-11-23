import { Model } from "mongoose";

// order interface
export interface TOrder {
  productName: string;
  price: number;
  quantity: number;
}

// fullName interface
export interface TFullName {
  firstName: string;
  lastName: string;
}
// Address interface
export interface TAddress {
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
  orders?: Array<TOrder>;
}

export interface UserModelWithMethods extends Model<TUser> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: number): Promise<TUser | null>;
  // eslint-disable-next-line no-unused-vars
  isOrdersHas(id: number): Promise<boolean>;
}
