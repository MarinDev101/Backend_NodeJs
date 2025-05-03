// Variables globales
const API_URL = 'httpp://localhost:3000/api'; // Constante que almacena la URL que se conecta al servidor
let personas = []; // variable que almacenara el listado de personas obtenidas del backend

// Elementos del DOM
const personasForm = document.getElementById('personaForm'); // Formulario principal
const tablaPersonasBody = document.getElementById('tablaPersonasBody'); // Cuerpo de la tabla donde se insertan las filas
const btnCancelar = document.getElementById('btnCancelar'); // Este boton de cancelar limia el formulario
const imagenInput = document.getElementById('imagen'); // Input de tipo archivo para subir o cargar la imagen
const previewImagen = document.getElementById('previewImagen'); // Elemento imagen de previsualizacion

// Event listeners

document.addEventListener('DOMContentLoaded', cargarPersonas); // Cuando el DOM este listo, se cargan las personas
personasForm.addEventListener('submit', manejarSubmit); // Al enviar el formulario, se ejecuta la funcion manejarSubmit que escucha el click
btnCancelar.addEventListener('click', lipiarFormulario) // Al hacer click en cancelar se limpia el formulario
imagenInput.addEventListener('change', manejarImagen); // Al cambiar la imagen, se llama manejarImagen para previsualizar

// Funciones para el manejo de personas

async function cargarPersonas() {
  try {
    const response = await fetch(`${API_URL}/personas`); // Se hace peticion GET al endpoint personas
    personas = await response.json(); // Se almacena la respuesta como lista de personas
    await mostrarPersonas(); // Se llama a la funcion para mostrarlas en la tabla
  } catch (error) {
    console.error('Error al cargar personas', error);
  }
}

// Iterar sobre cada persona y crear una fila en la tabla
async function mostrarPersonas() {
  tablaPersonasBody.innerHTML = ''; // Limpiar el contenido actual

  for (const persona of personas) {
    const tr = document.createElement('tr'); // Crear una fila html

    // Cargar la imagen si existe
    let imagenHTML = 'Sin Imagen';
    try {
      const response = await fetch(`${API_URL}/imagenes/obtener/personas/id_persona/${persona.id_persona}`);
      const data = await response.json();
      if (data.imagen) {
        imagenHTML = `<img src="data:image/jpeg;base64,${data.imagen}"
          style="max-width: 100px; max-height: 100px;">`;
      }
    } catch (error) {
      console.error('Error al cargar imagen:', error);
    }
    // Se construye la fila HTML con los datos de la persona y los botones de accion
    // Se utiliza templat literals para facilitar la insercion de variables en el html
    tr.innerHTML = `
      <td style="border: 1px solid #ddd; text-align: center; padding: 8px;">${persona.id_persona}</td>
      <td style="border: 1px solid #ddd; text-align: center; padding: 8px;">${persona.nombre}</td>
      <td style="border: 1px solid #ddd; text-align: center; padding: 8px;">${persona.apellido}</td>
      <td style="border: 1px solid #ddd; text-align: center; padding: 8px;">${persona.email}</td>
      <td style="border: 1px solid #ddd; text-align: center; padding: 8px;">${imagenHTML}</td>
      <td style="border: 1px solid #ddd; text-align: center; padding: 8px;">
        <button onclick="editarPersona(${persona.id_persona})">Editar</button>
        <button onclick="eliminarPersona(${persona.id_persona})">Eliminar</button>
      </td>
    `
  }
}