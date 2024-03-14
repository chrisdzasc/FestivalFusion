// Espera a que el DOM esté completamente cargado para ejecutar la funcion iniciarApp()
document.addEventListener('DOMContentLoaded', function(){
    // Cuando el evento 'DOMContentLoaded' se dispara, se llama a la función iniciarApp, esto significa que el navegador ha terminado de
    // cargar la estructura del documento HTML y está listo para ser manipulado.
    iniciarApp();
});

// Declaración de la función iniciarApp()
function iniciarApp(){
    crearGaleria(); // Llama a la funcion crearGaleria()
}

// Definicion de la función crearGaleria()
function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes'); // Selecciona el contenedor con la clase galeria-imagenes.

    for(let i=1; i <= 12; i++){ // Bucle que se ejecuta 12 veces para crear las imágenes de la galeria
        
        const imagen = document.createElement('picture'); // Crea un elemento de imagen

        // Establece el HTML interno del elemento imagen con la ruta de la imagen y el tipo de imagen.
        imagen.innerHTML=`
            <source srcset="build/img/thumb/${i}.webp" type="image/webp" >
            <img loading="lazy" src="build/img/thumb/${i}.jpg" alt="Imagen galeria">
        `;

        // Asigna un evento de clic a la imagen para mostrar la imagen en tamaño grande
        imagen.onclick = function(){
            mostrarImagen(i); // Manda a llamar la funcion mostrarImagen() cuando le damos click y manda como argumente el indice correspondiente.
        }

        galeria.appendChild(imagen); // Agrega el elemento imagen al contenedor de la galeria.
    }
}

// Definicion de la funcion mostrarImagen() que recibe el ID de la imagen como parámetro
function mostrarImagen(id){

    const imagen = document.createElement('picture'); // Crea un nuevo elemento picture para la imagen grande

    // Define el contenido HTML del elemento imagen con la ruta de la imagen grande y el tipo de imagen
    imagen.innerHTML=`
        <source srcset="build/img/grande/${id}.webp" type="image/webp" >
        <img loading="lazy" src="build/img/grande/${id}.jpg" alt="Imagen galeria">
    `;

    const overlay = document.createElement('DIV'); // Crear el Overlay para mostrar la imagen grande

    overlay.appendChild(imagen); // Agrega la imagen al overlay

    overlay.classList.add('overlay'); // Agrega una clase CSS al overlay para darle estilo CSS

    // Agrega un evento de clic al overlay para cerrarlo
    overlay.onclick = function(){
        const body = document.querySelector('body'); // Selecciona el elemento de body
        body.classList.remove('fijar-body'); // Elimina la clase de fijar-body del elemento body
        overlay.remove(); // Elimnia el overlay del DOM
    }

    //Boton para cerrar la ventana modal
    const cerrarModal = document.createElement('P'); // Crea un botón para cerrar la ventana modal
    cerrarModal.textContent = 'X'; // Define el texto del boton como "X"
    cerrarModal.classList.add('btn-cerrar'); // Agrega una clase CSS al botón para darle estilo

    // Agrega un evento de clic en el boton
    cerrarModal.onclick = function(){
        const body = document.querySelector('body'); // Selecciona el elemento de body
        body.classList.remove('fijar-body'); // Elimina la clase de fijar-body del elemento body
        overlay.remove(); // Elimina el overlay del DOM
    }

    overlay.appendChild(cerrarModal); // Agrega el botón de cerrar el overlay


    // Añade el overlay al cuerpo del HTML
    const body = document.querySelector('body'); // Selecciona el elemento de body
    body.appendChild(overlay); // Agrega el cuerpo del overlay al body
    body.classList.add('fijar-body'); // Añade la clase de fijar-body al body del HTML para darle estilo CSS
}