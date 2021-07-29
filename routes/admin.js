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
  Categoria.find()
    .sort({ date: 'desc' })
    .then(categorias => {
      res.render('admin/addcategorias', { categorias: categorias })
    })
    .catch(err => {
      req.flash('error_msg', 'Houve um erro ao listar as categorias')
      res.redirect('/admin')
    })
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

// rota responsável pela edição de posts
router.get('categorias/edit/:id', (req, res) => {
  Categoria.findOne({ _id: req.params.id })
    .lean()
    .then(Categoria => {
      res.render('admin/editcategorias', { categoria: categoria.toJSON() })
    })
    .catch(err => {
      req.flash('error_msg', 'Essa categoria não existe')
      res.redirect('/admin/categorias')
    })
})

// rota para o salvamento do post
router.post('/categorias/edit', (req, res) => {
  Categoria.findOne({ _id: req.body.id })
    .then(categoria => {
      categoria.nome = req.body.nome
      categoria.slug = req.body.slug

      categoria
        .save()
        .then(() => {
          req.flash('success_msg', 'Categoria editada com sucesso!')
          res.redirect('/admin/categorias')
        })
        .catch(err => {
          req.flash('error_msg', 'Houve um erro interno ao editar a categoria')
          res.redirect('/admin/categorias')
        })
    })
    .catch(err => {
      req.flash('error_msg', 'Houve um erro ao editar a categoria.')
      res.redirect('/admin/categorias')
    })
})

module.exports = router
