// Conexión con Supabase
const SUPABASE_URL = "https://uuhjlglcqovzcqmzpcnj.supabase.co"; 
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1aGpsZ2xjcW92emNxbXpwY25qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NDgzMzksImV4cCI6MjA3NjAyNDMzOX0.JzvuNuYjRCLOa_Fmaw2XlX8pnwTjaBMUtlk8JQn6E2s"; 
const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let santosSorteados = [];

async function sortearSantos() {
  const { data, error } = await client.from("santo").select("*");

  if (error) {
    console.error("Error al cargar los santos:", error);
    return;
  }
  
  // Filtramos los que aún no se han sorteado
  const disponibles = data.filter(s => !santosSorteados.includes(s.id));

   if (disponibles.length === 0) {
    alert("Ya se sortearon todos los santos");
    return;
  }

  // Escoger un santo al azar de los disponibles
  const indiceAleatorio = Math.floor(Math.random() * disponibles.length);
  const santo = disponibles[indiceAleatorio];

  // Registrar que ya fue sorteado
  santosSorteados.push(santo.id);

  console.log("Santo sorteado:", santo.nombre);

  document.getElementById("santo").innerHTML = `
    <h2>${santo.letra}</h2>
    <h3>${santo.nombre}</h3>
    <img src="${santo.imagen}" width="300" height="300">
  `;
}

async function reiniciar() {
  const contenedor = document.getElementById("santo");
  contenedor.innerHTML = "";
  santosSorteados = [];
}