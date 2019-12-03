var marca = require('../model/marca')


//middleware para buscar marca
function getMarca (req, res, next) {
    marca.find({}).lean().exec(function (err, docs) {
        req.marca = docs
        next()
    })
}

function listar(req, res) {
    marca.find({}).lean().exec(function (err, docs) {
        res.render('marca/list.ejs', { "Marca": docs })
    })
}

function filtrar(req, res) {
    marca.find({ nome: new RegExp(req.body.pesquisa, 'i') })
        .lean().exec(function (err, docs) {
            res.render('marca/list.ejs', { "Marca": docs })
        })
}

function abrirAdiciona(req, res) {
    res.render("marca/add.ejs")
}

function adiciona(req, res) {
    var novoMarca = new marca({
        nome: req.body.nome,
                foto: req.file.filename
    })
    novoMarca.save(function (err) {
        if (err) {
            marca.find({}).lean().exec(function (err, docs) {
                res.render('marca/list.ejs', { msg: "Problema ao salvar!", Marca: docs })
            })
        } else {
            marca.find({}).lean().exec(function (err, docs) {
                res.render('marca/list.ejs', { msg: "Adicionado com sucesso!", Marca: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    marca.findById(req.params.id, function (err, marca) {
        res.render('marca/edit.ejs', { 'marca': marca });
    })
}

function edita(req, res) {
    marca.findByIdAndUpdate(req.params.id,
        {
            nome: req.body.nome,
            
            
            foto: req.file.filename
        }, function (err) {
            if (err) {
                marca.find({}).lean().exec(function (err, docs) {
                    res.render('marca/list.ejs', { msg: "Problema ao editar!", Marca: docs })
                })
            } else {
                marca.find({}).lean().exec(function (err, docs) {
                    res.render('marca/list.ejs', { msg: "Editado com sucesso!", Marca: docs })
                })
            }
        })
}

function deleta(req, res) {
    marca.findByIdAndDelete(req.params.id, function () {
        marca.find({}).lean().exec(function (err, docs) {
            res.render('marca/list.ejs', { msg: "Removido com sucesso!", Marca: docs })
        })
    })

}

module.exports = {
    listar,
    filtrar,
    abrirAdiciona,
    adiciona,
    abrirEdita,
    edita,
    deleta,
    getMarca
}