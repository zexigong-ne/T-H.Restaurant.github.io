import express from "express";
import bodyParser from "body-parser";
import router from "./routes/routes.js";
import path from "path";
import { fileURLToPath } from "url";
import routeruser from "./routes/routesuser.js";

const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.use(router);
app.use(routeruser);

app.listen(port, () => {
  console.log("Server is running on port ${port}");
});
