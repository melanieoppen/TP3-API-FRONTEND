
fetch('https://api.disneyapi.dev/character')
.then(r=>r.json())
.then(data => {
    console.log(data);
    personajes = data.data;
    mostrarPersonajes(personajes);
    actualizarFiltros();
})
.catch(error => {
    console.log("Error al encontrar la API", error)
})

let personajes = []

const contenedorPersonajes = document.getElementById("personajes-container")
const filtroPeliculas = document.getElementById("filtroPelicula")
const busqueda = document.getElementById("searchInput")

function mostrarPersonajes(personajes) {
  contenedorPersonajes.innerHTML = '';

  personajes.forEach(personaje => {
      contenedorPersonajes.innerHTML +=
      `<article class="card">
          <h1 class="nombre">${personaje.name}</h1>
          <p class="peliculas" id="peliculas">Películas: ${personaje.films.join(", ")}</p>
          <p class="series" id="series">Series: ${personaje.tvShows.join(", ")}</p>
          <p class="videojuegos" id="videojuegos" >Videojuego: ${personaje.videoGames.join(", ")}</p>
          <img src="${personaje.imageUrl}" alt="${personaje.name}" class="imagen">
      </article>`;
      let tarjeta = contenedorPersonajes.lastElementChild
        let series = tarjeta.querySelector(".series");
        let peliculas = tarjeta.querySelector(".peliculas");
        let videojuegos = tarjeta.querySelector(".videojuegos");

        if (personaje.tvShows.length === 0) {
            series.remove();
        }

        if (personaje.films.length === 0) {
            peliculas.remove();
        }

        if (personaje.videoGames.length === 0) {
            videojuegos.remove();
        }
    });
}

function filtrar() {

  if (filtroPeliculas.value === "") {
      mostrarPersonajes(personajes);
  } else {
      let personajesFiltrados = personajes.filter(personaje => {
          return personaje.films.includes(filtroPeliculas.value);
      });

      mostrarPersonajes(personajesFiltrados);
  }
}

function buscar() {
  let personajesFiltrados = personajes.filter(personaje => {
      return personaje.name.toLowerCase().includes(busqueda.value.toLowerCase())
          || personaje.tvShows.join(" ").toLowerCase().includes(busqueda.value.toLowerCase())
          || personaje.films.join(" ").toLowerCase().includes(busqueda.value.toLowerCase())
  });

  mostrarPersonajes(personajesFiltrados);
}

function actualizarFiltros() {
  let peliculas = [];

  personajes.forEach(personaje => {
      personaje.films.forEach(pelicula => {
          if (!peliculas.includes(pelicula)) {
              peliculas.push(pelicula);
          }
      });
  });

  filtroPeliculas.innerHTML = '<option value="">Todas las películas</option>';

  peliculas.forEach(pelicula => {
      filtroPeliculas.innerHTML += `<option value="${pelicula}" class="option">${pelicula}</option>`;
  });
}
  
 filtroPeliculas.addEventListener("change", filtrar);
busqueda.addEventListener("input", buscar);
