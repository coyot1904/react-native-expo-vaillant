import { Address } from "./address";
export type Customer = {
  id: string;
  _id: number;
  address: Address;
  avatar: string;
  birthday: string;
  email: string;
  firstName: string;
  lastName: string;
  sex: "male" | "female" | "other";
  subscriptionTier: "free" | "premium" | "business";
};
