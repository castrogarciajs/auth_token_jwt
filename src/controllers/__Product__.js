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

export async function update_product(req, res) {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).send(product);
}

export async function delete_product(req, res) {
  await Product.findByIdAndDelete(req.params.id);
  res.status(204).json({ message: "NOT CONTENT" });
}

export async function get_product_id(req, res) {
  const product = await Product.findById(req.params.id);

  res.status(200).send(product);
}
