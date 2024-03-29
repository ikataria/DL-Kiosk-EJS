const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressSession = require('express-session');
const ejs = require('ejs');
const flash = require('connect-flash')

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
const adminDriversList = require('./controller/adminDriversList');

// APIs
const newUserApi = require('./controller/api/newUser');
const loginApi = require('./controller/api/loginUser');
const bookAppointmentApi = require('./controller/api/bookAppointment');
const createAppointmentApi = require('./controller/api/createAppointment');
const updateDriverDetails = require('./controller/api/updateDriverDetails');
const fetchAllDriversList = require('./controller/api/fetchAllDriversList')
const evaluateDriver = require('./controller/api/evaluateDriver');

// Middleware(s)
const userAuthMiddleware = require('./middleware/userAuthMiddleware');
const examinerAuthMiddleware = require('./middleware/examinerAuthMiddleware');
const adminAuthMiddleware = require('./middleware/adminAuthMiddleware');
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated');

mongoose.connect('mongodb+srv://admin:admin@cluster0.gxzxfor.mongodb.net/dlKioskEJS');

const PORT = 9777;

global.userLoggedIn = null;
global.examinerLoggedIn = null;
global.adminLoggedIn = null;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', "ejs");
app.use(flash());
app.use(expressSession({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
}));

app.use("*", (req, res, next) => {
    userLoggedIn = req.session.userId;
    examinerLoggedIn = req.session.examinerId;
    adminLoggedIn = req.session.adminId;
    next();
});

// Handlers
app.get('/', homeController);                                                           // Entry point
app.get('/auth/register', redirectIfAuthenticated, newUserController);
app.get('/auth/login', redirectIfAuthenticated, loginController);
app.get('/auth/logout', logoutController);
app.get('/licences/services', servicesController);

app.get('/user/bookAppointment', userAuthMiddleware, bookAppointment);                  // User
app.get('/user/driverDetails', userAuthMiddleware, driverDetails);                      // User

app.get('/examiner/home', examinerAuthMiddleware, examinerHomeController);              // Examiner
app.get('/examiner/evaluation', examinerAuthMiddleware, examinerEvaluationController);  // Examiner

app.get('/admin/home', adminAuthMiddleware, adminHomeController);                       // Admin
app.get('/admin/createAppointment', adminAuthMiddleware, adminCreateAppointment);       // Admin
app.get('/admin/driversList', adminAuthMiddleware, adminDriversList);                   // Admin

// APIs
app.post('/user/register', redirectIfAuthenticated, newUserApi);
app.post('/user/login', redirectIfAuthenticated, loginApi);
app.post('/user/bookAppointment', bookAppointmentApi);
app.post('/user/updateDriverDetails', updateDriverDetails);

app.post('/admin/drivers/list', fetchAllDriversList.fetchDriversListAdmin);                                          // Admin
app.post('/examiner/drivers/list', fetchAllDriversList.fetchDriversListExaminer);                                        // Admin
app.post('/examiner/evaluatePopUp', evaluateDriver)
app.post('/admin/createAppointment', createAppointmentApi);


// Page Not Found 
app.use((req, res) => res.render('notfound'));  // NOT found page should always be at the end of handlers and APIs


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
} )



