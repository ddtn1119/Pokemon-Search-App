// function to format Pokemon names
function formatName(input) {
  // remove all special characters
  let formatInput = input.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
  return formatInput;
}

// get data from array
function getStatData(stats, name) {
  return stats.find((s) => s.stat.name === name)?.base_stat || "";
}

// handle Pokemon search button click
const searchBtn = document.getElementById("search-button");

searchBtn.addEventListener("click", async() => {
  const input = document.getElementById("search-input").value.trim();
  // return nothing if input is empty or not found
  if(!input) return;

  // input can be by Pokemon name or ID
  const formattedInput = formatName(input);
  const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${formattedInput}`;

  try {
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error();
    }
    const data = await response.json();

    // get all info
    document.getElementById("pokemon-name").textContent = data.name.toUpperCase();
    document.getElementById("pokemon-id").textContent = `#${data.id}`;
    document.getElementById("weight").textContent = `Weight: ${data.weight}`;
    document.getElementById("height").textContent = `Height: ${data.height}`;
    document.getElementById("hp").textContent = getStatData(data.stats, "hp");
    document.getElementById("attack").textContent = getStatData(data.stats, "attack");
    document.getElementById("defense").textContent = getStatData(data.stats, "defense");
    document.getElementById("special-attack").textContent = getStatData(data.stats, "special-attack");
    document.getElementById("special-defense").textContent = getStatData(data.stats, "special-defense");
    document.getElementById("speed").textContent = getStatData(data.stats, "speed");

    // handle pokemon image
    const pokemon_sprite = document.getElementById("sprite");
    pokemon_sprite.src = data.sprites.front_default;
    pokemon_sprite.alt = `${data.name} sprite`;

    // handle pokemon types
    const pokemon_types = document.getElementById("types");
    pokemon_types.innerHTML = "";
    data.types.forEach((t) => {
      const typeSpan = document.createElement("span");
      typeSpan.textContent = t.type.name.toUpperCase();
      pokemon_types.appendChild(typeSpan);
    })
  }
  catch (error) {
    alert("Pokémon not found");
  }
});
