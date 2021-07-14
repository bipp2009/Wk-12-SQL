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
  getUsersAction();
});

const getUsersAction = () => {
  inquirer
    .prompt({
      name: 'action',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: [
          'Add department',
          'Add role',
          'Add employee',
          'View departments',
          'View roles',
          'View employees',
          'Update employee roles'
      ]
    })
    .then ((answer) => {
      switch (answer.action) {
        case 'Add department':
          addDepartment();
          break;
        case 'Add employee':
          addEmployee();
          break;
        case 'Add role':
          addRole();
          break;
        case 'View departments':
          ViewDepartments();
          break;
          case 'View roles':
            Viewroles();
            break;
            case 'View employees':
              Viewemployees();
              break;
        case 'Update employee roles':
          Updateemployeeroles();
          break;  
          default:
            console.log(`Invalid action: ${answer.action}`);
          break;   
      }
    })
}
//activiy 17 connection queries
const addDepartment = () => {
  console.log("User clicked add department"); 
  inquirer.prompt({
    name: "name",
    type: "input",
    message: "What is the name of the Department you want to add?"
  }).then((userAnswer) => {
    const query = "INSERT INTO department SET ?"; 
    connection.query(query, userAnswer, (err, res) => {
      if(err) throw err;
      console.log("Successfully added your department")
      getUsersAction();
      })
  })
}

const addEmployee = () => {
  console.log("User clicked add employee");

  getUsersAction();
}

const addRole = () => {
  console.log("user clicked add role");
  getUsersAction();
}

const ViewDepartments = async () => {
  console.log("user clicked view department");
  const query = "SELECT * FROM department"
  await connection.query(query, (err, res) => {
    if (err) throw err; 
    console.table(res) 
  })
  getUsersAction();
}

const Viewroles = async () => {
  console.log("user clicked view roles");
  const query = "SELECT * FROM role"
  await connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res) 
  })
  getUsersAction();
}

const Viewemployees = async () => {
  console.log("user clicked view employees");
  const query = "SELECT * FROM employee"
  await connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res)
  })
  getUsersAction();
}

const Updateemployeeroles = () => {
  console.log("user clicked update employee roles");
  getUsersAction();
}

// Select function
