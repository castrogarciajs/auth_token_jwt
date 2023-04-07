import Role from "../models/Role.js";

export async function roles() {
  try {
    const counter_roles = await Role.estimatedDocumentCount();

    if (counter_roles > 0) return;

    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderator" }).save(),
      new Role({ name: "admin" }).save(),
    ]);

    console.log(values);
  } catch (error) {
    console.error(error);
  }
}
