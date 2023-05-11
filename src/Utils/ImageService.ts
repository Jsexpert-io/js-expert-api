import * as AWS from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';

export const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY || 'AKIAYDLKV2CDXRWX7H4D',
  secretAccessKey:
    process.env.AWS_SECRET_ACCESS_KEY ||
    '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',
  region: process.env.AWS_REGION || 'ap-south-1',
});
export const Sns = new AWS.SNS({
  accessKeyId: process.env.AWS_ACCESS_KEY || 'AKIAYDLKV2CDXRWX7H4D',
  secretAccessKey:
    process.env.AWS_SECRET_ACCESS_KEY ||
    '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',
  region: process.env.AWS_REGION || 'ap-south-1',
});
export const removeImages = async (media: any[]) => {
  try {
    const keys = media.map((a) =>
      a
        .replace('https://anbyservice.s3.ap-south-1.amazonaws.com/', '')
        .replace('https://anbyservice.s3.amazonaws.com/', ''),
    );

    const params = {
      Bucket: 'anbyservice',
      Delete: {
        Objects: keys.map((a) => ({ Key: a })),
      },
    };
    const response = await s3.deleteObjects(params).promise();
    return { ...response, keys };
  } catch (error) {
    console.log('error while deleteing image', error);
  }
};