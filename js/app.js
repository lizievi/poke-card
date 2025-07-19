document.addEventListener("DOMContentLoaded", () => {
  const numRandom = getRandomInt(1, 151);
  getPokeApi(numRandom);
});

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getPokeApi = async (id) => {
  try {
    let pokeUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;

    const reference = await fetch(pokeUrl);
    const pokeDatos = await reference.json();

    const pokemon = {
      img: pokeDatos.sprites.other.dream_world.front_default,
      name: pokeDatos.name,
      hp: pokeDatos.stats[0].base_stat,
      experience: pokeDatos.base_experience,
      atack: pokeDatos.stats[1].base_stat,
      especial: pokeDatos.stats[3].base_stat,
      defense: pokeDatos.stats[2].base_stat,
    }

    paintCard(pokemon);
  } catch (error) {
    console.log(error);
  }
};

const paintCard = (pokemon) => {
    console.log(pokemon);
    const flex = document.querySelector('.flex')
    const template = document.querySelector('#template-card').content
    const clone = template.cloneNode(true)
    const fragment = document.createDocumentFragment()

    clone.querySelector('.card-body-img').setAttribute('src',pokemon.img)
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.name} <span>${pokemon.hp}hp</span>`
    clone.querySelector('.card-body-text').textContent = `${pokemon.experience} Exp`
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = `${pokemon.atack} K`
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = `${pokemon.especial} K`
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = `${pokemon.defense} K`

    
    fragment.appendChild(clone)
    flex.appendChild(fragment)
};
