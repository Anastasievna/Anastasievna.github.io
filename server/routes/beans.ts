import express from "express";
import { dataTypes } from "#types/index";
import { beansService } from "#services/beans";

export const beansRouter = express.Router();

beansRouter.get("/", async (req, res) => {
  const allBeans = await beansService.getBeans();
  res.status(200).json(allBeans);
});
