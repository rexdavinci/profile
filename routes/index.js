var express = require('express');
var router = express.Router();
var Mail = require('../models/mail');
var Achievement = require("../models/achievements");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home');
});

router.get('/about', (req,res)=>{
  res.render('about');
});



// ====================
// ====MAILS-START=====
// ====================

router.get('/contact', (req, res) => {
  res.render('contact');
});

router.post('/contact', (req, res) => {
  var message = Mail.create(req.body).then(message => {
    res.status(201).redirect("/");
  }).catch(err => { console.log(err.message); });

});

router.get('/contact/'+process.env.PRIVATE_ROUTE, (req,res)=>{
    Mail.find()
      .exec()
      .then(mail => { res.status(200).render('mails', { mails: mail }); })
      .catch(err => { console.log(err.message); });
});

router.get('/contact/:id', (req, res) => {
  Mail.findById(req.params.id)
    .then(message => { res.render('mail', { message: message }); })
    .catch(err => { console.log(err); });
});

router.delete('/contact/:id', (req, res) => {
  Mail.findByIdAndDelete(req.params.id).then(deleted => {
    res.redirect('/contact/'+process.env.PRIVATE_ROUTE);
  }).catch(err => { console.log(err.message); });
});

// ================== 
// ====MAILS-END===== 
// ================== 




// ===========================
// ====ACHIEVEMENTS-START=====
// ===========================
router.get('/achievements', (req, res, next) => {
  Achievement.find()
    .exec()
    .then(infos => {
      res.status(200).render("achievements", {infos: infos});
    })
    .catch(err => {
      console.log(err.message);
    });
});

router.get("/achievements/new", (req, res) => {
  res.render("newAchieve");
});

router.post('/achievements', (req, res) => {
  var info = Achievement.create(req.body).then(info => {
    res.status(201).redirect("/achievements");
  }).catch(err => { console.log(err.message); });

});

router.get('/achievements/:id', (req, res) => {
  Achievement.findById(req.params.id)
    .then(info => { res.render('achievement', { info: info }); })
    .catch(err => { console.log(err); });
});
/*
router.get('/:id/edit', (req, res) => {
  News.findById(req.params.id)
    .then(article => { res.render('news/editNews', { article: article }); })
    .catch(err => { console.log(err.message); });
});
/*
router.put('/:id', (req, res) => {
  News.findByIdAndUpdate(req.params.id, req.body)
    .then(updatedArticle => {
      res.redirect('/news/' + req.params.id);
    })
    .catch(err => { console.log(err.message); });
});
/*
router.delete('/:id', (req, res) => {
  News.findByIdAndDelete(req.params.id).then(deleted => {
    res.redirect('/news');
  }).catch(err => { console.log(err.message); });
});
*/
// ===========================
// =====ACHIEVEMENTS-END======
// ===========================

module.exports = router;
