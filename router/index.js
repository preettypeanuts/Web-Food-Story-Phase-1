const express = require('express');
const router = express.Router();

const UserController = require('../controllers/UserController')
const AdminController = require('../controllers/AdminController')
const ProfileController = require('../controllers/ProfileController')
const PostController = require('../controllers/PostController')


// Landing Page
router.get('/', UserController.landingPage)

// User Registration
router.get('/register', UserController.registerForm);
router.post('/register', UserController.postRegister);

// User Login
router.get('/login', UserController.loginForm);
router.post('/login', UserController.postLogin);

// Global middleware
router.use(function(req, res, next){
    // console.log(req.session)
    if(!req.session.userId) {
        const error = "Please login first"
        res.redirect(`/login?error=${error}`)
    }
    else {
        next()
    }
    // console.log('Time:', Date.now())
}) 

// Admin Dashboard
router.get('/admin', AdminController.adminDashboard);
router.get('/addUser', AdminController.addUser)
router.post('/addUser', AdminController.postNewUser)
router.get('/editUser/:id', AdminController.editUser)
router.post('/editUser/:id', AdminController.updateUser)
router.get('/deleteUser/:id', AdminController.deleteUser)

//Profile Dashboard
router.get('/profile', ProfileController.profileDashboard)
router.get('/addProfile', ProfileController.addProfile)
router.post('/addProfile', ProfileController.postNewProfile)
router.get('/editProfile/:id', ProfileController.editProfile)
router.get('/editProfile/:id', ProfileController.updateProfile)
router.get('/deleteUser/:id', ProfileController.deleteProfile)

//Post Dashboard
router.get('/post', PostController.postDashboard)


// User logout
router.get('/logout', UserController.logout);

module.exports = router;
