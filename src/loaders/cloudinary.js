const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: `${process.env.DB_LOGIN || 'dnh07moob'}`,
  api_key: `${process.env.DB_LOGIN || '786856614959723'}`,
  api_secret: `${process.env.DB_LOGIN || 'trMKyv6gO2RbAOpYO26-gE5I2Y4'}`,
});

module.exports = cloudinary;
