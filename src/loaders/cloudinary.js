const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: `${process.env.DB_LOGIN || ''}`,
  api_key: `${process.env.DB_LOGIN || ''}`,
  api_secret: `${process.env.DB_LOGIN || ''}`,
});

module.exports = cloudinary;
