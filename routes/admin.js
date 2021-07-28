const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
require('../models/Categoria')
const Categoria = mongoose.model('categorias')

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

// rota responsável por cadastrar o formulário dentro do mongo
router.post('/categorias/nova', (req, res) => {
  var erros = []

  if (!req.body.nome) {
    erros.push({ texto: 'Nome inválido' })
  }
  if (!req.body.slug) {
    erros.push({ texto: 'Slug inválido' })
  }
  if (req.body.nome.length < 2) {
    erros.push({ texto: 'Nome da categoria muito curto' })
  }
  if (erros.length > 0) {
    res.render('admin/addcategorias', { erros: erros })
  } else {
    const novaCategoria = {
      nome: req.body.nome,
      slug: req.body.slug
    }
    new Categoria(novaCategoria)
      .save()
      .then(() => {
        req.flash('success_msg', 'Categoria criada com sucesso!')
        res.redirect('/admin/categorias')
      })
      .catch(err => {
        req.flash(
          'error_msg',
          'Houve um erro ao salvar a categoria, tente novamente.'
        )
        res.redirect('/admin')
      })
  }
})

module.exports = router
