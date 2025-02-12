import { AppError } from "../middleware/errorHandling";
import { bucketName, aws } from "../utils/aws";

const s3 = new aws.S3();

enum Method {
  putObject = "putObject",
  getObject = "getObject",
}
const generatePreSignedUrl = (
  method: Method,
  key: string,
  ContentType?: string
) => {
  return s3.getSignedUrlPromise(method, {
    Bucket: bucketName,
    ContentType,
    Key: key,
    Expires: 60 * 10,
  });
};

const deleteObject = (key: string) => {
  return s3.deleteObject({ Bucket: bucketName, Key: key }).promise();
};

const checkFileExists = async (key: string) => {
  try {
    await s3.headObject({ Bucket: bucketName, Key: key }).promise();

    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (
        error instanceof Error &&
        "code" in error &&
        error.code === "NotFound"
      ) {
        return false;
      }
    }
    throw new AppError("File does not exist. Cannot upload.", 400);
  }
};

export { generatePreSignedUrl, Method, deleteObject, checkFileExists };
