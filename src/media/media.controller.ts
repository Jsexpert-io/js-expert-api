import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';

import * as sharp from 'sharp';
import * as multer from 'multer';
import { Request } from 'express';
import { createHash } from 'crypto';

import axios from 'axios';
import { removeImages, s3 } from '../Utils/ImageService';

const upload = multer();
const LOGO_MARGIN_PERCENTAGE = 2;
// for parsing multipart/form-data
// note that Multer limits to 1MB file size by default
function initMiddleware(middleware: any) {
  return (req: any, res: any) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}
const multerAny = initMiddleware(upload.any());



@Controller('media')
export class MediaController {
  @Post('uploadImage/:entityName')

  async uploadImage(@Req() req: any, @Res() res) {
    await multerAny(req, res);
    const date = new Date().toISOString().slice(0, 16);
    let randomSalt: any = Math.random() * 1000000;
    randomSalt = randomSalt.toString();
    const hashable = [date, randomSalt].join('');
    const queryPath = req.query.queryPath;
    let id = req.query.id || createHash('md5').update(hashable).digest('hex');

    
    const file: any = req.files[0];
    const extention = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      // eslint-disable-next-line no-mixed-spaces-and-tabs
      file.originalname.length,
    );
    const entityName = req.params.entityName;
    const fileName = (
      !id.includes(entityName.toLowerCase()) ? entityName + '/' + id : id
    )
      .replace(/\s/g, '')
      .toLowerCase()
      .split(' ')
      .join('-');

      try {
        await removeImages([{
          key: fileName + '.webp',
        }]);
      } catch (error) {
        
      }

    try {
      const sharpImage = await sharp(file.buffer, {
        failOnError: false,
      });

      const orignalBuffer = await sharpImage
        .webp({
          force: true,
          quality: 100,
        })
        .toBuffer();
      const metaData = await sharpImage.metadata();
      const data = await s3
        .upload({
          Bucket: 'anbyservice', // pass your bucket name
          Key: fileName + '.webp', // file will be saved as testBucket/contacts.csv

          Body: orignalBuffer,
          Metadata: {
            key: fileName + '.webp',

          },
        })
        .promise();
      // const blob: BlobCorrected = req.files[0];


      return res.send({
        
        metaData:{
          height:metaData.height,
          width:metaData.width,
          format  :metaData.format,
          size  :metaData.size


        },
        bucketName: 'anbyservice',
        key:data.Key,
        etag:data.ETag,
        url: data.Location,
        acpectRatio: (metaData.height / metaData.width),
        mediaType: 'image'
      });
    } catch (error) {
      console.log(error);
      const data = await s3
        .upload({
          Bucket: 'anbyservice', // pass your bucket name
          Key: fileName + extention, // file will be saved as testBucket/contacts.csv

          Body: file.buffer,
          Metadata: {
            key: fileName + extention,
          },
        })
        .promise();

      return res.send({
        data,

        bucketName: 'anbyservice',
        url: data.Location,
        mediaType: 'image',
      });
    }
  }
  @Post('uploadVideo/:entityName')
 
  async uploadVideo(@Req() req: any, @Res() res) {
    await multerAny(req, res);
    const date = new Date().toISOString().slice(0, 16);
    let randomSalt: any = Math.random() * 1000000;
    randomSalt = randomSalt.toString();
    const hashable = [date, randomSalt].join('');
    const queryPath = req.query.queryPath;
    let id: any = createHash('md5').update(hashable).digest('hex');

    if (queryPath) {
      id = queryPath + '/' + id;
    }
    const file: any = req.files[0];
    const extention = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      // eslint-disable-next-line no-mixed-spaces-and-tabs
      file.originalname.length,
    );
    const entityName = req.params.entityName;
    const fileName = (
      !id.includes(entityName.toLowerCase()) ? entityName + '/' + id : id
    )
      .replace(/\s/g, '')
      .toLowerCase()
      .split(' ')
      .join('-');

    try {
      const tempData = await s3
        .upload({
          Bucket: 'anbyservice', // pass your bucket name
          Key: fileName + extention, // file will be saved as testBucket/contacts.csv

          Body: file.buffer,
          Metadata: {
            key: fileName + extention,
          },
        })
        .promise();

      const largeUrl = (tempData.Location)
      // download video from url and save it to s3 with axios
      console.log('largeUrl', largeUrl);
      const video = await axios.get(largeUrl, {
        responseType: 'arraybuffer',
      })
      console.log(video.headers);

      const videoBufferNew = Buffer.from(video.data, 'base64');

      const data = await s3
        .upload({
          Bucket: 'anbyservice', // pass your bucket name
          Key: fileName + '.webm', // file will be saved as testBucket/contacts.csv
          Body: videoBufferNew,
          Metadata: {
            key: fileName + '.webm',
          },
        })
        .promise();
      //delete video from s3
      await s3.deleteObject({
        Bucket: 'anbyservice',
        Key: tempData.Key,
      }).promise();
      return res.send({
        ...data,

        bucketName: 'anbyservice',
        smallUrl: data.Location,
        mediumUrl: data.Location,
        url: data.Location,
        ogUrl: data.Location,
        largeUrl: data.Location,
        waterMarkUrl: data.Location,
        postType: 'video',
        originalUrl: data.Location,
      });
    } catch (error) {
      console.log(error);
      const data = await s3
        .upload({
          Bucket: 'anbyservice', // pass your bucket name
          Key: fileName + extention, // file will be saved as testBucket/contacts.csv

          Body: file.buffer,
          Metadata: {
            key: fileName + extention,
          },
        })
        .promise();

      return res.send({
        ...data,

        bucketName: 'anbyservice',
        smallUrl: data.Location,
        mediumUrl: data.Location,
        url: data.Location,
        ogUrl: data.Location,
        largeUrl: data.Location,
        waterMarkUrl: data.Location,
        postType: 'video',

        originalUrl: data.Location,
      });
    }
  }
}