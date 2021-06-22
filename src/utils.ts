import * as fs from 'fs';

export const addDataToFile = (data: string, targetedFile: string) => {
  const preparedData = data + '\n<br />\n';
  fs.appendFileSync(`../data/${targetedFile}.txt`, preparedData);
};

export const changeDataInFile = (data: string, targetedFile: string) => {
  const preparedData = data + '\n<br />\n';
  fs.writeFileSync(`../data/${targetedFile}.txt`, preparedData);
};

export const readDataFromFile = (targetedFile: string) => {
  return fs.readFileSync(`../data/${targetedFile}.txt`);
};

export const deleteFile = (targetedFile: string) => {
  fs.rmSync(`../data/${targetedFile}.txt`);
};
