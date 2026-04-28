import express from "express";
import cors from "cors";
import { languageRouter } from "#routes/language";
import { beansRouter } from "#routes/beans";
import { getPath } from "#modules/utils";
import path from "node:path";

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json({ type: () => true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(getPath("public")));
app.use("/api/i18n", languageRouter);
app.use("/api/beans", beansRouter);

app.get("/", (req, res) => {
  res.sendFile(getPath(path.join("public", "index.html")));
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
