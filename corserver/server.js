import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  const request = req.originalUrl.slice(2);
  const respose = await fetch(request);
  const data = await respose.text();
  res.json(data);
});

app.listen(3001, () => {
  console.log("Go port 3001");
});
