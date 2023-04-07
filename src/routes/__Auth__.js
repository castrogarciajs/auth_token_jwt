import { Router } from "express";
import * as controller_authentication from "../controllers/__Auth__.js";

const __Auth__ = Router();

__Auth__.post("/register", controller_authentication.register);
__Auth__.post("/login", controller_authentication.login);

export { __Auth__ };
