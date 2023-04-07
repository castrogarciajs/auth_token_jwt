import { Router } from "express";
import { token, verify } from "../middlewares/__index__.js";
import * as controller_admin from "../controllers/__admin__.js";

const __admin__ = Router();

__admin__.post(
  "/user",
  [token.verify_token, token.is_admin, verify.checkout_roles],
  controller_admin.create_user
);

export { __admin__ };
