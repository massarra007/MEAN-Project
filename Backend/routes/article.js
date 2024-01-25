const express = require('express');

const router = express.Router();

const Article = require('../models/article.js');

const multer = require('multer');

const Filter = require('bad-words');

const filter = new Filter();

let filename = '';
const mystorage = multer.diskStorage(
    {
        destination: './upload',
        filename:( req , file , cb )=>{
            let date = Date.now();
            //53453535345.jpg
            // image/png
            // [ 'image', 'png' ]
            let fl = date + '.' + file.mimetype.split('/')[1];
            cb(null, fl);
            filename = fl;
        } 
    }
);

const upload = multer({ storage: mystorage })

// ajout avec upload
router.post('/create', upload.any('image'), (req, res) => {
    let dataFromPostman = req.body;

    // Filter the description for bad words
    dataFromPostman.description = filter.clean(dataFromPostman.description);

    let article = new Article(dataFromPostman);
    article.image = filename;

    article.save()
        .then((savedArticle) => {
            filename = '';
            console.log('Article saved:', savedArticle);
            res.send(savedArticle);
        })
        .catch((error) => {
            console.log('Error saving article:', error);
            res.status(500).send('Internal Server Error');
        });
});
  
  //ajout sans upload
  

router.post( '/ajout'  , ( req , res )=>{
    let dataFromPostman = req.body;
    let article = new Article( dataFromPostman );
  
    article.save()
          .then(
              (savedArticle)=>{
                 
                  console.log(savedArticle);
                  res.send(savedArticle);
              }
          )
          .catch(
              (error)=>{
                  console.log(error);
                  res.send(error)
              }
          )
  } );
  
  
  router.get( '/all' , (req, res)=>{
     
      Article.find()
          .then(
              (allArticles)=>{
                  res.send(allArticles);
              }
          )
          .catch(
              (error)=>{
                  res.send(error);
              }
          )
  
  } )
  

  
  router.get('/getbyid/:id' , (req, res)=>{
  
      let myid = req.params.id;
  
      Article.findOne({ _id: myid })
                  .then(
                      (art)=>{
                          res.send(art);
                      }
                  )
                  .catch(
                      (err)=>{
                          res.send(err)
                      }
                  )
  
  })
  
  router.get('/getbyiduser/:id' , (req, res)=>{
  
    let id = req.params.id;

    Article.find({ idUser : id })
                .then(
                    (art)=>{
                        res.send(art);
                    }
                )
                .catch(
                    (err)=>{
                        res.send(err)
                    }
                )

})

  
  router.delete( '/supprimer/:id' , (req , res)=>{
  
       let id = req.params.id;
       
      Article.findByIdAndDelete( { _id: id } )
          .then(
              (deletedArticle)=>{
                  res.send(deletedArticle);
              }
          )
          .catch(
              (err)=>{
                  res.send(err);
              }
          )
  
  } )
  
  router.put('/update/:id', upload.any('image'), async (req, res) => {
    const id = req.params.id;
    const newData = req.body;
  
    if (req.files && req.files.length > 0) {
      newData.image = req.files[0].filename;
    }
  
    try {
      const updatedArticle = await Article.findOneAndUpdate({ _id: id }, newData, { new: true });
  
      if (!updatedArticle) {
        return res.status(404).json({ message: 'Article not found' });
      }
  
      res.json(updatedArticle);
    } catch (error) {
      console.error('Error updating article:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  router.get('/count-articles/:userId', async (req, res) => {
    const userId = req.params.userId;

    try {
        const count = await Article.countDocuments({ idUser: userId });
        res.json({ count });
    } catch (error) {
        console.error('Error counting articles:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;