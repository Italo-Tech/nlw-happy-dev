//Chamando e armazenando o Express
const express = require("express")

//Pegar o express e executar no server
const server = express()

// Configurar pasta pública onde está meu css/script/assets
server.use(express.static("public"))

// Utilizando template enginer nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})



// configurar caminhos da miha aplicação
// Página inicial
// req: Requisição
// res: Resposta
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Dois títulos" })
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    return res.render("search-results.html")
})

//Server(express) ouvir a porta 3000
server.listen(3000)