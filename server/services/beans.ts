import { getPath } from "#modules/filePath";
import { createData, readDir } from "#modules/utils";
import { dataTypes } from "#types/index";
import fsPromises from "fs/promises";
import path from "node:path";
import { promisify } from "node:util";

async function getBeans() {
  const pathToFiles = await readDir(path.join("data", "beans"));
  const allBeans = [];

  for (const path of pathToFiles) {
    const bean = await fsPromises.readFile(path, "utf-8"); //переделать на promise.all
    allBeans.push(JSON.parse(bean));
  }

  // return createData(dataTypes.SUCCESS, langFile);
  //   } catch (e) {
  //     return createData(
  //       dataTypes.ERROR,
  //       (e as { message: string })?.message || "File not found",
  //     );
  //   }
  return allBeans;
}

export const beansService = { getBeans };
