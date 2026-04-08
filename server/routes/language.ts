import express from "express";
import { dataTypes } from "#types/index";
import { languageService } from "#services/languageService";

export const languageRouter = express.Router();

languageRouter.get("/:lang", async (req, res) => {
  const curLang = req.params.lang;
  let response = await languageService.getLangFile(curLang);

  if (response.type === dataTypes.ERROR)
    response = await languageService.getLangFile("en");

  const parseData = await languageService.parseXliff(response.data as string);

  if (parseData.type === dataTypes.ERROR) return res.status(400).json(response);

  res.status(200).json(parseData);
});
