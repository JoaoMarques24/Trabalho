const conexao = require('./conexao')

var qualidade = conexao.Schema({
    qualidade:{
        type:String
    },
    
})

module.exports = conexao.model("qualidade",qualidade)