//Import des librairies et de la config
const express = require('express')
var path = require('path'); // NodeJS Package for file paths
const mongoose = require('mongoose')
require('dotenv').config()

const PORT = process.env.PORT || 3000;

const app = express()
app.use(express.json())

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