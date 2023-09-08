let container = document.getElementById("container");

async function getAllPokemon() {
  let response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  if (response.ok) {
    let data = await response.json();
    //console.log(data.results)
    return data.results;
  }
}

async function getPokemonData(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data;
}

async function getPokemonSprites(url) {
  let response = await fetch(url);
  let data = await response.json();
  return data.sprites;
}

async function displayPokemon() {
  let allPokemon = await getAllPokemon();
  for (let pokemon of allPokemon) {
    let sprites = await getPokemonSprites(pokemon.url);
    //let data = await getPokemonData(pokemon.url);

    console.log("front_default", sprites.front_default);
    console.log("back_default", sprites.back_default);
    console.log("front_shiny", sprites.front_shiny);
    console.log("back_shiny", sprites.back_shiny);
    let card = document.createElement("div");
    card.classList.add("pokemon");

    let name = document.createElement("span");
    name.innerText = pokemon.name;

    let image = document.createElement("img");
    image.src = sprites.front_default;
    let imageContainer = document.createElement("div");
    imageContainer.classList.add("img-container");

    let flipButton = document.createElement("button");
    flipButton.innerText = "flip";
    flipButton.addEventListener("click", () => {
      if (image.src === sprites.back_shiny) {
        image.src = sprites.front_shiny;
      } else if (image.src === sprites.back_default) {
        image.src = sprites.front_default;
      } else if (image.src === sprites.front_shiny) {
        image.src = sprites.back_shiny;
      } else {
        image.src = sprites.back_default;
      }
    });

    let shinyButton = document.createElement("button");
    shinyButton.innerText = "show/hide shiny";

    shinyButton.addEventListener("click", () => {
      if (image.src === sprites.back_shiny) {
        image.src = sprites.back_default;
      } else if (image.src === sprites.back_default) {
        image.src = sprites.back_shiny;
      } else if (image.src === sprites.front_shiny) {
        image.src = sprites.front_default;
      } else {
        image.src = sprites.front_shiny;
      }
    });

    card.appendChild(name);
    imageContainer.appendChild(image);
    card.appendChild(imageContainer);
    let buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    buttonContainer.appendChild(flipButton);
    buttonContainer.appendChild(shinyButton);
    card.appendChild(buttonContainer);
    container.appendChild(card);
  }
}


displayPokemon();