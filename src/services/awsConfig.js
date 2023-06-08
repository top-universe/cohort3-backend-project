require("dotenv").config();
const { PutObjectCommand, S3Client } =require("@aws-sdk/client-s3");

const s3Client = new S3Client({
    forcePathStyle: false, // Configures to use subdomain/virtual calling format.
    endpoint: process.env.DO_SPACES_ENDPOINT,
    region: process.env.DO_SPACE_REGION, 
    credentials: { 
        accessKeyId: process.env.DO_SPACES_KEY,
        secretAccessKey: process.env.DO_SPACES_SECRET
    }
});
module.exports={ s3Client, PutObjectCommand };
