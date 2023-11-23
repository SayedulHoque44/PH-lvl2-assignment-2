"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserZodSchema = exports.FullNameZodSchema = exports.AddressZodSchema = exports.OrderZodSchema = void 0;
const zod_1 = require("zod");
// Order Zodschema
exports.OrderZodSchema = zod_1.z.object({
    productName: zod_1.z.string({ required_error: "Product Name is Required!" }),
    price: zod_1.z
        .number({ required_error: "Price is Required!" })
        .int()
        .positive({ message: "Price must be a positive integer!" }),
    quantity: zod_1.z
        .number({ required_error: "Quantity is Required!" })
        .int()
        .positive({ message: "Quantity must be a positive integer!" }),
});
// Address Zodschema
exports.AddressZodSchema = zod_1.z.object({
    street: zod_1.z.string({ required_error: "Street is Required!" }),
    city: zod_1.z.string({ required_error: "City is Required!" }),
    country: zod_1.z
        .string({ required_error: "Country is Required!" })
        .min(1, { message: "Country is Required!" }),
});
// FullName Zodschema
exports.FullNameZodSchema = zod_1.z.object({
    firstName: zod_1.z.string({ required_error: "First Name is Required!" }),
    lastName: zod_1.z.string({
        required_error: "Last Name is Required!",
    }),
});
// User Zodschema
exports.UserZodSchema = zod_1.z.object({
    userId: zod_1.z.number({ required_error: "UserId is Required!" }),
    username: zod_1.z.string({ required_error: "Username is Required!" }),
    password: zod_1.z
        .string({ required_error: "Password is Required!" })
        .min(6, { message: "Password must be minimum 6 characters" }),
    fullName: exports.FullNameZodSchema.required(),
    age: zod_1.z
        .number({ required_error: "Age is Required!" })
        .int()
        .positive({ message: "Age must be a positive integer!" }),
    email: zod_1.z
        .string({ required_error: "Email is Required!" })
        .email({ message: "Invalid email address!" }),
    isActive: zod_1.z.boolean().default(true),
    hobbies: zod_1.z
        .array(zod_1.z.string(), { required_error: "hobbies is Required" })
        .min(1, { message: "hobbies minimum 1 required!" }),
    address: exports.AddressZodSchema.required(),
    orders: zod_1.z.array(exports.OrderZodSchema).optional(),
});
