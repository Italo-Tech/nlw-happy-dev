
// Colocando API buscando cidades a partir dos estados
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

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>" // Limpa conteúdo!
    citySelect.disabled = true // Desbloquea após selecionar o estado

    fetch(url)
        .then(res => res.json())
        .then(cities => {

            for (const city of cities) {
                citySelect.innerHTML += `<option value= "${city.nome}">${city.nome}</option>`
            }
            citySelect.disabled = false
        })
}
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)




// Itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
    const itemLi = event.target

    //Adicionar ou remover uma classe com toggle
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id


    // Verificar se existem items selecionados, se sim
    // pegar os items selecionados
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId
        return itemFound
    })

    // Se ja estiver selecionado, tirar da seleção
    if (alreadySelected >= 0) {
        // Tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // Se não estiver selecionado 
        // adicionar à seleção
        selectedItems.push(itemId)
    }

    // Atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems

}