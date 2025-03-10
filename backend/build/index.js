"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
/* MIDDLEWARE */
app.use(express_1.default.json());
/* ROUTES */
app.get("/api/ping", (_req, res) => {
    console.log("ping reached.");
    res.send("pong");
});
/* PORT */
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
