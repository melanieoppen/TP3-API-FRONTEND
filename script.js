fetch('https://hp-api.onrender.com/api/characters')
.then(r=>r.json())
.then(data => {
    console.log(data);
    personajes = data;
    mostrarPersonajes(personajes);
})
.catch(error => {
    console.log("Error al encontrar la API", error)
})

let personajes = []

const contenedorPersonajes = document.getElementById("contenedor")
const searchInput = document.getElementById("searchInput")

function mostrarPersonajes(listaPersonajes) {
    const maxPersonajes = 25
    contenedorPersonajes.innerHTML='';
    listaPersonajes.slice(0, maxPersonajes).forEach(personaje => {
        contenedorPersonajes.innerHTML+=
        `<article class="card" id="card">
            <h1 class="nombre">${personaje.name}</h1>
            <p class="nombresalternativos">${personaje.alternate_names}</p>
            <h2 class="casa">${personaje.house}</h2>
            <p class="fechanacimiento">Nació en: ${personaje.dateOfBirth}</p>
            <ul class="varita-lista">
                    <li>Madera: ${personaje.wand.wood}</li>
                    <li>Núcleo: ${personaje.wand.core}</li>
                    <li>Longitud: ${personaje.wand.length}</li>
            <img src="${personaje.image}" alt="${personaje.image}}" class="imagen">
        </article>`
    });
}