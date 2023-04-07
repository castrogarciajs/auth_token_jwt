import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const Username = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
    },
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

Username.statics.encrypt_password = async function (password) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

Username.statics.compare_password = async function (
  password,
  recived_password
) {
  return await bcrypt.compare(password, recived_password);
};

export default model("Username", Username);
