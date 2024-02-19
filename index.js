const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

// Controllers
const homeController = require('./controller/home');
const newUserController = require('./controller/newUser');
const loginController = require('./controller/login');

mongoose.connect('mongodb+srv://admin:admin@cluster0.gxzxfor.mongodb.net/dlKioskEJS');

const PORT = 9777;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', "ejs")

// Handlers
app.get('/', homeController); // Entry point

app.get('/auth/register', newUserController);
app.get('/auth/login', loginController);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
} )