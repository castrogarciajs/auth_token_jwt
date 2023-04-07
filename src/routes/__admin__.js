import { Router } from "express";
import { token } from "../middlewares/__index__.js";
import * as controller_admin from "../controllers/__admin__.js";

const __admin__ = Router();

__admin__.post(
  "/user",
  [token.verify_token, token.is_admin],
  controller_admin.create_user
);

export { __admin__ };
