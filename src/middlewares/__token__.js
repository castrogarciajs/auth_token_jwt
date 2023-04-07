import jwt from "jsonwebtoken";
import Cg from "../config.js";
import Username from "../models/Username.js";

export async function verify_token(req, res, next) {
  try {
    const token = req.headers["x-access-token"];

    if (!token) return res.status(403).json({ message: "No provider" });

    const decoded = jwt.verify(token, Cg.SECRET);

    const user = await Username.findById(decoded.id, { password: 0 });

    if (!user) return res.status(400).json({ message: "username no found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "unauntorization" });
  }
}
