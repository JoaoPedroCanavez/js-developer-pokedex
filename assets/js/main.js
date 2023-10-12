const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
  const cardHtml = `
    <li class="pokemon ${pokemon.type}" id="${pokemon.name}">  
      <span class="number">#${pokemon.number}</span>
      <span class="name">${pokemon.name}</span>

      <div class="detail">
        <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>

        <img src="${pokemon.photo}"
              alt="${pokemon.name}">
      </div>
    </li>

    <div class= "bg-modal" id="modal-${pokemon.name}">
      <div class="modal ${pokemon.type}">
        <button class="back"> &lt; Voltar </button>
        <h3 class="name">${pokemon.number}.${pokemon.name}</h3>
        <img class="img-pokemon"src="${pokemon.photo}"
                alt="${pokemon.name}">

        <ol class="types">
          ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        <ol class="stats">
            <li class="stat">
              <h5>HP</h5>
              <p>${pokemon.stats.hp}</p>

              <div class="bar">
                <div class="bar-hp"></div>
              </div> 
            </li>

            <li class="stat">
              <p>Attack</p>
              <p>${pokemon.stats.attack}</p>
              
              <div class="bar">
                <div class="bar-attack"></div>
              </div> 
            </li>

            <li class="stat">
              <p>Defense</p>
              <p>${pokemon.stats.defense}</p>
              
              <div class="bar">
                <div class="bar-defense"></div>
              </div> 
            </li>

            <li class="stat">
              <p>Sp. Atk</p>
              <p>${pokemon.stats['special-attack']}</p>
              
              <div class="bar">
                <div class="bar-special-attack"></div>
              </div>          
            </li>

            <li class="stat">
              <p>Sp. Def</p>
              <p>${pokemon.stats['special-defense']}</p>
              
              <div class="bar">
                <div class="bar-special-defense"></div>
              </div> 
            </li>

            <li class="stat">
              <p>Speed</p>
              <p>${pokemon.stats.speed}</p>
              
              <div class="bar">
                <div class="bar-speed"></div>
              </div> 
            </li>
        </ol>         
      </div>
    </div>
  `

  pokemonList.innerHTML += cardHtml

  const modalPokemon = document.getElementById(`modal-${pokemon.name}`);
  
  /* Mudando dinâmicamente a barra de estastísticas dos pokemons */
  const hpBar = modalPokemon.querySelector('.bar-hp');
  const attackBar = modalPokemon.querySelector('.bar-attack');
  const defenseBar = modalPokemon.querySelector('.bar-defense');
  const specialAttackBar = modalPokemon.querySelector('.bar-special-attack');
  const specialDefenseBar = modalPokemon.querySelector('.bar-special-defense');
  const speedBar = modalPokemon.querySelector('.bar-speed');

  if (hpBar) hpBar.style.setProperty('--hp', `${pokemon.stats.hp}%`);
  if (attackBar) attackBar.style.setProperty('--attack', `${pokemon.stats.attack}%`);
  if (defenseBar) defenseBar.style.setProperty('--defense', `${pokemon.stats.defense}%`);
  if (specialAttackBar) specialAttackBar.style.setProperty('--special-attack', `${pokemon.stats['special-attack']}%`);
  if (specialDefenseBar) specialDefenseBar.style.setProperty('--special-defense', `${pokemon.stats['special-defense']}%`);
  if (speedBar) speedBar.style.setProperty('--speed',  `${pokemon.stats.speed}%`);


  // Abrir modal 
  const openButtons = document.querySelectorAll('.pokemon');
  openButtons.forEach((pokemonCard) => {
    pokemonCard.addEventListener('click', () => {
      const modalId = `modal-${pokemonCard.id}`;
      const modal = document.getElementById(modalId);
      modal.style.display = 'flex';
    });
  });
  
  // Fechar modal
  function closeModal(modal) {
    modal.style.display = 'none';
  }

  // Botão "Voltar" do modal
  const backButtons = document.querySelectorAll('.back');
  backButtons.forEach((backButton) => {
    backButton.addEventListener('click', () => {
      const modal = backButton.closest('.bg-modal');
      closeModal(modal);
    });
  });

  // Fora do modal
  const modals = document.querySelectorAll('.bg-modal');
  modals.forEach((modal) => {
    modal.addEventListener('click', (event) => {
      if (event.target === modal) closeModal(modal);
    });
  });
  
  return cardHtml;
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      pokemons.map(convertPokemonToLi).join('')
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})