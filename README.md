# Employee-Directory

A website that manages an Employee Directory, displayed as a table. The data fields for each employee are Employee ID, Name, Email, Number, Position, and Manager. On the website, all CRUD (create, retrieve, update, delete) actions can be performed on employees in the directory (data persisted in MongoDB). Users can also filter and sort on each data field. If users attempt to add an invalid employee (e.g. no name or ID, employee already exists, or invalid manager), a modal window with an error message will be displayed on the screen. Users are able to clear all input fields as well.

This application uses the MEAN stack, so the user must install Node.js and Express.js (using npm) as well as MongoDB. AngularJS is linked to html using its CDN. The server.js file connects to a MongoDB collection called employeeList so all data must be saved there so it can be retrieved.

Note: node_modules folder is missing from this repository because it contains too many files (ensure those are installed before using this application)

To run the application, open Git Bash (must be installed first), navigate to the folder where mongod.exe is stored and run it (to establish the connection between server.js and MongoDB's employeeList). Then, open another Git Bash window, navigate to this Employee-Directory repository, and type "node server" (no quotation marks) to establish the connection to the server.js file. Finally, open a web browser and type localhost:3000 to access the website.

This application is loosely based around a YouTube tutorial by "Learn Coding Tutorials". For more information on installing Node.js, Express.js, MongoDB, etc., refer to https://www.youtube.com/watch?v=kHV7gOHvNdk, and its following sections.
