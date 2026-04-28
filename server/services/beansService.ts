import { createData, createFile, removeFile, readDir } from "#modules/utils";
import { dataTypes, type beanType, type shortBeanType } from "#types/index";
import fsPromises from "fs/promises";
import path from "node:path";
import { DefaultRecipes } from "../constants/index.ts";
import { v4 as uuidv4 } from "uuid";

async function getAllBeans(isOriginalData: boolean = true) {
  const response = await readDir(path.join("data", "beans"));
  if (response.type === dataTypes.ERROR) return response;

  try {
    let allBeans: beanType[] = [];
    for (const path of response.data) {
      const bean = await fsPromises.readFile(path, "utf-8");
      const parsedBean = JSON.parse(bean);
      if (!isOriginalData) parsedBean.path = path;
      allBeans.push(parsedBean);
    }

    return createData(dataTypes.SUCCESS, allBeans);
  } catch (err) {
    return createData(
      dataTypes.ERROR,
      (err as { message: string })?.message || "File not found",
    );
  }
}

async function getBeans() {
  const response = await getAllBeans();
  return response;
}

async function createBean(bean: beanType) {
  const newBean = setDefaultPropsBean(bean);
  const fileName =
    `${newBean.details.region}-${newBean.details.process}`.toLowerCase();
  const pathName = path.join("data", "beans", `${fileName}.json`);
  const response = await createFile(JSON.stringify(newBean, null, 2), pathName);
  if (response.type === dataTypes.SUCCESS)
    return createData(dataTypes.SUCCESS, { id: newBean.id });
  else return response;
}

async function updateBean(id: string, bean: beanType) {
  const response = await getAllBeans(false);
  if (response.type === dataTypes.ERROR) return response;
  const allBeans = response.data;

  try {
    const targetBean = (allBeans as beanType[]).find((bean) => bean.id === id);

    if (!!targetBean && targetBean.path) {
      const id = targetBean.id;
      const recipes = targetBean.recipes;
      const newBean = {
        ...bean,
        id,
        recipes,
      };

      const response = await createFile(
        JSON.stringify(newBean, null, 2),
        targetBean.path,
        true,
      );
      if (response.type === dataTypes.SUCCESS)
        return createData(dataTypes.SUCCESS, "File updated successfull");
      else return response;
    } else {
      return createData(dataTypes.ERROR, `File with id - ${id} not found`);
    }
  } catch (err) {
    return createData(
      dataTypes.ERROR,
      (err as { message: string })?.message || "File not found",
    );
  }
}

async function deleteBean(id: string) {
  const response = await getAllBeans(false);
  if (response.type === dataTypes.ERROR) return response;
  const allBeans = response.data;

  try {
    const targetBean = (allBeans as beanType[]).find((bean) => bean.id === id);

    if (!!targetBean && targetBean.path) {
      const response = await removeFile(targetBean.path, true);
      if (response.type === dataTypes.SUCCESS)
        return createData(dataTypes.SUCCESS, "File deleted successfull");
      else return response;
    } else {
      return createData(dataTypes.ERROR, `File with ${id} not found`);
    }
  } catch (err) {
    return createData(
      dataTypes.ERROR,
      (err as { message: string })?.message || "File not found",
    );
  }
}

function parseBeans(beansArr: beanType[]): shortBeanType[] {
  return beansArr.map((bean) => ({
    id: bean.id,
    title: bean.title,
    description: bean.description,
    imageUrl: bean.imageUrl,
  }));
}

function checkBeansData(bean: beanType) {
  if (bean.title || bean.country) {
    return createData(dataTypes.SUCCESS, "All done");
  }
  return createData(dataTypes.ERROR, "Fields required is empty");
}

function setDefaultPropsBean(bean: beanType): beanType {
  bean.id = uuidv4();
  if (bean.recipes === undefined || !bean.recipes?.length)
    bean.recipes = DefaultRecipes;

  return bean;
}

export const beansService = {
  getBeans,
  parseBeans,
  checkBeansData,
  createBean,
  updateBean,
  deleteBean,
};
