import Username from "../models/Username.js";
import Roles from "../models/Role.js";
import jwt from "jsonwebtoken";
import Cg from "../config.js";
import Role from "../models/Role.js";

export async function register(req, res) {
  const { username, email, password, roles } = req.body;

  const new_user = new Username({
    username,
    email,
    password: await Username.encrypt_password(password),
  });

  if (roles) {
    const found_roles = await Roles.find({ name: { $in: roles } });
    new_user.roles = found_roles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    new_user.roles = [role._id];
  }

  const user = await new_user.save();

  const token = jwt.sign({ id: user._id }, Cg.SECRET, {
    expiresIn: 86400, // 24hrs
  });

  res.status(200).json({ token });
}

export async function login(req, res) {
  const found_user = await Username.findOne({ email: req.body.email }).populate(
    "roles"
  );

  if (!found_user) return res.status(400).json({ message: "User not found" });

  const bool_user = await Username.compare_password(
    req.body.password,
    found_user.password
  );

  if (!bool_user)
    return res.status(401).json({ token: null, message: "not authorizado" });

  const token = jwt.sign({ id: found_user._id }, Cg.SECRET, {
    expiresIn: 86400,
  });

  res.status(200).json({ token });
}
