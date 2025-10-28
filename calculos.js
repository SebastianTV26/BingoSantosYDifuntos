// Conexión con Supabase
    const SUPABASE_URL = "https://uuhjlglcqovzcqmzpcnj.supabase.co"; 
    const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1aGpsZ2xjcW92emNxbXpwY25qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NDgzMzksImV4cCI6MjA3NjAyNDMzOX0.JzvuNuYjRCLOa_Fmaw2XlX8pnwTjaBMUtlk8JQn6E2s"; 

    // Usamos window.supabase para no sobrescribir la variable
    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    async function cargarSantos() {
    const { data, error } = await client.from("santo").select("*");

    if (error) {
      console.error("Error al cargar los santos:", error);
      return;
    }

    console.log("Datos recibidos:", data);

    const container = document.getElementById("santos-container");
    container.innerHTML = "";

    data.forEach(santo => {
      console.log("Mostrando:", santo.nombre, santo.imagen);
      const div = document.createElement("div");
      div.innerHTML = `
        <h3>${santo.nombre}</h3>
        <img src="${santo.imagen}" alt="${santo.nombre}">
      `;
      container.appendChild(div);
    });
  }
  cargarSantos();