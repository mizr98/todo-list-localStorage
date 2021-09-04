// Variables
const formulario = document.querySelector('#formulario');
const todoList = document.querySelector('#todo-list');
let todo = [];

// Event Listeners
eventListeners();
function eventListeners() {
    // Cuando ingresas una nueva idea
    formulario.addEventListener('submit', agregarTodo);

    document.addEventListener('DOMContentLoaded', () => {
        todo = JSON.parse(localStorage.getItem('ideas')) || [];

        crearHTML();
    });

}

// Funciones

function agregarTodo(e) {
    e.preventDefault();

    // TextArea
    const idea = document.querySelector('#idea').value;

    //validacion
    if (idea === '') {
        mostrarError('Un mensaje no puede ir vacio')
        return; // Evita ejecutar mas lineas de codigo
    }

    const ideaObj = {
        id: Date.now(),
        idea
    }

    //Añadir al arreglo de todo
    todo = [...todo, ideaObj];

    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
}

// Mostrar mensaje de Error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;

    mensajeError.classList.add('error');

    // Insertar en el contenido
    const contenido = document.querySelector('#contenido');

    contenido.appendChild(mensajeError);

    //Eliminar mensaje de error
    setTimeout(() => {
        mensajeError.remove();
    }, 5000);

}

// Muestra un listado de los tweets
function crearHTML() {

    limpiarHTML();

    if (todo.length > 0) {
        todo.forEach(todo => {
            //Agregar boton de eliminar 
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarIdea(todo.id);
            }

            const li = document.createElement('li');

            // añadir el texto
            li.innerText = todo.idea;

            // Asignar el boton
            li.appendChild(btnEliminar);

            // insertarlo en el html
            todoList.appendChild(li);
        });
    }

    sincronizarStorage();
}

// Agrega ideas al local Storage
function sincronizarStorage() {
    localStorage.setItem('ideas', JSON.stringify(todo));
}

// Eliminar Idea
function borrarIdea(id) {
    todo = todo.filter(idea => idea.id !== id);

    crearHTML();
}

// Limpiar HTML
function limpiarHTML() {
    while (todoList.firstChild) {
        todoList.removeChild(todoList.firstChild);
    }
}