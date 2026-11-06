import axios from "axios";
import { s3Client } from "@abhishekchalla/services/utils/s3";
import { PutObjectCommandInput } from "@aws-sdk/client-s3";

export const moveRemoteFileToS3 = async (
  url: string,
  s3UploadOptions: PutObjectCommandInput,
) => {
  const fileBuffer = await axios.get(url, { responseType: "arraybuffer" });
  await s3Client.putObject({
    ...s3UploadOptions,
    Body: Buffer.from(fileBuffer.data),
    ContentType: fileBuffer.headers["content-type"],
  });
};
