/* =========================
   EFECTO SCROLL REVELADO
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
{ nombre: "GRUPO6", precio: 10500, imagen: "https://jemarescolombia.com/cdn/shop/files/RelojRichardMille_Rojo.jpg?v=1765590287&width=600" },
{ nombre: "GRUPO1", precio: 10000, imagen: "https://jemarescolombia.com/cdn/shop/files/RelojRichardMille_Rojo.jpg?v=1765590287&width=600" },
{ nombre: "GRUPO2", precio: 10000, imagen: "https://jemarescolombia.com/cdn/shop/files/RelojRichardMille_Rojo.jpg?v=1765590287&width=600" },
{ nombre: "GRUPO3", precio: 10000, imagen: "https://api.hhunt.es/storage/products/1748846588.webp" },
{ nombre: "GRUPO4", precio: 10000, imagen: "https://api.hhunt.es/storage/products/1748846588.webp" },
{ nombre: "GRUPO5", precio: 10000, imagen: "https://api.hhunt.es/storage/products/1748846588.webp" },
{ nombre: "GRUPO7", precio: 10000, imagen: "https://api.hhunt.es/storage/products/1748846588.webp" },
{ nombre: "GRUPO8", precio: 10000, imagen: "https://jemarescolombia.com/cdn/shop/files/RelojRichardMille_Rojo.jpg?v=1765590287&width=600" },
{ nombre: "GRUPO9", precio: 10000, imagen: "https://jemarescolombia.com/cdn/shop/files/RelojRichardMille_Rojo.jpg?v=1765590287&width=600" },
{ nombre: "GRUPO10", precio: 10000, imagen: "https://m.media-amazon.com/images/I/61q-8624j6L._AC_UY1000_.jpg" },
{ nombre: "GRUPO11", precio: 10000, imagen: "https://i.pinimg.com/170x/cb/d4/13/cbd4136ba81708b3f480faa9e10b12f0.jpg" }
];

/* =========================
   FAVORITOS
========================= */

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

function toggleFavorito(producto) {
  const index = favoritos.findIndex(p => p.nombre === producto.nombre);

  if (index !== -1) {
    favoritos.splice(index, 1);
  } else {
    favoritos.push(producto);
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  actualizarFavoritos();
  mostrarProductos();
}

function eliminarFavorito(nombre) {
  favoritos = favoritos.filter(p => p.nombre !== nombre);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  actualizarFavoritos();
  mostrarProductos();
}

function actualizarFavoritos() {
  const lista = document.getElementById("lista-favoritos");
  const contador = document.getElementById("contador-favoritos");

  if (!lista || !contador) return;

  lista.innerHTML = "";
  contador.textContent = favoritos.length;

  favoritos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("item-carrito");

    div.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:center;">
        <div style="display:flex; align-items:center; gap:10px;">
          <img src="${producto.imagen}" width="50">
          <div>
            <p><strong>${producto.nombre}</strong></p>
            <p>$ ${producto.precio.toLocaleString()}</p>
          </div>
        </div>
        <button onclick="eliminarFavorito('${producto.nombre}')"
          style="background:none;border:none;color:red;font-size:18px;cursor:pointer;">
          ✕
        </button>
      </div>
    `;

    lista.appendChild(div);
  });
}

function abrirFavoritos() {
  document.getElementById("favoritos-panel").classList.add("activo");
  document.getElementById("overlay").classList.add("activo");
}

function cerrarFavoritos() {
  document.getElementById("favoritos-panel").classList.remove("activo");
  document.getElementById("overlay").classList.remove("activo");
}

/* =========================
   MOSTRAR PRODUCTOS
========================= */

function mostrarProductos(lista = productos) {
  const contenedor = document.getElementById("contenedor-productos");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  lista.forEach(producto => {
    const esFavorito = favoritos.some(p => p.nombre === producto.nombre);

    const card = document.createElement("div");
    card.classList.add("producto");

    card.innerHTML = `
      <span class="btn-favorito ${esFavorito ? 'activo' : ''}">❤</span>
      <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-producto">
      <h3>${producto.nombre}</h3>
      <p class="precio">$ ${producto.precio.toLocaleString()}</p>
      <button class="btn-agregar">Agregar al carrito</button>
    `;

    card.querySelector(".btn-favorito").addEventListener("click", () => {
      toggleFavorito(producto);
    });

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

function cambiarCantidad(nombre, cambio) {
  if (!carrito[nombre]) return;

  carrito[nombre].cantidad += cambio;

  if (carrito[nombre].cantidad <= 0) {
    delete carrito[nombre];
  }

  guardarCarrito();
  actualizarCarrito();
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
  document.getElementById("carrito").classList.add("activo");
  document.getElementById("overlay").classList.add("activo");
}

function cerrarCarrito() {
  document.getElementById("carrito").classList.remove("activo");
  document.getElementById("overlay").classList.remove("activo");
}

function animarContador() {
  const contador = document.getElementById("contador");
  if (!contador) return;
  contador.style.transform = "scale(1.3)";
  setTimeout(() => contador.style.transform = "scale(1)", 200);
}

/* =========================
   MODAL
========================= */

function abrirModal(producto) {
  const modal = document.getElementById("modal-producto");
  if (!modal) return;

  modal.classList.add("activo");

  document.getElementById("modal-imagen-principal").src = producto.imagen;
  document.getElementById("modal-nombre").textContent = producto.nombre;
  document.getElementById("modal-precio").textContent =
    "$ " + producto.precio.toLocaleString();

  document.getElementById("modal-agregar").onclick = function () {
    agregarAlCarrito(producto.nombre, producto.precio);
    cerrarModal();
  };
}

function cerrarModal() {
  const modal = document.getElementById("modal-producto");
  if (!modal) return;
  modal.classList.remove("activo");
}

/* =========================
   INICIO
========================= */

document.addEventListener("DOMContentLoaded", () => {
  mostrarProductos();
  actualizarCarrito();
  actualizarFavoritos();
});
/* =========================
   ENVIAR CARRITO A WHATSAPP
========================= */

function abrirWhatsApp() {
  if (Object.keys(carrito).length === 0) {
    alert("El carrito está vacío 🛒");
    return;
  }

  let mensaje = "Hola, quiero comprar:%0A%0A";
  let total = 0;

  for (let producto in carrito) {
    const item = carrito[producto];
    const subtotal = item.cantidad * item.precio;
    total += subtotal;

    mensaje += `• ${producto} x${item.cantidad} - $ ${subtotal.toLocaleString()}%0A`;
  }

  mensaje += `%0ATotal: $ ${total.toLocaleString()}`;

  const numero = "573209182052"; // 👈 CAMBIA ESTE POR TU NUMERO
  const url = `https://wa.me/${numero}?text=${mensaje}`;

  window.open(url, "_blank");
}