var estilo = require('../model/estilo')

//middleware para buscar estilo
function getEstilo(req,res,next){
    estilo.find({}).lean().exec(function(err,docs){
        req.estilo = docs
        next()
    })
}

function listar(req,res){
    estilo.find({}).lean().exec(function(err,docs){
        res.render('estilo/list.ejs',{"Estilo" : docs})
    })
}

function filtrar(req,res){
    estilo.find({ nome : new RegExp(req.body.pesquisa, 'i') })
    .lean().exec(function(err,docs){
        res.render('estilo/list.ejs',{"Estilo" : docs})
    })
}

function abrirAdiciona(req,res){
    res.render("estilo/add.ejs")
}

function adiciona(req,res){
    var novoEstilo = new estilo({
        nome: req.body.nome
    })
    novoEstilo.save(function(err){
        if(err){
            estilo.find({}).lean().exec(function(err,docs){
                res.render('estilo/list.ejs', { msg: "Problema ao salvar!", Estilo: docs })
            })            
        }else{
            estilo.find({}).lean().exec(function(err,docs){
                res.render('estilo/list.ejs', { msg: "Adicionado com sucesso!", Estilo: docs })
            })   
        }
    })
}

function abrirEdita(req,res){
    estilo.findById(req.params.id,function(err,estilo){
        res.render('estilo/edit.ejs',{'estilo':estilo});
    })    
}

function edita(req,res){
    estilo.findByIdAndUpdate(req.params.id, {nome:req.body.nome},function(err){
        if(err){
            estilo.find({}).lean().exec(function(err,docs){
                res.render('estilo/list.ejs', { msg: "Problema ao editar!", Estilo: docs })
            })            
        }else{
            estilo.find({}).lean().exec(function(err,docs){
                res.render('estilo/list.ejs', { msg: "Editado com sucesso!", Estilo: docs })
            })   
        }
    })
}

function deleta(req,res){
    estilo.findByIdAndDelete(req.params.id,function(){
        estilo.find({}).lean().exec(function(err,docs){
            res.render('estilo/list.ejs', { msg: "Removido com sucesso!", Estilo: docs })
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
    getEstilo
}