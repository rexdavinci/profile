var express = require('express');
var router = express.Router();
var News = require('../models/news');

router.get('/', (req, res) => {
    News.find({})
        .exec()
        .then(news => { res.status(200).render('news/index', { news: news }); })
        .catch(err => { console.log(err.message); });
});

router.get('/new', (req, res) => {
    res.render('newArticle');
});

router.post('/', (req, res) => {
    var article = News.create(req.body).then(article => {
        res.status(201).redirect("/news");
    }).catch(err => { console.log(err.message); });

});

router.get('/:id', (req, res) => {
    News.findById(req.params.id)
        .then(article => { res.render('news/show', { article: article }); })
        .catch(err => { console.log(err); });
});

router.get('/:id/edit', (req, res) => {
    News.findById(req.params.id)
        .then(article => { res.render('news/editNews', { article: article }); })
        .catch(err => { console.log(err.message); });
});

router.put('/:id', (req, res) => {
    News.findByIdAndUpdate(req.params.id, req.body)
        .then(updatedArticle => {
            res.redirect('/news/' + req.params.id);
        })
        .catch(err => { console.log(err.message); });
});

router.delete('/:id', (req, res) => {
    News.findByIdAndDelete(req.params.id).then(deleted => {
        res.redirect('/news');
    }).catch(err => { console.log(err.message); });
});

module.exports = router;