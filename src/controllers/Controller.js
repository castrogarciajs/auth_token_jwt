import Product from "../models/Product";

export async function get_product(req, res) {
  const products = await Product.find();

  res.status(200).json(products);
}

export async function create_product(req, res) {
  const { name, category, price, photo } = req.body;

  const new_product = new Product({ name, category, price, photo });
  const product_save = await new_product.save();

  res.status(201).json(product_save);
}

export function update_product(req, res) {
  res.send("Actulizando product");
}

export function delete_product(req, res) {
  res.send("Eliminando product");
}

export async function get_product_id(req, res) {
  const id = req.params.id;
  const product = await Product.findById(id);

  res.status(200).send(product);
}
