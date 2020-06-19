//Selecionando o "link" da page home
const buttonSearch = document.querySelector("#page-home main a")

//Selecionando o modal inteiro
const modal = document.querySelector("#modal")

//Selecionando o "a" do header
const close = document.querySelector("#modal .header a")

//Removendo a classe hide com o evento de click no "page-home main a"
buttonSearch.addEventListener("click", () => {
    modal.classList.remove("hide")
})

//Adicionando classe hide com o evento de click no "#modal .header a" 
close.addEventListener("click", () => {
    modal.classList.add("hide")
})