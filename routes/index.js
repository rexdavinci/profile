var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/about', (req,res)=>{
  res.render('about'); 
});

router.get('/gallery', (req, res) => {
  res.render('gallery');
});

router.get('/contact', (req, res) => {
  res.render('contact');
});

router.get("/achievements", (req, res) => {
  res.render("achievements");
});

module.exports = router;
