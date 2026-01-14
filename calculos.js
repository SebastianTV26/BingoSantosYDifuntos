// Conexión con Supabase
// const SUPABASE_URL = "https://uuhjlglcqovzcqmzpcnj.supabase.co"; 
// const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1aGpsZ2xjcW92emNxbXpwY25qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NDgzMzksImV4cCI6MjA3NjAyNDMzOX0.JzvuNuYjRCLOa_Fmaw2XlX8pnwTjaBMUtlk8JQn6E2s"; 
// const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let santosSorteados = [];
let santos = [];

// Cargar santos desde data.json
async function cargarSantos() {
  try {
    const response = await fetch("data.json");
    if (!response.ok) {
      throw new Error("No se pudo cargar data.json");
    }
    santos = await response.json();
  } catch (error) {
    console.error("Error al cargar los santos:", error);
  }
}

async function sortearSantos() {
  // Asegurar que los datos estén cargados
  if (santos.length === 0) {
    await cargarSantos();
  }

  // Filtrar santos no sorteados
  const disponibles = santos.filter(
    santo => !santosSorteados.includes(santo.id)
  );

  if (disponibles.length === 0) {
    alert("Ya se sortearon todos los santos");
    return;
  }

  // Seleccionar uno al azar
  const indiceAleatorio = Math.floor(Math.random() * disponibles.length);
  const santo = disponibles[indiceAleatorio];

  // Guardar ID sorteado
  santosSorteados.push(santo.id);

  console.log("Santo sorteado:", santo.Nombre);

  // Mostrar en pantalla
  document.getElementById("letra").innerText = santo.Letra;
  document.getElementById("nombre").innerText = santo.Nombre;
  document.getElementById("imagen").innerHTML =
    `<img src="${santo.Imagen}" class="imagen" alt="${santo.Nombre}">`;
}

function reiniciar() {
  document.getElementById("letra").innerText = "";
  document.getElementById("nombre").innerText = "";
  document.getElementById("imagen").innerHTML = "";
  santosSorteados = [];
}
