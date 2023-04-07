import { Router } from "express";
import * as controller_authentication from "../controllers/__Auth__.js";

const __Auth__ = Router();

__Auth__.get("/login", controller_authentication.login);
