import { Router } from "express";
import * as controller_product from "../controllers/__Product__.js";
import { token } from "../middlewares/__index__.js";

const __Product__ = Router();

__Product__.get("/product", controller_product.get_product);

__Product__.post(
  "/product",
  [token.verify_token, token.is_moderator, token.is_admin],
  controller_product.create_product
);

__Product__.put(
  "/product/:id",
  [token.verify_token, token.is_admin],
  controller_product.update_product
);

__Product__.delete(
  "/product/:id",
  [token.verify_token, token.is_admin],
  controller_product.delete_product
);

__Product__.get("/product/:id", controller_product.get_product_id);

export { __Product__ };
