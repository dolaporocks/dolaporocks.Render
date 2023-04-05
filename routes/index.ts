import express from 'express';
const router = express.Router();
import Contact from "../models/user";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home', page: "home", displayName: "" });
});

//firstname, lastname
router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home', page: "home", displayName: "" });
});
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About Us', page: "about", displayName: "" });
});

router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact Us', page: "contact", displayName: "" });
});

router.get('/contact-list', function(req, res, next) {

  Contact.find().then(function(contacts ){
    console.log(contacts);
  }).catch(function(err){
    console.error("Encountered an Error reading from the Database: " + err);
    res.end();
  });

  res.render('index', { title: 'Contact List', page: "contact-list", displayName: "" });
});

router.get('/edit', function(req, res, next) {
  res.render('index', { title: 'Edit', page: "edit", displayName: "" });
});

router.get('/products', function(req, res, next) {
  res.render('index', { title: 'Products', page: "products", displayName: "" });
});

router.get('/login', function(req, res, next) {
  res.render('index', { title: 'Login', page: "login", displayName: "" });
});

router.get('/register', function(req, res, next) {
  res.render('index', { title: 'Register', page: "register", displayName: "" });
});

router.get('/service', function(req, res, next) {
  res.render('index', { title: 'Service', page: "service", displayName: "" });
});

export default router;
