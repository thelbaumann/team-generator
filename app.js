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


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

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
    
            console.log(employees);
    
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
                console.log("adding a team member");
    
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
                    console.log("successfully wrote to file!")
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
    
                console.log(employees);
    
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
    
                console.log(employees);
    
                addEmployees();
    
            })
        };