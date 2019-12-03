var qualidade = require('../model/qualidade')


//middleware para buscar qualidade
function getQualidade(req, res, next) {
    qualidade.find({}).lean().exec(function (err, docs) {
        req.qualidade = docs
        next()
    })
}

function listar(req, res) {
    qualidade.find({}).lean().exec(function (err, docs) {
        res.render('qualidade/list.ejs', { "Qualidade": docs })
    })
}

function filtrar(req, res) {
    qualidade.find({ nome: new RegExp(req.body.pesquisa, 'i') })
        .lean().exec(function (err, docs) {
            res.render('qualidade/list.ejs', { "Qualidade": docs })
        })
}

function abrirAdiciona(req, res) {
    res.render("qualidade/add.ejs")
}

function adiciona(req, res) {
    var novoQualidade = new qualidade({
        qualidade: req.body.qualidade,
        
    })
    novoQualidade.save(function (err) {
        if (err) {
            qualidade.find({}).lean().exec(function (err, docs) {
                res.render('qualidade/list.ejs', { msg: "Problema ao salvar!", Qualidade: docs })
            })
        } else {
            qualidade.find({}).lean().exec(function (err, docs) {
                res.render('qualidade/list.ejs', { msg: "Adicionado com sucesso!", Qualidade: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    qualidade.findById(req.params.id, function (err, qualidade) {
        res.render('qualidade/edit.ejs', { 'qualidade': Qualidade });
    })
}

function edita(req, res) {
    qualidade.findByIdAndUpdate(req.params.id,
        {
            qualidade: req.body.qualidade,
            
        }, function (err) {
            if (err) {
                qualidade.find({}).lean().exec(function (err, docs) {
                    res.render('qualidade/list.ejs', { msg: "Problema ao editar!", Qualidade: docs })
                })
            } else {
                qualidade.find({}).lean().exec(function (err, docs) {
                    res.render('qualidade/list.ejs', { msg: "Editado com sucesso!", Qualidade: docs })
                })
            }
        })
}

function deleta(req, res) {
    qualidade.findByIdAndDelete(req.params.id, function () {
        qualidade.find({}).lean().exec(function (err, docs) {
            res.render('qualidade/list.ejs', { msg: "Removido com sucesso!", Qualidade: docs })
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
    getQualidade
}