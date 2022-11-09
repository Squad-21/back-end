const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dnh07moob',
    api_key: '786856614959723',
    api_secret: 'trMKyv6gO2RbAOpYO26-gE5I2Y4' 
})

module.exports = cloudinary;