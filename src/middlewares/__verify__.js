import { ROLES } from "../models/Role.js";
import Username from "../models/Username.js";

export async function checkout_user(req, res, next) {
  const username = await Username.findOne({ username: req.body.username });

  if (username)
    return res.status(400).json({ message: "El usuario ya existe" });

  const email = await Username.findOne({ username: req.body.email });

  if (email) return res.status(400).json({ message: "El email ya existe" });

  next();
}

export function checkout_roles(req, res, next) {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res
          .status(400)
          .json({ message: `Role: ${req.body.roles[i]} no existe ese rol` });
      }
    }
  }
  next();
}
