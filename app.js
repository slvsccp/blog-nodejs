// módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const admin = require('./routes/admin')
const path = require('path')
//const mongoose = require("mongoose")

//body parser
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// handlebars
app.engine('handlebars', handlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
//mongoose
//public
app.use(express.static(path.join(__dirname, 'public')))
//rotas
app.use('/admin', admin)

//outros
const PORT = 8085
app.listen(PORT, () => {
  console.log('Servidor rodando!')
})
