const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const ejs = require('ejs');

const app = express();

// Controllers
const homeController = require('./controller/home');
const newUserController = require('./controller/newUser');
const loginController = require('./controller/login');
const logoutController = require('./controller/logout');
const servicesController = require('./controller/services');
const bookAppointment = require('./controller/bookAppointment');
const driverDetails = require('./controller/driverDetails');
const examinerHomeController = require('./controller/examinerHomeController');
const examinerEvaluationController = require('./controller/examinerEvaluationController');
const adminHomeController = require('./controller/adminHomeController');
const adminCreateAppointment = require('./controller/adminCreateAppointment');

// APIs
const newUserApi = require('./controller/api/newUser');

mongoose.connect('mongodb+srv://admin:admin@cluster0.gxzxfor.mongodb.net/dlKioskEJS');

const PORT = 9777;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', "ejs")
app.use(expressSession({
    secret: "keyboard cat"
}))

// Handlers
app.get('/', homeController);                                   // Entry point
app.get('/auth/register', newUserController);
app.get('/auth/login', loginController);
app.get('/auth/logout', logoutController);
app.get('/licences/services', servicesController);

app.get('/user/bookAppointment', bookAppointment);              // User
app.get('/user/driverDetails', driverDetails);                  // User

app.get('/examiner/home', examinerHomeController);              // Examiner
app.get('/examiner/evaluation', examinerEvaluationController);  // Examiner

app.get('/admin/home', adminHomeController);                    // Admin
app.get('/admin/createAppointment', adminCreateAppointment);    // Admin


// APIs
app.post('/user/register', newUserApi);

// Page Not Found 
app.use((req, res) => res.render('notfound'));  // NOT found page should always be at the end of handlers and APIs


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
} )



