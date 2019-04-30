const mysql = require('mysql');

//建立连接
const conn = mysql.createConnection({
   host:'127.0.0.1',        //数据库地址
   user:'root',             //账号
    password: '123456',
    database: 'yz-hotel'       //数据库名称
});

conn.connect();         //连接
module.exports = conn;