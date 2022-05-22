# Notes-MERN-client
Test Ensolvers

This web application was created for #Ensolvers in a challenge for an interview process

Requirements:

Have installed:

MongoDBcompass version 1.31.2
NodeJS version 12.3.1

To start the project you have to run bash init.sh: ./init.sh

To enter from the browser you have to access: localhost:3000

The dependencies used were:

{
  "name": "mernnoteserver",
  "version": "1.0.0",
  "description": "MERN API for Ensolvers",
  "main": "index.js",
  "scripts": {
    "start": "node .",
    "dev": "nodemon ."
  },
  "author": "Franco Brizuela",
  "license": "ISC",
  "devDependencies": {
    "nodemon": "^2.0.16"
  },
  "dependencies": {
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "express": "^4.18.1",
    "express-validator": "^6.14.0",
    "mongoose": "^6.3.3"
  }
}


In case there are conflicts in the installation of dependencies, the following were done:

client:
npx create-react-app
npm i react-transition-group
npm i axios
npm i sweetalert2

server:
npm init
npm i -D nodemon
npm i express mongoose dotenv
npm i express-validator
npm i cors

In the design I used BOOTSTRAP v5.1 and CSS
for alerts use SweetAlert2
