const express = require('express')
var bodyparser = require('body-parser')
var cookieparser = require('cookie-parser')
var path = require('path')
const app = express()
var estiloRoute = require('./routes/estiloRoute')
var qualidadeRoute = require('./routes/qualidadeRoute')
var marcaRoute = require('./routes/marcaRoute')
var equipamentoRoute = require('./routes/equipamentoRoute')

app.use(cookieparser())

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))

app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

app.listen(3000,function(){
    console.log('O servidor esta funcionando!')
})

app.use('/estilo',estiloRoute)
app.use('/qualidade',qualidadeRoute)
app.use('/marca',marcaRoute)
app.use('/equipamento',equipamentoRoute)