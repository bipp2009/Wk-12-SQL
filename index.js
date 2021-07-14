//create connection to sql database
const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Be sure to update with your own MySQL password!
  password: "Ten1dulkar",
  database: "employee",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected");
  getUsersAction();
});

const getUsersAction = () => {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add department",
        "Add role",
        "Add employee",
        "View departments",
        "View roles",
        "View employees",
        "Update employee roles",
      ],
    })
    .then((answer) => {
      switch (answer.action) {
        case "Add department":
          addDepartment();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Add role":
          addRole();
          break;
        case "View departments":
          ViewDepartments();
          break;
        case "View roles":
          Viewroles();
          break;
        case "View employees":
          Viewemployees();
          break;
        case "Update employee roles":
          Updateemployeeroles();
          break;
        default:
          console.log(`Invalid action: ${answer.action}`);
          break;
      }
    });
};
//activiy 17 connection queries
const addDepartment = () => {
  console.log("User clicked add department");
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "What is the name of the Department you want to add?",
    })
    .then((userAnswer) => {
      const query = "INSERT INTO department SET ?";
      connection.query(query, userAnswer, (err, res) => {
        if (err) throw err;
        console.log("Successfully added your department");
        getUsersAction();
      });
    });
};

const addEmployee = () => {
  console.log("User clicked add employee");
  const firstQuery =
    "SELECT *, role.id, role.title FROM employee LEFT JOIN role on employee.role_id = role.id ";
  connection.query(firstQuery, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "first_name",
          type: "input",
          message: "What is the employees first name?",
        },
        {
          name: "last_name",
          type: "input",
          message: "What is the employees last name?",
        },
        {
          name: "role_id",
          type: "list",
          choices() {
            const rolesInDatabase = [];
            res.forEach((element) => {
              rolesInDatabase.push({ name: element.title, value: element.id });
            });
            return rolesInDatabase;
          },
        },
        {
          name: "manager_id",
          type: "list",
          choices() {
            const employeessInDatabase = [];
            res.forEach((element) => {
              employeessInDatabase.push({
                name: element.first_name + element.last_name,
                value: element.id,
              });
            });
            return employeessInDatabase;
          },
        },
      ])
      .then((userAnswers) => {
        const secondQuery = "INSERT INTO employee SET ?";
        connection.query(secondQuery, userAnswers, (err, res) => {
          if (err) throw err;
          console.log("Successfully added employee");
        });
      });
  });
  getUsersAction();
};

const addRole = () => {
  console.log("user clicked add role");
  const firstQuery = "SELECT * FROM department";
  connection.query(firstQuery, (err, res) => {
    inquirer
      .prompt([
        {
          name: "title",
          type: "input",
          message: "What is the name of the role you want to create?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary for this role?",
        },
        {
          name: "department_id",
          type: "list",
          choices() {
            const departmentsInDatabase = [];
            res.forEach((element) => {
              departmentsInDatabase.push({
                name: element.name,
                value: element.id,
              });
            });
            return departmentsInDatabase;
          },
        },
      ])
      .then((userAnswers) => {
        const secondQuery = "INSERT INTO ROLE SET ?";
        connection.query(secondQuery, userAnswers, (err, res) => {
          if (err) throw err;

          console.log("Successfully added your role");
          getUsersAction();
        });
      });
  });
};

const ViewDepartments = async () => {
  console.log("user clicked view department");
  const query = "SELECT * FROM department";
  await connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
  });
  getUsersAction();
};

const Viewroles = async () => {
  console.log("user clicked view roles");
  const query = "SELECT * FROM role";
  await connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
  });
  getUsersAction();
};

const Viewemployees = async () => {
  console.log("user clicked view employees");
  const query = "SELECT * FROM employee";
  await connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
  });
  getUsersAction();
};

const Updateemployeeroles = () => {
  console.log("user clicked update employee roles");
  getUsersAction();
};

// update employee roles Q: which role? 
// conncetion .query 
//then update roles
// Why is it adding empty department every time, and duplicates?
