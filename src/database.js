import Mongoose from "mongoose";

Mongoose.connect("mongodb://127.0.0.1/companydb")
  .then((database) => console.log("connect"))
  .catch((error) => console.log(error));
