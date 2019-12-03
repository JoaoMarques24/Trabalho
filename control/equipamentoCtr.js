var equipamento = require('../model/equipamento')
var marca = require('../model/marca')
var estilo = require('../model/estilo')
var qualidade = require('../model/qualidade')

//middleware para buscar livros
function getEquipamento(req, res, next) {
    equipamento.find({}).lean().exec(function (err, docs) {
        req.equipamento = docs
        next()
    })
}

function listar(req, res) {
    equipamento
        .find({})
        .populate('estilo')
        .populate('marca')
        .populate('qualidade')
        .lean()
        .exec(function (err, docs) {
            res.render('equipamento/list.ejs', { "Equipamento": docs })
        })
}

function filtrar(req, res) {
    equipamento
        .find({ cor: new RegExp(req.body.pesquisa, 'i') })
        .populate('estilo')
        .populate('marca')
        .populate('qualidade')
        .lean()
        .exec(function (err, docs) {
            res.render('equipamento/list.ejs', { "Equipamento": docs })
        })
}

function abrirAdiciona(req, res) {
    marca
        .find({})
        .lean()
        .exec(function (e, marca) {
            qualidade
                .find({})
                .lean()
                .exec(function (e, qualidade) {
                    estilo
                        .find({})
                        .lean()
                        .exec(function (e, estilo) {
                            res.render("equipamento/add.ejs", { "Marca": marca, "Qualidade": qualidade, "Estilo": estilo })
                        });
                });
        });
}

function adiciona(req, res) {

    var novoEquipamento = new equipamento({
        cor: req.body.cor,
        material: req.body.material,
        qualidade: req.body.qualidade,
        foto: req.file.filename,
        estilo: req.body.estilo,
        marca: req.body.marca,
        qualidade: req.body.qualidade,
    })
    novoEquipamento.save(function (err) {
        if (err) {
            equipamento.find({}).populate('estilo').populate('marca').populate('qualidade').lean().exec(function (err, docs) {
                res.render('equipamento/list.ejs', { msg: "Problema ao salvar!", Equipamento: docs })
            })
        } else {
            equipamento.find({}).populate('estilo').populate('marca').populate('qualidade').lean().exec(function (err, docs) {
                res.render('equipamento/list.ejs', { msg: "Adicionado com sucesso!", Equipamento: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    marca.find({}).lean().exec(
        function (e, marca) {
            qualidade.find({}).lean().exec(
                function (e, qualidade) {
                    estilo.find({}).lean().exec(
                        function (e, estilo) {
                            equipamento.findOne({ _id: req.params.id }).populate('estilo').populate('marca').populate('qualidade').exec(
                                function (err, equipamento) {
                                    res.render('equipamento/edit.ejs', { 'equipamento': equipamento, "Marca": marca, "Qualidade": qualidade, "Estilo": estilo });
                                });
                        });
                });
        });
}

function edita(req, res) {
    equipamento.findByIdAndUpdate(req.params.id,
        {
            cor: req.body.cor,
            material: req.body.material,
            qualidade: req.body.qualidade,
            foto: req.file.filename,
            estilo: req.body.estilo,
            marca: req.body.marca,
            qualidade: req.body.qualidade
        }, function (err) {
            if (err) {
                equipamento.find({}).populate('estilo').populate('marca').populate('qualidade').lean().exec(function (err, docs) {
                    res.render('equipamento/list.ejs', { msg: "Problema ao editar!", Equipamento: docs })
                })
            } else {
                equipamento.find({}).populate('estilo').populate('marca').populate('qualidade').lean().exec(function (err, docs) {
                    res.render('equipamento/list.ejs', { msg: "Editado com sucesso!", Equipamento: docs })
                })
            }
        })
}

function deleta(req, res) {
    equipamento.findByIdAndDelete(req.params.id, function () {
        livro.find({}).populate('estilo').populate('marca').populate('qualidade').lean().exec(function (err, docs) {
            res.render('equipamento/list.ejs', { msg: "Removido com sucesso!", Equipamento: docs })
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
    getEquipamento
}