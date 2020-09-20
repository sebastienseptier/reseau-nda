//Import des librairies et de la config
const express = require('express')
var path = require('path'); // NodeJS Package for file paths
const mongoose = require('mongoose')
require('dotenv').config()

const PORT = process.env.PORT || 3000;

const app = express()
app.use(express.json())

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

//Connexion à la base de données
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, user: "sseptier", pass: "azerty", dbName: "reseau_nda" })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

//Import des routes
const userRouter = require('./api/routes/user')
const postRouter = require('./api/routes/post')
app.use('/api/users', userRouter)
app.use('/api/posts', postRouter)

//Connect server to Angular project
app.use(express.static(path.join(__dirname, '/frontend/dist/')));
app.use('*', express.static(path.join(__dirname, '/frontend/dist/')));

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT + ' in ' + process.env.NODE_ENV + ' mode');
});