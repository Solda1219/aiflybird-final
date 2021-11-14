const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  port: process.env.PORT || 3000,
  sqlDriver: mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'aiflybird',
  }),
  mmcPath:'/HomeMeeting/MMC Server/',
  jwt: {
    secret: process.env.JWT_SECRET || 'development_secret',
    expiry: '365d'
  },
};
