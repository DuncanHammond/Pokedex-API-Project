
const baseURL = 'https://pokeapi.co/api/v2/pokemon';

let url;

const searchTerm = document.querySelector('.search');
const submitBtm = document.querySelector('.submit');
const searchForm = document.querySelector('form');
const pokemonName = document.querySelector('.pokemonName');
const pokemonSprite = document.querySelector('.pokemonSprite');
const pokedexNumber = document.querySelector('.pokedexNumber');
const randomPokemonGeneratorButton = document.querySelector('.random');
let type1Color = '#1F4E79';
let type2Color = '#dddddd';

const typeColors = []
typeColors['normal'] = '#aaaa99';
typeColors['grass'] = '#77cc55';
typeColors['poison'] = '#aa5599';
typeColors['flying'] = '#8899ff';
typeColors['water'] = '#3399ff';
typeColors['fairy'] = '#ee99ee';
typeColors['bug'] = '#aabb22';
typeColors['rock'] = '#bbaa66';
typeColors['electric'] = '#ffcc33';
typeColors['fighting'] = '#bb5544';
typeColors['dragon'] = '#7766ee';
typeColors['psychic'] = '#ff5599';
typeColors['ground'] = '#ddbb55';
typeColors['dark'] = '#775544';
typeColors['steel'] = '#aaaabb';
typeColors['ice'] = '#66ccff';
typeColors['ghost'] = '#6666bb';
typeColors['fire'] = '#ff4422';

searchForm.addEventListener('submit', function (event) {
  fetchResults(event, searchTerm.value)
});
randomPokemonGeneratorButton.addEventListener('click', function (event) {
  fetchResults(event, Math.floor(Math.random() * 898) + 1 )
});

const section = document.querySelector('section');

function fetchResults(e,value) {
  submitBtm.disabled = true;
  randomPokemonGeneratorButton.disabled = true;
    e.preventDefault();
    url = `${baseURL}/${value}`;
  
    fetch(url)
        .then(function (result) {
            return result.json();
        })
        .then(function (json) {
            displayResults(json);
          type1Color = typeColors[json.types[0].type.name];
          type2Color = typeColors[json.types[json.types.length - 1].type.name];
        })
        .catch(function(err){
            pokemonName.innerText = `${searchTerm.value} is not a valid pokemon.`;
            pokemonSprite.src = 'http://images.wikia.com/pokemon/images/d/dc/Missingno_Sprite.png';
            pokedexNumber.innerText = `null`;
            type1Color = 'grey';
            type2Color = 'grey';
        }).finally(function() {
  submitBtm.disabled = false;
  randomPokemonGeneratorButton.disabled = false;
          document.body.style.backgroundImage = `linear-gradient(to right, ${type1Color} 50%, ${type2Color} 50%)`;
        });
}

function displayResults(json) {
    displayPokemonName(json)
    while (section.firstChild) {
        section.removeChild(section.firstChild);

    }
}

function displayPokemonName(json) {
    pokemonName.innerText = json.name;
    pokemonSprite.src = json.sprites.front_default;
    pokedexNumber.innerText = json.id;
}

