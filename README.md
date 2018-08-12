# Employee-Directory

A website that displays an Employee Directory. The data fields for each employee are Employee ID, Name, Email, Number, Position, and Manager. The user is able to add, remove, edit, and update employees in the directory and also filter and sort based on the aforementioned data fields. If the user attempts to enter an invalid employee (e.g. no name or ID, employee already exists, or invalid manager), an error message will pop up on the screen. The user is also able to clear all input fields.

This application uses the MEAN stack, so the user must have MongoDB, Express.js, AngularJS, and Node.js installed. The server.js file connects to a MongoDB database called employeeList so all data retrieved must be from there. 

Note: node_modules folder is missing in this repository because it contains too many files (ensure those are installed before using the application)
