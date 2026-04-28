import express from "express";
import { dataTypes, type beanType, type shortBeanType } from "#types/index";
import { beansService } from "#services/beansService";
import { createData } from "#modules/utils";

export const beansRouter = express.Router();

beansRouter.get("/", async (req, res) => {
  const { type } = req.query;
  const response = await beansService.getBeans();
  if (response.type === dataTypes.ERROR) res.status(400).json(response);
  else {
    let parsedData: shortBeanType[] = [];
    if (type) {
      parsedData = beansService.parseBeans(
        (response.data as beanType[]).filter(
          (bean) => bean.type?.toLowerCase() === (type as string).toLowerCase(),
        ),
      );
    } else {
      parsedData = beansService.parseBeans(response.data as beanType[]);
    }
    res.status(200).json(createData(dataTypes.SUCCESS, parsedData));
  }
});

beansRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const response = await beansService.getBeans();
  if (response.type === dataTypes.ERROR) res.status(400).json(response);
  const bean = (response.data as beanType[]).find((item) => item.id == id);

  if (bean) {
    res.status(200).json(createData(dataTypes.SUCCESS, bean));
  } else {
    res
      .status(400)
      .json(createData(dataTypes.ERROR, `Bean with id ${id} not found`));
  }
});

beansRouter.post("/", async (req, res) => {
  const body = req.body as beanType;
  const check = beansService.checkBeansData(body);
  if (check.type === dataTypes.ERROR) return res.status(400).json(check);

  const response = await beansService.createBean(body);
  const statusCode = response.type === dataTypes.ERROR ? 400 : 200;
  res.status(statusCode).json(response);
});

beansRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const response = await beansService.updateBean(id, body);
  const statusCode = response.type === dataTypes.ERROR ? 400 : 200;
  res.status(statusCode).json(response);
});

beansRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const response = await beansService.deleteBean(id);
  const statusCode = response.type === dataTypes.ERROR ? 400 : 200;
  res.status(statusCode).json(response);
});
