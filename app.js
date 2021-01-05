const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

(function buildManagerProfile() {
    inquirer.prompt([
        {
            type: "input",
            message: "Welcome to the Employee Database Program! What is your (the manager's) name?",
            name: "name",
            validate: (input) => {
                if (input !== "" && typeof input == 'string') {
                    return true;
                } else {
                    return "Please enter a valid name!"
                }
            }
        },
        {
            type: "number",
            message: "What is your employee id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your email?",
            name: "email",
            validate: (input) => {
                if (input !== "" && typeof input== 'string') {
                    return true;
                } else {
                    return "Please enter a valid email to proceed!"
                }
            }
        },
        {
            type: "input",
            message: "What is your office number?",
            name: "officeNumber"
            
        }
        ]).then((response) => {
            const name = response.name;
            const id = response.id;
            const email = response.email;
            const officeNumber = response.officeNumber;
    
            const manager = new Manager(name, id, email, officeNumber);
    
            employees.push(manager);
    
            addEmployees();
           
        })
    
    })();
    
    function addEmployees() {
       inquirer.prompt([
        {
            type: "list",
            message: "Add an employee, or are you finished with your team?",
            name: "add",
            choices: ["Add Employee", "Finish Team"]
        }
    
        ]).then((response) => {
            if (response.add == "Add Employee") {
    
                inquirer.prompt([
                    {
                        type: "input",
                        message: "What is the employee's name?",
                        name: "name",
                        validate: (input) => {
                            if (input !== "" && typeof input == 'string') {
                                return true;
                            } else {
                                return "Please enter a valid name!"
                            }
                        }
                    },
                    {
                        type: "number",
                        message: "What is the employee's id?",
                        name: "id"
                    },
                    {
                        type: "input",
                        message: "What is the employee's email?",
                        name: "email",
                        validate: (input) => {
                            if (input !== "" && typeof input== 'string') {
                                return true;
                            } else {
                                return "Please enter a valid email to proceed!"
                            }
                        }
                    },
                    {   
                        type: "list",
                        message: "What kind of employee are you adding?",
                        name: "employeeType",
                        choices: ["Engineer", "Intern"]
                    }
                ]).then((response) => {
    
                    const name = response.name;
                    const id = response.id;
                    const email = response.email;
    
                    switch (response.employeeType) {
                        case 'Engineer':
                            makeEngineer(name, id, email);
                            break;
    
                        case 'Intern':
                            makeIntern(name, id, email);
                            break;
                    }
                    
                })
    
            }
            else {
    
                try {
                    const employeeHTML = render(employees);
                    fs.writeFileSync(outputPath, employeeHTML);
                }
                catch(err) {
                    console.log(err);
                }
    
            }
    
        })};
    
    
        function makeEngineer(name, id, email) {
    
            inquirer.prompt([
                {   
                    type: "input",
                    message: "What is the engineer's Github username?",
                    name: "github",
                }
            ]).then((response) => {
    
                const github = response.github;
    
                const engineer = new Engineer(name, id, email, github);
    
                employees.push(engineer);
    
                addEmployees();
    
            })
        };
    
        function makeIntern(name, id, email) {
    
            inquirer.prompt([
                {   
                    type: "input",
                    message: "What is the intern's school?",
                    name: "school",
                }
            ]).then((response) => {
                
                const school = response.school;
    
                const intern = new Intern(name, id, email, school);
    
                employees.push(intern);
    
                addEmployees();
    
            })
        };