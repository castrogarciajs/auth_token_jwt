import Express from "express";
import Morgan from "morgan";
import pkg from "../package.json";
import { roles } from "./lib/__init__.js";
import { __admin__ } from "./routes/__admin__.js";
import { __Auth__ } from "./routes/__Auth__.js";
import { __Product__ } from "./routes/__Product__.js";

const App = Express();
const morgan = Morgan("dev");

roles();

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

App.use("/auth/", __Auth__);
App.use("/api/", __Product__);
App.use("/admin/", __admin__);

export default App;
