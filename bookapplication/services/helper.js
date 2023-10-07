import AWS from "aws-sdk";

/** gettingPreSignedUrl
 *
 * @param str
 * @returns
 */
export const gettingPreSignedUrl = async (filePath, fileFormat) =>
  new Promise((resolve, reject) => {
    AWS.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: "ap-south-1",
    });
    const s3 = new AWS.S3({
      params: { Bucket: process.env.AWS_BUCKET_NAME },
      signatureVersion: "v4",
    });
    const params = {
      Key: `${filePath}`,
      Bucket: process.env.AWS_BUCKET_NAME,
      ContentType: fileFormat,
      ACL: "public-read",
      Expires: 60 * 60,
    };

    try {
      // eslint-disable-next-line consistent-return
      s3.getSignedUrl("putObject", params, (err, data) => {
        if (err) {
          return reject(err);
        }
        resolve(data);
      });
    } catch (error) {
      console.error("error---- ", error);
      // eslint-disable-next-line no-promise-executor-return
      return reject(error);
    }
  });
