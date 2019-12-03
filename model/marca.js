const conexao = require('./conexao')

var marca = conexao.Schema({
    nome:{
        type:String
    },
   
    foto:{
        type:String
    }
})

module.exports = conexao.model("marca",marca)