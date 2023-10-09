import express from "express";

import apiRounter from "./routes/routes.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.use("/rountes", apiRounter);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

