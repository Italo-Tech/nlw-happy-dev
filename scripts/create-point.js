function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {

            //Para cada state(1º) eu vou pegar um state(2º) e armazena-lo em state(1º)
            for (const state of states) {
                // Adicionando HTML
                ufSelect.innerHTML += `<option value= "${state.id}">${state.nome}</option>`
            }
        })
}
populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    //Pega o id do estado e armazena em "indexOfSelectedState"
    const indexOfSelectedState = event.target.selectedIndex

    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value= "${city.id}">${city.nome}</option>`
            }
            citySelect.disabled = false
        })
}
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)