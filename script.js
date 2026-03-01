/* =========================
   EFECTO SCROLL REVELADO (PRIMERO)
========================= */

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.2 });

function activarAnimacionScroll() {
  const productosScroll = document.querySelectorAll(".producto");
  productosScroll.forEach(producto => {
    observer.observe(producto);
  });
}

/* =========================
   PRODUCTOS
========================= */

const productos = [
{ nombre: "GRUPO6", precio: 10000, imagen: "https://jemarescolombia.com/cdn/shop/files/RelojRichardMille_Rojo.jpg?v=1765590287&width=600" },

{ nombre: "GRUPO1", precio: 10000, imagen: "https://jemarescolombia.com/cdn/shop/files/RelojRichardMille_Rojo.jpg?v=1765590287&width=600" },
{ nombre: "GRUPO2", precio: 10000, imagen: "https://jemarescolombia.com/cdn/shop/files/RelojRichardMille_Rojo.jpg?v=1765590287&width=600" },
  { nombre: "GRUPO3", precio: 10000, imagen: "https://api.hhunt.es/storage/products/1748846588.webp" },
 { nombre: "GRUPO4", precio: 10000, imagen: "https://api.hhunt.es/storage/products/1748846588.webp" },
 { nombre: "GRUPO5", precio: 10000, imagen: "https://api.hhunt.es/storage/products/1748846588.webp" },
 { nombre: "GRUPO6", precio: 10000, imagen: "https://api.hhunt.es/storage/products/1748846588.webp" },
 { nombre: "GRUPO7", precio: 10000, imagen: "https://api.hhunt.es/storage/products/1748846588.webp" },
 { nombre: "GRUPO8", precio: 10000, imagen: 
"https://jemarescolombia.com/cdn/shop/files/RelojRichardMille_Rojo.jpg?v=1765590287&width=600" },
 { nombre: "GRUPO9", precio: 10000, imagen: "https://jemarescolombia.com/cdn/shop/files/RelojRichardMille_Rojo.jpg?v=1765590287&width=600" },
 { nombre: "GRUPO10", precio: 10000, imagen: "https://m.media-amazon.com/images/I/61q-8624j6L._AC_UY1000_.jpg" },
 { nombre: "GRUPO11", precio: 10000, imagen: "https://i.pinimg.com/170x/cb/d4/13/cbd4136ba81708b3f480faa9e10b12f0.jpg" }
];

/* =========================
   MOSTRAR PRODUCTOS
========================= */

function mostrarProductos(lista = productos) {
  const contenedor = document.getElementById("contenedor-productos");
  contenedor.innerHTML = "";

  lista.forEach(producto => {
    const card = document.createElement("div");
    card.classList.add("producto");

    card.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
      <h3>${producto.nombre}</h3>
      <p class="precio">$ ${producto.precio.toLocaleString()}</p>
      <button class="btn-agregar">Agregar al carrito</button>
    `;

    card.querySelector(".imagen-producto").addEventListener("click", () => {
      abrirModal(producto);
    });

    card.querySelector(".btn-agregar").addEventListener("click", () => {
      agregarAlCarrito(producto.nombre, producto.precio);
    });

    contenedor.appendChild(card);
  });

  activarAnimacionScroll();
}

document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();
  actualizarCarrito();
});

/* =========================
   BUSCADOR
========================= */

const buscador = document.getElementById("buscador");

buscador.addEventListener("input", function () {
  const texto = this.value.toLowerCase();

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(texto)
  );

  mostrarProductos(productosFiltrados);
});

/* =========================
   CARRITO
========================= */

let carrito = JSON.parse(localStorage.getItem("carrito")) || {};

function agregarAlCarrito(nombre, precio) {
  if (!carrito[nombre]) {
    carrito[nombre] = { cantidad: 1, precio: precio };
  } else {
    carrito[nombre].cantidad++;
  }

  guardarCarrito();
  actualizarCarrito();
  animarContador();
}

function cambiarCantidad(nombre, cambio) {
  carrito[nombre].cantidad += cambio;

  if (carrito[nombre].cantidad <= 0) {
    delete carrito[nombre];
  }

  guardarCarrito();
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const contador = document.getElementById("contador");

  if (!lista || !contador) return;

  lista.innerHTML = "";
  let totalProductos = 0;
  let totalDinero = 0;

  for (let producto in carrito) {
    const item = carrito[producto];

    totalProductos += item.cantidad;
    totalDinero += item.cantidad * item.precio;

    const div = document.createElement("div");
    div.classList.add("item-carrito");

    div.innerHTML = `
      <p><strong>${producto}</strong></p>
      <div class="cantidad-control">
        <button onclick="cambiarCantidad('${producto}', -1)">−</button>
        <span>${item.cantidad}</span>
        <button onclick="cambiarCantidad('${producto}', 1)">+</button>
      </div>
      <p>$ ${(item.cantidad * item.precio).toLocaleString()}</p>
    `;

    lista.appendChild(div);
  }

  contador.textContent = totalProductos;

  const totalFinal = document.createElement("h3");
  totalFinal.innerHTML = `Total: $ ${totalDinero.toLocaleString()}`;
  lista.appendChild(totalFinal);
}

function vaciarCarrito() {
  carrito = {};
  guardarCarrito();
  actualizarCarrito();
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function abrirCarrito() {
  document.getElementById("carrito").style.right = "0";
  document.getElementById("overlay").style.display = "block";
}

function cerrarCarrito() {
  document.getElementById("carrito").style.right = "-350px";
  document.getElementById("overlay").style.display = "none";
}

function abrirWhatsApp() {
  if (Object.keys(carrito).length === 0) {
    alert("Tu carrito está vacío 🛒");
    return;
  }

  let mensaje = "Hola 👋 quiero realizar este pedido:%0A%0A";

  Object.keys(carrito).forEach(producto => {
    const item = carrito[producto];
    mensaje += `🛍 ${producto} x${item.cantidad} - $ ${(item.cantidad * item.precio).toLocaleString()}%0A`;
  });

  mensaje += "%0AGracias ✨";

  window.open(`https://wa.me/573209182052?text=${mensaje}`, "_blank");
}

function animarContador() {
  const contador = document.getElementById("contador");
  if (!contador) return;

  contador.style.transform = "scale(1.3)";
  contador.style.transition = "0.2s ease";

  setTimeout(() => {
    contador.style.transform = "scale(1)";
  }, 200);
}

/* =========================
   MODAL
========================= */

function abrirModal(producto) {
  document.getElementById("modal-producto").style.display = "flex";
  document.getElementById("modal-imagen-principal").src = producto.imagen;
  document.getElementById("modal-nombre").textContent = producto.nombre;
  document.getElementById("modal-precio").textContent = "$ " + producto.precio.toLocaleString();

  document.getElementById("modal-agregar").onclick = function () {
    agregarAlCarrito(producto.nombre, producto.precio);
    cerrarModal();
  };
}

function cerrarModal() {
  document.getElementById("modal-producto").style.display = "none";
}