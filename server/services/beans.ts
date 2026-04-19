import { getPath } from "#modules/filePath";
import { createData, readDir } from "#modules/utils";
import { dataTypes, type beanType, type shortBeanType } from "#types/index";
import fsPromises from "fs/promises";
import path from "node:path";
import { title } from "node:process";
import { promisify } from "node:util";

async function getBeans() {
  const response = await readDir(path.join("data", "beans"));

  if (response.type === dataTypes.ERROR) return response;

  try {
    let allBeans: beanType[] = [];
    for (const path of response.data) {
      const bean = await fsPromises.readFile(path, "utf-8");
      allBeans.push(JSON.parse(bean));
    }

    return createData(dataTypes.SUCCESS, allBeans);
  } catch (err) {
    return createData(
      dataTypes.ERROR,
      (err as { message: string })?.message || "File not found",
    );
  }
}

export function parseBeans(beansArr: beanType[]): shortBeanType[] {
  return beansArr.map((bean) => ({
    id: bean.id,
    title: bean.title,
    description: bean.description,
    imageUrl: bean.imageUrl,
  }));
}

export const beansService = { getBeans, parseBeans };
