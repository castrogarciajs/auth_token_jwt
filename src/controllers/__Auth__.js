import Username from "../models/Username.js";

export async function register(req, res) {
  const { username, email, password } = req.body;

  const new_user = new Username({
    username,
    email,
    password: await Username.encrypt_password(password),
  });
  await new_user.save();

  res.send("registrandose");
}

export function login(req, res) {
  res.send("iniciar session");
}
