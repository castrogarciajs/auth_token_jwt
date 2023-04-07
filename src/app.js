import Express from "express";
import Morgan from "morgan";
import pkg from "../package.json";
import { __Product__ } from "./routes/__Product__.js";

const App = Express();
const morgan = Morgan("dev");

App.set("package", pkg);

App.use(morgan);
App.use(Express.json());

App.get("/", (req, res) => {
  res.json({
    name: App.get("package").name,
    description: App.get("package").description,
    version: App.get("package").version,
    license: App.get("package").license,
    author: App.get("package").author,
  });
});

App.use("/api/", __Product__);

export default App;
