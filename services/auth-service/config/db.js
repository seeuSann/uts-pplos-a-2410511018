const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '',
  port: 3306,
  database: 'auth_db'
});

connection.connect((err) => {
  if (err) {
    console.log('Database error:', err);
  } else {
    console.log('MySQL Connected');
  }
});

module.exports = connection;