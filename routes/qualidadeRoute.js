var express = require('express')
var route = express.Router()
var qualidadeCtr = require('../control/qualidadeCtr')
var multer = require('../config/multerConfig')

//rota para listar todos usando middleware
//route.get('/',qualidadeCtr.getqualidade, qualidadeCtr.listar)

//rota para listar todos
route.get('/', qualidadeCtr.listar)

//rota para listar por filtro
route.post('/', qualidadeCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', qualidadeCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), qualidadeCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', qualidadeCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), qualidadeCtr.edita)

//rota para deletar
route.get('/del/:id', qualidadeCtr.deleta)

module.exports = route;