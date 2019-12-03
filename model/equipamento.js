const conexao = require('./conexao')

var equipamento = conexao.Schema({
    cor:{
        type:String
    },
    material:{
        type:String
    },
    qualidade:{
        type:String
    },
    foto:{
        type:String
    },
    estilo:{
        type:conexao.Schema.Types.ObjectId,
        ref: "estilo"
    },
    marca:{
        type:conexao.Schema.Types.ObjectId,
        ref: "marca"
    },
    qualidade:[{
        type:conexao.Schema.Types.ObjectId,
        ref: "qualidade"
    }]
})

module.exports = conexao.model("equipamento",equipamento)