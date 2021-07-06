//create connection to sql database
const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Be sure to update with your own MySQL password!
  password: 'Ten1dulkar',
  database: 'employee',
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected");
});
