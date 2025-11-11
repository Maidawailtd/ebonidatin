
import { S3Client, GetObjectCommand, PutObjectCommand, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';

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

export const uploadPortfolioAsset = async (userId: string, assetName: string, body: Buffer) => {
  const key = `portfolios/${userId}/${assetName}`;
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME as string,
    Key: key,
    Body: body,
  });

  return await S3.send(command);
}

export const deletePortfolioAsset = async (userId: string, assetName: string) => {
  const key = `portfolios/${userId}/${assetName}`;
  const command = new DeleteObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME as string,
    Key: key,
  });

  return await S3.send(command);
}

export const listPortfolioAssets = async (userId: string) => {
  const prefix = `portfolios/${userId}/`;
  const command = new ListObjectsV2Command({
    Bucket: process.env.R2_BUCKET_NAME as string,
    Prefix: prefix,
  });

  const response = await S3.send(command);
  return response.Contents?.map(item => item.Key?.replace(prefix, '')) ?? [];
}

export const uploadCoverPhoto = async (userId: string, file: File) => {
  const key = `users/${userId}/cover-photo/${file.name}`;
  const body = Buffer.from(await file.arrayBuffer());
  return await uploadFile(key, body);
}
