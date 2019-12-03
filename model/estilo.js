const conexao = require('./conexao')

var estilo = conexao.Schema({
    nome:{
        type:String
    },
    equipamento:[
        {
            type:conexao.Schema.Types.ObjectId,
            ref:"equipamento"
        }
    ]
})

module.exports = conexao.model("estilo",estilo)