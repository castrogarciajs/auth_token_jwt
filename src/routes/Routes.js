import { Router } from "express";
import * as controller_product from "./../controllers/Controller.js";

const __router__ = Router();

__router__.get("/product", controller_product.get_product);
__router__.post("/product", controller_product.create_product);
__router__.put("/product/:id", controller_product.update_product);
__router__.delete("/product/:id", controller_product.delete_product);
__router__.get("/product/:id", controller_product.get_product_id);

export { __router__ };
