// Variables
const carrito        = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaProductos = document.querySelector('#lista-productos');
let articulosCarrito = [];

cargarEventListeners()
function cargarEventListeners() {
    //Cuando agregar un producto presionando "Agregar al carrito"
    listaProductos.addEventListener('click', agregarProducto);

    carrito.addEventListener('click', eliminarProducto);

    // Muestra los cursos del locastorage
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || []; 
        mostrarCarritoHTML(); 
    })

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito= [];
        limpiarHTML();
    } )
}


// Elimina un producto del carrtio 
function eliminarProducto(e) {
    const productoId = e.target.getAttribute('data-id');
    //Elimina del arreglo de arcculos carrito por el data-id
    articulosCarrito = articulosCarrito.filter(producto => producto.id !==productoId);
    mostrarCarritoHTML();
}

//Funciones
function agregarProducto(e) {
    e.preventDefault();
    if(e.target.classList.contains('producto__agregar-carrito')){
        productoSeleccionado = e.target.parentElement.parentElement;        
        leerDatosProducto(productoSeleccionado);
    }

}

// lee el contenido del HTML al que le dimos clic y extrae la información del curso
function leerDatosProducto(productoSeleccionado){
    //crear un objeto con el contenido actula
    const informacionProducto = {
        image:  productoSeleccionado.querySelector('img').src,
        titulo: productoSeleccionado.querySelector('h3').textContent,
        precio: productoSeleccionado.querySelector('.producto__precio').textContent,
        id:    productoSeleccionado.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    // console.log(informacionProducto); 

    //validar si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(producto => producto.id === informacionProducto.id);
    if(existe) {
        //actualizar cantidad
        const productos = articulosCarrito.map( producto => {
            if( producto.id === informacionProducto.id ) {
                producto.cantidad++
                return producto; // retorna el objeto actualizado
            }else {
                return producto;  // retoran lo sobjetos que no son duplicados
            }
            articulosCarrito = [...productos]; 

        })
    }else {
        //agregamos al carrito
        articulosCarrito = [...articulosCarrito, informacionProducto];
    }
    mostrarCarritoHTML()
    

}

// Muestra el carrito de compras
function mostrarCarritoHTML() {
    // limpiar el HTML
    limpiarHTML();

    articulosCarrito.forEach(producto => {
        const { image, titulo, precio, cantidad, id}  = producto;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${image}" alt="${titulo}" width="100"></td>            
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-producto">
                    <img src="img/trash.jpg" class="borrar-producto" data-id="${id}">
                </a>
            </td>
        `
        contenedorCarrito.appendChild(row);
    });
    // Agrega el html del carrito en el tbody

    //agregar el carrito de compras al local storage
    sincronizarStorage();
}

    

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito)); 
}

// Eliminar los cursos del tbody
function limpiarHTML() {
    //forma lenta     contenedorCarrito.innerHTML= '';
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild); 
    }

}