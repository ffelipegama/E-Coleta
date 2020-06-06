function populateUfs(){
    const ufSelect = document.querySelector("select[name=uf]");
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json())
    .then( states => {
        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
        }
    });
}
populateUfs();
function getCities(event){
    const citySelect = document.querySelector("select[name=city]");
    const stateInput = document.querySelector("input[name=state]");

    const indexOfSelectedState = event.target.selectedIndex;
    stateInput.value = event.target.options[indexOfSelectedState].text;

    const ufValue = event.target.value;
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    citySelect.innerHTML = '<option value="">Selecione a Cidade</option>';
    citySelect.disabled = true;

    fetch(url)
    .then( res => res.json())
    .then( cities => {
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
        }
        citySelect.disabled = false;
    });
}
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities);

// Ítens de coleta
const itemsToCollet = document.querySelectorAll('.items-grid li');
for(const item of itemsToCollet){
    item.addEventListener('click', handleSelectedItem);
}

const collectedItems = document.querySelector('input[name = items]');
let selectedItems = [];

function handleSelectedItem(event){
    const itemLi = event.target;

    // Adicionar ou remover uma class com js
    itemLi.classList.toggle('selected');

    const itemId = itemLi.dataset.id;

    const alreadySelecetd = selectedItems.findIndex( item => {
        const itemFound = item == itemId;
        return itemFound;
    });
    if( alreadySelecetd >= 0){
        // const filtredItems = selectedItems.filter(item => {
        //     const itemsIsDifferent = item != itemId;
        //     return itemsIsDifferent;
        // });
        // selectedItems = filtredItems;
        selectedItems.splice(alreadySelecetd, 1);
    } else{
        selectedItems.push(itemId);
    }
    collectedItems.value = selectedItems;
}