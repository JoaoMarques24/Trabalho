var express = require('express')
var route = express.Router()
var equipamentoCtr = require('../control/equipamentoCtr')
var multer = require('../config/multerConfig')

// rota para listar todos usando middleware
//route.get('/',livroCtr.getLivros, livroCtr.listar)
route.get('/',equipamentoCtr.getEquipamento, equipamentoCtr.listar)

//rota para listar por filtro
route.post('/', equipamentoCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', equipamentoCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), equipamentoCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', equipamentoCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), equipamentoCtr.edita)

//rota para deletar
route.get('/del/:id', equipamentoCtr.deleta)

module.exports = route;