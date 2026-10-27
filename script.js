const limite = 50
fetch('https://hp-api.onrender.com/api/characters')
.then(r=>r.json())
.then(data => {
    console.log(data);
    personajes = data;
    mostrarPersonajes(personajes);
    actualizarFiltros();
})
.catch(error => {
    console.log("Error al encontrar la API", error)
})

let personajes = []

const contenedorPersonajes = document.getElementById("contenedor")
const filtroCasa = document.getElementById("filtroCasas")
const busqueda = document.getElementById("searchInput")

function mostrarPersonajes(listaPersonajes) {
    contenedorPersonajes.innerHTML='';
    listaPersonajes.forEach(personaje => {
        contenedorPersonajes.innerHTML+=
        `<article class="card" id="card">
            <h1 class="nombre">${personaje.name}</h1>
            <p class="nombresalternativos">${personaje.alternate_names}</p>
            <p class="especie">${personaje.species}</p>
            <h2 class="casa">${personaje.house}</h2>
            <p class="fechanacimiento">Nació en: ${personaje.dateOfBirth}</p>
            <ul class="varita-lista"> Varita:
                    <li>Madera: ${personaje.wand.wood}</li>
                    <li>Núcleo: ${personaje.wand.core}</li>
                    <li>Longitud: ${personaje.wand.length}</li>
            <img src="${personaje.image}" alt="${personaje.image}}" class="imagen">
        </article>`
    });
}


function filtrar(){
let personajesFiltrados = personajes.filter(personaje => {
  return personaje.house.includes(filtroCasa.value)
});

mostrarPersonajes(personajesFiltrados);
}

function buscar() {
let personajesFiltrados = personajes.filter( personaje=> {
  return personaje.name.toLowerCase().includes(busqueda.value.toLowerCase())
      || personaje.alternate_names.toLowerCase().includes(busqueda.value.toLowerCase())
      || personaje.species.toLowerCase().includes(busqueda.value.toLowerCase())
})

mostrarPersonajes(personajesFiltrados)
}

function actualizarFiltros() {
    let casas = [];
    personajes.forEach(personaje => {
      if (!casas.includes(personaje.house)) {
        casas.push(personaje.house);
      }
    });
  
    filtroCasa.innerHTML = '<option value="">Todas las casas</option>'; // Default option
    casas.forEach(casa => {
      filtroCasa.innerHTML += `<option value="${casa}">${casa}</option>`;
    });
  }
  
  filtroCasa.addEventListener("change", filtrar);
  searchInput.addEventListener("input", buscar);
/*
filtrocasa.addEventListener("change" , filtrar) 
filtroProvincia.addEventListener("change" , filtrar)
busqueda.addEventListener("input", buscar)

const agregarIngredientebtn = document.getElementById("agregarIngrediente")
const ingredientesContainer = document.querySelector(".contenedor-ingredientes")

agregarIngredientebtn.addEventListener("click", () => {
  ingredientesContainer.innerHTML +=
    '<input type="text" class="ingrediente" placeholder="Ingredientes" required>';
});

function actualizarFiltros() {
  let categorias = []
  personajes.forEach(comida => {
    if( !categorias.includes(comida.categoria)) {
    categorias.push(comida.categoria)
    }
  });
  let provincias = []
  personajes.forEach(comida => {
    if( !provincias.includes(comida.provincia)) {
    provincias.push(comida.provincia)
    }
  });
  categorias.forEach(categoria => {
  filtroCategoria.innerHTML += `<option value="${categoria}">${categoria}</option>`
  })
  provincias.forEach(provincia => {
    filtroProvincia.innerHTML += `<option value="${provincia}">${provincia}</option>`
    })
}*/