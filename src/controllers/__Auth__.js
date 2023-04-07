import Username from "../models/Username.js";
import jwt from "jsonwebtoken";
import Cg from "../config.js";

export async function register(req, res) {
  const { username, email, password } = req.body;

  const new_user = new Username({
    username,
    email,
    password: await Username.encrypt_password(password),
  });
  const user = await new_user.save();

  const token = jwt.sign({ id: user._id }, Cg.SECRET, {
    expiresIn: 86400, // 24hrs
  });

  res.status(200).json({ token });
}

export function login(req, res) {
  res.send("iniciar session");
}
