"use strict";

require("dotenv").config();
const querystring = require("querystring");
const AWS = require("aws-sdk");
const sharp = require("sharp");
const S3 = new AWS.S3({ region: process.env.REGION });
const BUCKET = process.env.BUCKET;

exports.handler = async (event, context, callback) => {
  const { request, response } = event.Records[0].cf;
  const params = querystring.parse(request.querystring);
  const { width, height } = params;

  if (!width && !height) {
    console.log(`return original image. width: ${width}, height: ${height}`);
    return callback(null, response);
  }

  const uri = request.uri;
  const [, imageName, ext] = uri.match(/\/(.*)\.(.*)/);
  const format = ext === "jpg" ? "jpeg" : ext;
  const key = `${imageName}.${ext}`;

  try {
    const s3Object = await S3.getObject({
      Bucket: BUCKET,
      Key: key,
    }).promise();

    const resizedImage = await sharp(s3Object.Body)
      .resize(width, height)
      .toFormat(format)
      .toBuffer();

    response.status = 200;
    response.body = resizedImage.toString("base64");
    response.bodyEncoding = "base64";
    response.headers["content-type"] = [
      { key: "Content-Type", value: `image/${format}` },
    ];

    return callback(null, response);
  } catch (e) {
    console.error(e);
    return callback(e);
  }
};
