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
exports.app.get("/", (req, res) => {
    res.send("Hello World!");
});
