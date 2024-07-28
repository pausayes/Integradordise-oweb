const productos = [
    // TOPS
    {
       id: "remera01" ,
       titulo: "Remera01",
       imagen: "./img/Partes de arriba/remera.jpg",
       categoria: {
        nombre: "Partes de arriba",
        id:"Partes de arriba"
       },
       precio: 1000
    },
    {
        id: "remera02" ,
       titulo: "Remera02",
       imagen: "./img/Partes de arriba/remera2.jpg",
       categoria: {
        nombre: "Partes de arriba",
        id:"Partes de arriba"
       },
       precio: 1000
    },
    {
        id: "remera03" ,
       titulo: "Remera03",
       imagen: "./img/Partes de arriba/remera3.jpg",
       categoria: {
        nombre: "Partes de arriba",
        id:"Partes de arriba"
       },
       precio: 1000
    },
    {
        id: "remera04" ,
       titulo: "Remera04",
       imagen: "./img/Partes de arriba/remera4.jpg",
       categoria: {
        nombre: "Partes de arriba",
        id:"Partes de arriba"
       },
       precio: 1000
    },
    // BOTTOMS
    {
        id: "pollera01",
        titulo: "Pollera01",
        imagen: "img/Partes de abajo/pollera.jpg",
        categoria: {
            nombre: "Partes de abajo",
            id: "Partes de abajo"
        },
        precio: 1000
    },
    {
        id: "pollera02",
        titulo: "Pollera02",
        imagen: "img/Partes de abajo/pollera2.jpg",
        categoria: {
            nombre: "Partes de abajo",
            id: "Partes de abajo"
        },
        precio: 1000
    },
    {
        id: "pollera03",
        titulo: "Pollera03",
        imagen: "img/Partes de abajo/pollera3.jpg",
        categoria: {
            nombre: "Partes de abajo",
            id: "Partes de abajo"
        },
        precio: 1000
    },
    {
        id: "pollera04",
        titulo: "Pollera04",
        imagen: "img/Partes de abajo/pollera4.jpg",
        categoria: {
            nombre: "Partes de abajo",
            id: "Partes de abajo"
        },
        precio: 1000
    },
    // SHOES
    {
        id: "calzado01",
        titulo: "Calzado01",
        imagen: "img/Calzados/calzado.jpg",
        categoria: {
            nombre: "Calzados",
            id: "Calzados"
        },
        precio: 1000
    },
    {
        id: "calzado02",
        titulo: "Calzado02",
        imagen: "img/Calzados/calzado2.jpg",
        categoria: {
            nombre: "Calzados",
            id: "Calzados"
        },
        precio: 1000
    },
    {
        id: "calzado03",
        titulo: "Calzado03",
        imagen: "img/Calzados/calzado3.jpg",
        categoria: {
            nombre: "Calzados",
            id: "Calzados"
        },
        precio: 1000
    },
    {
        id: "calzado04",
        titulo: "Calzado04",
        imagen: "img/Calzados/calzado4.jpg",
        categoria: {
            nombre: "Calzados",
            id: "Calzados"
        },
        precio: 1000
    }
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
         

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
}

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

            botonesCategorias.forEach(boton => boton.classList.remove("active"));
            e.currentTarget.classList.add("active");
           

            if (e.currentTarget.id != "Todos los productos") {
                const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
                tituloPrincipal.innerText = productoCategoria.categoria.nombre;

                
                const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
                cargarProductos(productosBoton);
            } else {
                tituloPrincipal.innerText = "Todos los productos";
                cargarProductos(productos);
            }
            

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlcarrito);

    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");


if(productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];

}
    
function agregarAlcarrito(e) {

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));




}

function actualizarNumerito () {
    let nuevoNumerito = productosEnCarrito.reduce((acc,producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}


