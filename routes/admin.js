const express = require('express')
const router = express.Router()

// rota principal para o painel administrativo
router.get('/', (req, res) => {
  res.render('admin/index')
})

// rota para os posts
router.get('/post', (req, res) => {
  res.send('Posts')
})

// rota de categorias
router.get('/categorias', (req, res) => {
  res.render('admin/categorias')
})

// rota para o formulário
router.get('/categorias/add', (req, res) => {
  res.render('admin/addcategorias')
})

module.exports = router
