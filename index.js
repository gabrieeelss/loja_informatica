const express = require('express')
const app = express()

/* Indica que todas as requisições podem receber Body em JSON. A partir disso, o Express aplica um JSON.parse para o conteudo recebido */

app.use(express.json())

app.get('/', function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.send('Loja-Informatica')
})

let mysql = require('mysql')
let conexao = mysql.createConnection({
    host: "108.179.193.209",
    user: "gutoxa27_alunos",
    password: "JD_eXLNHp1ZG",
    database: "gutoxa27_bd_loja"
})


conexao.connect(function (erro) {
    if (erro) {
        console.log("Deu ruim na conexão \n");
        throw erro;
    } else {
        console.log("Conexão deu BOM \n")
    }
})

// Read All - [GET] /produtos
app.get("/produtos", function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    conexao.query("SELECT * FROM produtos", function (erro, lista_produtos, campos) {
        console.log(lista_produtos);
        res.send(lista_produtos)
    })
})
// Read by categoria - [GET] /produtos/:categoria
app.get("/produtos/:categoria", function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    // pegamos a categoria que foi enviada na requisição
    const categoria = req.params.categoria
    conexao.query(`SELECT * FROM produtos where categoria='${categoria}'`, function (erro, dados, campos) {
        res.send(dados)
    })
})

// Read by categoria - [GET] /produtos/:categoria/:ordem
app.get("/produtos/:categoria/:ordem", function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    // pegamos a categoria que foi enviada na requisição
    const categoria = req.params.categoria
    const ordem = req.params.ordem
    conexao.query(`SELECT * FROM produtos where categoria='${categoria}' order by ${ordem}`, function (erro, dados, campos) {
        res.send(dados)
    })
})


app.get("/unidades", function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    conexao.query("SELECT * FROM unidades", function (erro, lista_unidades) {
        console.log(lista_unidades);
        res.send(lista_unidades)

    })
})

app.listen(3000)
