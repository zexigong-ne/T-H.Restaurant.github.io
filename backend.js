import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/prompts", (req, res) => {
  console.log("should return prompts");
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

