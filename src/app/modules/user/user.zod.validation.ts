import { z } from "zod";
// Order Zodschema
export const OrderZodSchema = z.object({
  productName: z.string({ required_error: "Product Name is Required!" }),
  price: z
    .number({ required_error: "Price is Required!" })
    .int()
    .positive({ message: "Price must be a positive integer!" }),
  quantity: z
    .number({ required_error: "Quantity is Required!" })
    .int()
    .positive({ message: "Quantity must be a positive integer!" }),
});

// Address Zodschema
export const AddressZodSchema = z.object({
  street: z.string({ required_error: "Street is Required!" }),
  city: z.string({ required_error: "City is Required!" }),
  country: z
    .string({ required_error: "Country is Required!" })
    .min(1, { message: "Country is Required!" }),
});

// FullName Zodschema
export const FullNameZodSchema = z.object({
  firstName: z.string({ required_error: "First Name is Required!" }),
  lastName: z.string({
    required_error: "Last Name is Required!",
  }),
});

// User Zodschema
export const UserZodSchema = z.object({
  userId: z.number({ required_error: "UserId is Required!" }),
  username: z.string({ required_error: "Username is Required!" }),
  password: z
    .string({ required_error: "Password is Required!" })
    .min(6, { message: "Password must be minimum 6 characters" }),
  fullName: FullNameZodSchema.required(),
  age: z
    .number({ required_error: "Age is Required!" })
    .int()
    .positive({ message: "Age must be a positive integer!" }),
  email: z
    .string({ required_error: "Email is Required!" })
    .email({ message: "Invalid email address!" }),
  isActive: z.boolean().default(true),
  hobbies: z
    .array(z.string(), { required_error: "hobbies is Required" })
    .min(1, { message: "hobbies minimum 1 required!" }),
  address: AddressZodSchema.required(),
  orders: z.array(OrderZodSchema).optional(),
});
