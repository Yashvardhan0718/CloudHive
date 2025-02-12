import aws from "aws-sdk";
import { config } from "dotenv";

config();

const bucketName = process.env.AWS_S3_BUCKET_NAME!;
if (
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY ||
  !process.env.AWS_REGION
) {
  console.log("The AWS environment variables are not defined.");
  process.exit(1);
}

try {
  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });
} catch (error) {
  console.log("The error occured in aws config", error);
}

export { aws, bucketName };
