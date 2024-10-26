// import { HttpException, HttpStatus } from '@nestjs/common';

import * as dayjs from 'dayjs';
// import FormData from 'form-data';
import { createWriteStream, existsSync, mkdirSync } from 'fs';
import * as path from 'path';

export const TaskReporting = async (
  headers: any,
  photos: any,
  connection: any,
) => {
  try {
    const now = dayjs();
    const year = now.format('YYYY');
    const month = now.format('MM');
    const day = now.format('DD');
    const dirPath: string = 'public/activity/task/report';
    // const formData = new FormData();
    // console.log(formData);

    function addNewFilename(fileName: string) {
      // find index with regex match number

      const number: string | RegExpMatchArray = fileName?.match(/_1\.\w+$/);
      const beforeCharacter: string | RegExpMatchArray =
        /^(.*)(?=\.[^\.]*$)/.exec(fileName);
      const afterCharacter: string | RegExpMatchArray = /\.([^.]*)$/.exec(
        fileName,
      );
      const newFilename: string | RegExpMatchArray = number;
      let newIndex: string | RegExpMatchArray;
      let tempFileName;

      // if number exist just increase the index
      if (number != null) {
        // tempFileName = fileName.replace(number?.[0], '');
        // const currentIndex = number[0];
        // const ext = currentIndex.split('.');
        // const newIndex = parseInt(ext[0]) + 1;
        // console.log('2');
        // console.log(newFilename);
        // newFilename = newFilename.replace(/\d+/, String(newIndex));
        return newFilename;
      } else {
        newIndex = '_1';
        console.log(beforeCharacter);
        console.log(afterCharacter);
        // tempFileName = number[0];
        // const ext = tempFileName.split('.');
        // console.log(ext);
        // console.log('1');
        // console.log(newFilename);
        // newFilename =
        //   newFilename.replace(tempFileName, '') +
        //   ext[0] +
        //   newIndex +
        //   '.' +
        //   ext[1];
        return newFilename;
      }
    }

    const fullPath = path.resolve(dirPath, year, month, day);
    if (!photos) {
      return {
        message: 'tHere',
      };
    }
    if (!existsSync(fullPath)) {
      mkdirSync(fullPath, { recursive: true });
    }

    const fileName: string = photos?.originalname.replaceAll(' ', '_');

    if (existsSync(fullPath + '/' + fileName)) {
      addNewFilename(fileName);
      console.log(9);
    } else {
      const ws = createWriteStream(fullPath + '/' + fileName);
      ws.write(photos.buffer);
    }

    // do {
    //   console.log(2);
    //   if (existsSync(fullPath + '/' + fileName)) {
    //     // fileName = addNewFilename(fileName);
    //   } else {
    //     // const ws = createWriteStream(fullPath + '/' + fileName);
    //     // ws.write(photos.buffer);
    //   }

    //   // fileName = addNewFilename(fileName);
    // } while (!existsSync(fullPath + '/' + fileName));

    // if (existsSync(fullPath + '/' + photos.originalname)) {
    // const ws = createWriteStream(
    //   fullPath + '/' + addNewFilename(photos.originalname),
    // );
    // ws.write(photos.buffer);
    // } else {
    //   const ws = createWriteStream(fullPath + '/' + photos.originalname);
    //   ws.write(photos.buffer);
    // }

    return {
      message: 'Here',
    };
  } catch (error) {
    console.log(error);
    return {
      message: 'Here',
    };
  }
};
