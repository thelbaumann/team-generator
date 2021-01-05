# Employee Team Generator - CLI Application [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
This is a CLI node.js application built as a project for my fullstack coding bootcamp. It will generate an html page for contact information for a team of employees. It is meant to be used by a manager to easily access the important information for their employees. It runs via Inquirer prompts to the user, where it then uses templates, classes, template literals, and tests to validate and then write the information to an html file. As this is not a web application, it is not currently deployed on GitHub Pages, but a video walkthrough of the application can be found below.

## Table of Contents

[User Story & Acceptance Criteria](#user-story-acceptance-criteria) 

[Installing/Dependencies](#installingdependencies)  

[Usage Information](#usage-information)

[Walkthrough](#walkthrough)  

[Contributing to this project](#contributing-to-this-project)  

[Test Instructions](#test-instructions)  

[Questions?](#questions)  

[License](#license)

## User Story & Acceptance Criteria
#### User Story
I was given the following user story to guide my development:

```
As a manager
I want to generate a webpage that displays my team's basic info
so that I have quick access to emails and GitHub profiles
```

#### Acceptance Criteria
As a part of this project, I was also provided with the following standards that my project should meet:

Passes all jest-powered tests provided in test folder, which included making sure all required properties and methods were containde on employee, manager, engineer, and intern classes

Use Inquirer to prompt the user to enter employee data, allowing them to add 1 manager, and as many "engineer" or "intern" employees as the user wants

All employees must share an "employee" class containing basic information relevant for every position, as well as a specific class containing information relevant for that position only


Entering this data should write the file to an employee array, which is then passed to an html renderer, which then writes the file to an html document hosted in the outputs folder



## Installing/Dependencies
```npm i jest```
```npm i inquirer```

## Usage Information
Clone this project, install the required dependencies, run 'node app.js' in your terminal, and answer the following questions prompted by the terminal to generate the html page of team members.

## Walkthrough

### Testing
Jest Tests guided the beginning of my development, by helping me to construct employee, manager, engineer, and intern classes which I would then use to create objects to be pushed to the html file later. I began my development with test-driven development, adding and changing these classes until they successfully passed all tests.

![Passed All Tests](https://github.com/thelbaumann/team-generator/blob/main/assets/all-tests-passed.png)
![Class-specific Passed Tests](https://github.com/thelbaumann/team-generator/blob/main/assets/employee-test-pass.png)


### Using the Generator
The file structure of this code project is much more complex than my last CLI project. The first is a "lib" folder, containing .js files of the different classes used to define employees: employee (applied to all), manager (supplemental to employee), intern (supplemental), and engineer (supplemental). The templates folder contains html "employee card" templates for each of the employee types. This is called and used by the html Renderer file, also contained in the former folder "lib". Then there is a test folder, containing a test file for every employee + supplemental class, which runs to make sure each new employee made with these classes will contain the properties and methods required to successfully write the file. Finally, there is the app.js file, which contains the main functionality of the file, which is the Inquirer prompts, the if/else statements, the switch statements, and the try/catch statements required to handle the information given by the user, and allow the user to continue to loop through adding employees to their list as long as they wish.

![File Structure](https://github.com/thelbaumann/team-generator/blob/main/assets/file-structure.png)

Upon running app.js, the user is first prompted via Inquirer for the information for the "manager" role. This is because the user story tell us this application is meant to be used by managers, so it is assumed they would be the users, and that a manager would be required to build a team. Once the manager information is fed via Inquirer, a new Manager object is created via the manager and employee classes, and then this object is written to the Employees array. 

![Inputting Manager](https://github.com/thelbaumann/team-generator/blob/main/assets/manager-inquirer.png)

Then the user is prompted if they want to add an employee or finish their team. If they add an employee, it first asks the general questions required of every employee, and then asks if the employee mentioned is an engineer or an intern. Based on this, it triggers a switch statement which calls either a MakeEngineer or MakeIntern function and passes it the needed information collected beforehand. At this point, role-specific data is acquired, and then a new object using both the employee and the role-specific class is created, and then also appended to the Employee array. Then this code block begins again, asking the user if they wish to add another employee, or finish their team.

![Inputting Intern](https://github.com/thelbaumann/team-generator/blob/main/assets/intern-inquirer.png)

Once the user indicates to finish their team, the Employee array is passed to the render function inside the lib file 'htmlRenderer.js' and then the return value is then written to an html file in the output folder via a try/catch and writeFileSync functionality.

![Inputting Engineer](https://github.com/thelbaumann/team-generator/blob/main/assets/engineer-finishTeam-inquirer.png)


 #### Click to watch the video below, which displays a utilization of this application!

[Application Walkthrough Video](https://drive.google.com/file/d/1VP3OzbOGgHJlVKejngkl14Qc0EwuiNQO/view)

The sample html file of the example team made in the video can be found here [here](https://github.com/thelbaumann/team-generator/blob/main/output/team.html).

## Contributing to this project
Pull requests are welcome! Find my contact information below to reach out about collaborating with me.

## Test Instructions
 Once cloned, you can run 'npm run test' to run jest-powered tests for the template classes used in this application.

## Questions?
[Laura Baumann](https://github.com/thelbaumann) -- You can reach me anytime for questions or collaboration at l.bmann@yahoo.com.
## License
This project is licensed under [MIT](LICENSE) - 2020 Laura Baumann
