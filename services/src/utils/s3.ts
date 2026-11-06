import { S3 } from "@aws-sdk/client-s3";

export const s3Client = new S3();

export const getFileKeyFromSignedUrl = (signedUrl: string) =>
  signedUrl.split("/").slice(4).join("/").split("?")[0].replace(/\//gi, "__");

export const getPublicFileUrl = (
  bucketName: string,
  region: string,
  fileKey: string,
) => `https://${bucketName}.s3.${region}.amazonaws.com/${fileKey}`;
