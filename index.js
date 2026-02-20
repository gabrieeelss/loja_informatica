const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())
// necessário para permitir requisições de diferentes origens(dominios/servidores)
const cors = require('cors')
app.use(cors())

/* Indica que todas as requisições podem receber Body em JSON. A partir disso, o Express aplica um JSON.parse para o conteudo recebido */

app.use(express.json())

app.get('/', function (req, res) {
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
    conexao.query("SELECT * FROM produtos", function (erro, lista_produtos, campos) {
        console.log(lista_produtos);
        res.send(lista_produtos)
    })
})

// Read ONE - [GET] /produto
app.get("/produto/:id", function (req, res){
    const id = req.params.id
    conexao.query("SELECT * FROM produtos where id = ? ", [id] ,
        function (erro, dados, campos){
            res.json(dados)
        })
})

// Read by categoria - [GET] /produtos/:categoria
app.get("/produtos/:categoria", function (req, res) {
    // pegamos a categoria que foi enviada na requisição
    const categoria = req.params.categoria
    conexao.query(`SELECT * FROM produtos where categoria='${categoria}'`, function (erro, dados, campos) {
        res.send(dados)
    })
})

// Read by categoria - [GET] /produtos/:categoria/:ordem
app.get("/produtos/:categoria/:ordem", function (req, res) {
    // pegamos a categoria que foi enviada na requisição
    const categoria = req.params.categoria
    const ordem = req.params.ordem
    conexao.query(`SELECT * FROM produtos where categoria='${categoria}' order by ${ordem}`, function (erro, dados, campos) {
        res.send(dados)
    })
})


app.get("/unidades", function (req, res) {
    conexao.query("SELECT * FROM unidades", function (erro, lista_unidades) {
        console.log(lista_unidades);
        res.send(lista_unidades)

    })
})
app.post("/produto", function (req, res) {
    const  data = req.body
    conexao.query('INSERT INTO produtos set ?', [data], 
    function (erro, resultado) {
        if (erro) {
            res.json(erro);
        }
        res.send(resultado.insertId);
        });
    })

    app.post("/unidades", function (req, res) {
    const data = req.body
    conexao.query('INSERT INTO unidades set?', [data],
    function (erro, resultado) {
        if (erro) {
            res.json(erro);
        }
        res.send(resultado.insertId);
        });
    })

// LOGIN
app.post("/login/", function (req, res){
    const usuario = req.body.usuario
    const senha = req.body.senha
    conexao.query(`select * from usuarios where usuario = '${usuario}' and senha = '${senha}'`, function (erro, resultado, campos){
        if (erro){
            res.send(erro)
        }else{
            if (resultado.length > 0){
                res.sendStatus(200)
            }else{
                res.sendStatus(401)
            }
        }
    })
})

// CADASTRO DE USUARIOS 
    app.post("/cad-user", function (req, res) {
    const data = req.body
    conexao.query('INSERT INTO usuarios set?', [data],
    function (erro, resultado) {
        if (erro) {
            res.json(erro);
        }
        res.send(resultado.insertId);
        });
    })
app.listen(3000)