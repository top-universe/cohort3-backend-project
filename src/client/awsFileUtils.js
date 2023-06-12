const { s3Client,PutObjectCommand } = require("../services/awsConfig.js");

// Uploads the specified file to the chosen path.
const upload = async (bucketParams) => {
    try {
        const data = await s3Client.send(new PutObjectCommand(bucketParams));
        return data;
    } catch (err) {
        throw err;
    }
};

module.exports=upload;