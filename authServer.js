//Import des librairies et de la config
const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('./api/models/user')
require('dotenv').config()

const PORT = process.env.PORT || 4000;
const TOKEN_DURATION = '40s';

const app = express()
app.use(express.json())

//Connexion à la base de données
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, user: "sseptier", pass: "azerty", dbName: "reseau_nda" })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

//Définition des routes d'authentification

app.post("/login", (req, res) => {
  User.find({ email: req.body.email })
    .exec().then(user => {
      if (user.length < 1) {
        return res.status(401).json({ message: "Auth failed" });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({ message: "Auth failed" });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: TOKEN_DURATION
            }
          );
          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        }
        res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

app.post('/signup', (req, res) => {
  User.find({ email: req.body.email })
    .exec().then(user => {
      if (user.length >= 1) {
        return res.status(409).json({ message: "Mail already exists" });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({ error: err });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              email: req.body.email,
              password: hash
            });
            user.save().then(result => {
                console.log(result);
                res.status(201).json({ message: "User created" });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
              }
            );
          }
        });
      }
    });
})

app.listen(PORT, () => {
  console.log('Authentication service started on port ' + PORT + ' in ' + process.env.NODE_ENV + ' mode');
});