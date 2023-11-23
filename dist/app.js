"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const user_route_1 = require("./app/modules/user/user.route");
exports.app = (0, express_1.default)();
// middleware
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
// api endpoint
exports.app.use("/api/users/", user_route_1.UserRoutes);
// Global Error handling middleware for reduce server crash
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
exports.app.use((err, req, res, next) => {
    res.status(500).send({
        message: "Something went wrong! :(",
        error: {
            code: 500,
            description: "Please Check Your Data or Code",
            serverError: err,
        },
    });
});
exports.app.get("/", (req, res) => {
    res.send({
        success: true,
        message: " Hello World! let me handle the world :) ",
    });
});
