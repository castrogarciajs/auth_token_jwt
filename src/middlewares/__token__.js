import jwt from "jsonwebtoken";
import Cg from "../config.js";
import Username from "../models/Username.js";
import Roles from "../models/Role.js";

export async function verify_token(req, res, next) {
  try {
    const token = req.headers["x-access-token"];

    if (!token) return res.status(403).json({ message: "No provider" });

    const decoded = jwt.verify(token, Cg.SECRET);
    req.user_id = decoded.id;

    const user = await Username.findById(req.user_id, { password: 0 });

    if (!user) return res.status(400).json({ message: "username no found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "unauntorization" });
  }
}

export async function is_moderator(req, res, next) {
  const user = await Username.findById(req.user_id);
  const roles = await Roles.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator") {
      next();
      return;
    }
  }

  return res.status(403).json({ message: "necesitas ser moderador" });
}

export async function is_admin(req, res, next) {
  const user = await Username.findById(req.user_id);
  const roles = await Roles.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }

  return res.status(403).json({ message: "necesitas ser admin" });
}
