const searchBar = document.querySelector("#searchBar");

const getPokemon = async (num) => {
  const data = await fetch("https://pokeapi.co/api/v2/pokemon/" + num);
  const pokemonKanto = await data.json();
  return pokemonKanto;
};

const getAllPokemon = async () => {
  let allPokemon = [];
  for (let i = 1; i <= 151; i++) {
    allPokemon.push(await getPokemon(i));
  }
  return allPokemon;
};

const findPokemon = async () => {
  let inputToSearch = searchBar.value;
  let pokeFilter = await getAllPokemon();
  pokeFilter = pokeFilter.filter((poke) =>
    poke.name.includes(inputToSearch.trim())
  );
  printPokemon(pokeFilter);
  return pokeFilter;
};

const printPokemon = async (pokemon) => {
  const pokeContainer = document.querySelector("#pokeInfo");
  let pokeElement = "";
  for (let i = 0; i < pokemon.length; i++) {
    pokeElement += `<a onClick='openModal(${pokemon[i].id})' id="${pokemon[i].id}" class="panel-block">
    <img class="pokeball" src="./assets/img/pokeball.png" alt="">
      <div class="single-pokemon   ">
        <p class=" ">${pokemon[i].id} - ${pokemon[i].name}</p>
        <img class="poke-img" src="${pokemon[i].sprites.front_default}" alt="">
      </div>
    </a>`;
  }
  pokeContainer.innerHTML = pokeElement;
};
const openModal = async (id) => {
  const pokeDetails = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
  details = await pokeDetails.json();
  document.getElementById("pokeModal").classList.add("is-active");
  document.getElementById("pokedexContainer").innerHTML = `

  <img class="pokedex-img" src="./assets/img/pokedex-transparent.png" alt="">
  <div class="pokemon-details">
  <p><b>Name: <span>${details.name}</span></b></p>
  <p><b>Number: <span>${details.id}</span></b></p>
  <p><b>Height: <span>${details.height / 10} m</span></b></p>
  <p><b>Weight: <span>${details.weight / 10} kg</span></b></p>
  <ul id='pokemonTypes'>
  </ul>
  </div>
  </div>
  <img class="image poke-img-modal"  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="">
  `;
  let pokeTypes = "";
  for (let i = 0; i < details.types.length; i++) {
    pokeTypes += `<li class='types ${details.types[i].type.name}'>${details.types[i].type.name}</li>`;
  }

  document.getElementById("pokemonTypes").innerHTML = pokeTypes;
  console.log(id);
};

const displayPokemon = async () => {
  const pokeDisplay = await getAllPokemon();
  printPokemon(pokeDisplay);
};

displayPokemon();

searchBar.addEventListener("keyup", findPokemon);
document.querySelector(".modal-background").addEventListener("click", () => {
  document.getElementById("pokeModal").classList.remove("is-active");
});
document.querySelector(".modal-close").addEventListener("click", () => {
  document.getElementById("pokeModal").classList.remove("is-active");
});
