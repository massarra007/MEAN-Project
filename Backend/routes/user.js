const express = require("express");

const router = express.Router();

const User = require("../models/user.js");

const multer = require("multer");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const nodemailer = require('nodemailer');

let filename = "";
const mystorage = multer.diskStorage({
  destination: "./upload",
  filename: (req, file, cb) => {
    let date = Date.now();
    //53453535345.jpg
    // image/png
    // [ 'image', 'png' ]
    let fl = date + "." + file.mimetype.split("/")[1];
    cb(null, fl);
    filename = fl;
  },
});

const upload = multer({ storage: mystorage });

function sendWelcomeEmail(userEmail) {
  const transporter = nodemailer.createTransport({
    // Configurer votre transporteur d'e-mail (par exemple, Gmail)
    service: 'gmail',
    auth: {
      user: 'massarra.benjebiri@ensi-uma.tn',
      pass: 'erzq jwhj ltwg fdgy'
    }
  });

  const mailOptions = {
    from: 'benjebirimassarra@gmail.com',
    to: userEmail,
    subject: 'Bienvenue sur notre plateforme',
    text: 'Merci de vous être inscrit sur notre plateforme. Bienvenue et profitez de nos services!'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erreur lors de l\'envoi de l\'e-mail de bienvenue:', error);
    } else {
      console.log('E-mail de bienvenue envoyé:', info.response);
    }
  });
}

// ajout avec upload
router.post("/register", upload.any("image"), (req, res) => {
  let data = req.body;
  let user = new User(data);
  user.image = filename;

  salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(data.password, salt);

  user
    .save()
    .then((savedUser) => {
      filename = "";
      console.log(savedUser);
      res.status(200).send(savedUser);
      sendWelcomeEmail(user.email);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

router.post("/login", (req, res) => {
  let data = req.body;

  User.findOne({ email: data.email })
    .then((user) => {
      let valid = bcrypt.compareSync(data.password, user.password);
      if (!valid) {
        res.send("email or password invalid");
      } else {
        let payload = {
          _id: user._id,
          email: user.email,
          fullname: user.name + " " + user.lastname,
        };

        let token = jwt.sign(payload, "123456789");
        res.send({ mytoken: token });
      }
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

router.get( '/all' , (req, res)=>{
     
    User.find()
        .then(
            (allUsers)=>{
                res.send(allUsers);
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

    User.findOne({ _id: myid })
                .then(
                    (usr)=>{
                        res.send(usr);
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
     
    User.findByIdAndDelete( { _id: id } )
        .then(
            (deletedUser)=>{
                res.send(deletedUser);
            }
        )
        .catch(
            (err)=>{
                res.send(err);
            }
        )

} )

router.put( '/update/:id' , upload.any('image') , (req , res)=>{
    let id = req.params.id;
    let newData = req.body;

    if (filename.length > 0){
      newData.image = filename;
    }
    
    User.findOneAndUpdate( 
        { _id: id },
        newData
    ) .then(
        (updatedUser)=>{
            res.send(updatedUser)
        }
    )
    .catch(
        (err)=>{
            res.send(err)
        }

    )
} )

module.exports = router;
