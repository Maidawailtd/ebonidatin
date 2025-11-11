
import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

const S3 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
  },
});

export const getFile = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME as string,
    Key: key,
  });

  const response = await S3.send(command);
  return response.Body;
};

export const uploadFile = async (key: string, body: Buffer) => {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME as string,
    Key: key,
    Body: body,
  });

  return await S3.send(command);
};

export const deleteFile = async (key: string) => {
  const command = new DeleteObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME as string,
    Key: key,
  });

  return await S3.send(command);
};
