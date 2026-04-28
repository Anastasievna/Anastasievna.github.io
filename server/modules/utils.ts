import fsPromises from "fs/promises";
import { fileURLToPath } from "url";
import path from "node:path";
import { dataTypes } from "#types/index";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createData<T>(type: dataTypes, data: T) {
  return { type, data };
}

export function getPath(file: string) {
  const pathToFile = path.join(__dirname, "../", file);
  return pathToFile;
}

export async function createFile(
  content: string,
  pathName: string,
  isFullPath: boolean = false,
) {
  try {
    const fullPathName = !isFullPath ? getPath(pathName) : pathName;
    await fsPromises.writeFile(fullPathName, content);
    return createData(dataTypes.SUCCESS, "File created");
  } catch (err) {
    return createData(
      dataTypes.ERROR,
      (err as { message: string })?.message || "File not created",
    );
  }
}

export async function removeFile(
  pathName: string,
  isFullPath: boolean = false,
) {
  try {
    const fullPathName = !isFullPath ? getPath(pathName) : pathName;
    await fsPromises.unlink(fullPathName);
    return createData(dataTypes.SUCCESS, "File deleted");
  } catch (err) {
    return createData(
      dataTypes.ERROR,
      (err as { message: string })?.message || "File not deleted",
    );
  }
}

export async function readDir(dirName: string) {
  try {
    const data = await fsPromises.readdir(getPath(dirName), {
      withFileTypes: true,
    });

    const filesArr: string[] = [];

    data
      .filter((item) => item.isFile())
      .forEach((item) => {
        let pathToFile = path.resolve(getPath(dirName), `./${item.name}`);
        filesArr.push(pathToFile);
      });
    return createData(dataTypes.SUCCESS, filesArr);
  } catch (err) {
    return createData(
      dataTypes.ERROR,
      (err as { message: string })?.message || "Failed read dir beans",
    );
  }
}
