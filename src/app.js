import Express from "express";
import Morgan from "morgan";
import pkg from "../package.json";
import { __router__ } from "./routes/Routes.js";

const App = Express();
const morgan = Morgan("dev");

App.set("package", pkg);

App.use(morgan);

App.get("/", (req, res) => {
  res.json({
    name: App.get("package").name,
    description: App.get("package").description,
    version: App.get("package").version,
    license: App.get("package").license,
    author: App.get("package").author,
  });
});

App.use("/api/", __router__);

export default App;
