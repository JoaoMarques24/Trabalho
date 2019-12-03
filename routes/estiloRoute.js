var express = require('express')
var route = express.Router()
var estiloCtr = require('../control/estiloCtr')

// rota para listar todos usando middleware
//route.get('/',estiloCtr.getEstilo, estiloCtr.listar)
route.get('/',estiloCtr.getEstilo, estiloCtr.listar)

//rota para listar por filtro
route.post('/', estiloCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', estiloCtr.abrirAdiciona)

//rota para adicionar
route.post('/add', estiloCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', estiloCtr.abrirEdita)

//rota para editar
route.post('/edit/:id', estiloCtr.edita)

//rota para deletar
route.get('/del/:id', estiloCtr.deleta)

module.exports = route;