const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_NAME || 'dnh07moob'}`,
  api_key: `${process.env.CLOUDINARY_API_KEY || '786856614959723'}`,
  api_secret: `${process.env.CLOUDINARY_API_SECRET || 'trMKyv6gO2RbAOpYO26-gE5I2Y4'}`,
});

module.exports = cloudinary;
