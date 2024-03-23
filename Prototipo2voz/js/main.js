var artyom = new Artyom();

document.querySelector("#activar").addEventListener('click', function(){
    artyom.say("¡Reconocimiento de voz activado! Di el nombre del Pokémon que quieres buscar.");
});

artyom.addCommands({
    smart:true,
    indexes: ["* pokemon *", "buscar *"],
    action: function(i, wildcard){
        if(i == 0){
            var nombrePokemon = wildcard.trim().toLowerCase();
            document.getElementById("txt-buscar").value = nombrePokemon;
            buscarPokemon(nombrePokemon);
        } else if (i == 1) {
            var nombrePokemon = wildcard.trim().toLowerCase();
            document.getElementById("txt-buscar").value = nombrePokemon;
            buscarPokemon(nombrePokemon);
        }
    }
});

artyom.initialize({
    lang:"es-ES",
    debug:true,
    continuous: true,
    speed:1,
    soundex: true
});

function buscarPokemon(nombre) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`)
        .then(response => response.json())
        .then(data => {
            if(data.sprites && data.sprites.front_default) {
                document.getElementById("imagen_pokemon").innerHTML = `<img src="${data.sprites.front_default}" alt="${nombre}">`;
            } else {
                document.getElementById("imagen_pokemon").innerHTML = "<p>Pokemon no encontrado</p>";
            }
        })
        .catch(error => {
            console.log("Error:", error);
            document.getElementById("imagen_pokemon").innerHTML = "<p>Error al buscar el Pokémon</p>";
        });
}
