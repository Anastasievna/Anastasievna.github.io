import { getPath, createData } from "#modules/utils";
import { dataTypes } from "#types/index";
import fsPromises from "fs/promises";
import path from "node:path";
import { promisify } from "node:util";
//@ts-ignore-next-line
import xliff from "xliff";

async function getLangFile(lang: string) {
  const fullPath = getPath(path.join("data", "locales", `${lang}.xlf`));

  try {
    const langFile = await fsPromises.readFile(fullPath, "utf8");
    return createData(dataTypes.SUCCESS, langFile);
  } catch (e) {
    return createData(
      dataTypes.ERROR,
      (e as { message: string })?.message || "File not found",
    );
  }
}

async function parseXliff(file: string) {
  const xliff2js = promisify(xliff.xliff2js);
  try {
    let parsedXliff = await xliff2js(file);
    if (parsedXliff) {
      parsedXliff = parsedXliff.resources?.f1;
    }
    return createData(dataTypes.SUCCESS, parsedXliff);
  } catch (e) {
    return createData(
      dataTypes.ERROR,
      (e as { message: string })?.message || "Failed parse xliff",
    );
  }
}

export const languageService = {
  getLangFile,
  parseXliff,
};
