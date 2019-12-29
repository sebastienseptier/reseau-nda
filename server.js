//Import des librairies et de la config
const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
require('dotenv').config()

const PORT = process.env.PORT || 3000;

const app = express()
app.use(express.json())

//Connexion à la base de données
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

//Import des routes
const userRouter = require('./api/routes/user')
app.use('/users', userRouter)

app.listen(PORT, () => {
  console.log('Server started on port ' + PORT + ' in ' + process.env.NODE_ENV + ' mode');
});