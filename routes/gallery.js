var express = require("express");
var router = express.Router();
var Gallery = require("../models/gallery");
// var multer = require('multer');

// var storage = multer.diskStorage({
//     destination: (req, file, cb)=>{
//         cb(null, './uploads/');
//     },
//     filename: (req, file, cb) =>{
//         cb(null, new Date().toISOString() + file.originalname);
//     }
// });

// var fileFilter = (req, file, cb) => {

//     if (file.mimetype === "image/jpeg || file.mimetype ==image/png") {
//       cb(null, true); //accepts type of files
//     } else {
//       cb(null, false); //ignore file
//     }   
// };

// var upload = multer({ 
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 3
//     }, 
//     fileFilter: fileFilter });

router.get("/", (req, res) => {
  Gallery.find({})
    .exec()
    .then(media => {
      res.status(200).render("gallery/index", {photos: media});
    })
    .catch(err => {
      console.log(err.message);
    });
});

router.get("/new", (req, res) => {
  res.render("gallery/newPhoto");
});

router.post("/", (req, res, next) => {
  var media = Gallery.create(req.body)
    .then(photo => {
      res.status(201).redirect("/gallery");
    })
    .catch(err => {
      console.log(err.message);
    });
});

router.get("/:id", (req, res) => {
  Gallery.findById(req.params.id)
    .then(article => {
      res.render("gallery/show", { media: media });
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/:id/edit", (req, res) => {
  Gallery.findById(req.params.id)
    .then(article => {
      res.render("gallery/editMedia", { gallery: gallery });
    })
    .catch(err => {
      console.log(err.message);
    });
});

router.put("/:id", (req, res) => {
  Gallery.findByIdAndUpdate(req.params.id, req.body)
    .then(updatedMedia => {
      res.redirect("/gallery/" + req.params.id);
    })
    .catch(err => {
      console.log(err.message);
    });
});

router.delete("/:id", (req, res) => {
  Gallery.findByIdAndDelete(req.params.id)
    .then(deleted => {
      res.redirect("/gallery");
    })
    .catch(err => {
      console.log(err.message);
    });
});

module.exports = router;