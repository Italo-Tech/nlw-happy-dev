//Chamando e armazenando o Express
const express = require("express")

//Pegar o express e executar no server
const server = express()

//Pegar o banco de dads
const db = require("./database/db")

// Configurar pasta pública onde está meu css/script/assets
server.use(express.static("public"))

// Habilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }))

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

    // req.query: Query Strings da nossa url 
    console.log(req.query)

    return res.render("create-point.html")
})

server.get("/point-error", (req, res) => {

    // req.query: Query Strings da nossa url 
    // console.log(req.query)

    return res.render("point-error.html")
})

server.post("/savepoint", (req, res) => {

    // req.body: o corpo do nosso formulário
    // console.log(req.body)

    // inserir dados no banco de dados 
    const query = `
             INSERT INTO places (
                 image,
                 name,
                 address,
                 address2,
                 state,
                 city,
                 items
             ) VALUES (?,?,?,?,?,?,?);
         `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.render("partials/point-error.html")
        }

        console.log(this)

        return res.render("create-point.html", { saved: true })
    }

    db.run(query, values, afterInsertData)

})

server.get("/search", (req, res) => {

    const search = req.query.search

    // Comentar este if para aparecer todos o locais
    if (search == "") {
        // pesquisa vazia
        return res.render("search-results.html", { total: 0 })
    }


    //Pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        // db.all(`SELECT * FROM places`, function (err, rows) { // Para consultar todos os locais
        if (err) {
            return console.log(err)
        }

        const total = rows.length

        // mostrar a página html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total })
    })
})

//Server(express) ouvir a porta 3000
server.listen(3000)