"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//instatiate
const app = (0, express_1.default)();
// create a port
const port = process.env.PORT;
//create a route
app.get("/", (req, res, next) => {
    res.send("<h1>It worked !! <br/> Helloggg !</h1>");
});
//listen to resuest
app.listen(port);
