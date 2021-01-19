const mysql = require('mysql');

const connection = mysql.createConnection({
  host : "mysql",
  user : "root",
  password : "root",
  database : "people",
  insecureAuth: true
});
 
connection.connect();

connection.query(
  `
    CREATE TABLE IF NOT EXISTS people(
      id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
      name varchar(50) NOT NULL
    )
  `
);

const registerUser = async (name) => {
  return connection.query("INSERT INTO people (name) VALUES (?)", [name]);
}

module.exports = { registerUser, connection };