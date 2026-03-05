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
   PRODUCTOS (CON CATEGORIA)
========================= */

const productos = [
{ nombre: "Kit Infantil Decoración Fiesta - Cars X12 Invitados", precio: 32900, imagen: "https://http2.mlstatic.com/D_Q_NP_816141-MCO77248577888_072024-F.webp , https://picsum.photos/id/210/600/600, https://picsum.photos/id/211/600/600, https://picsum.photos/id/212/600/600", categoria: "pinateria" , descripcion: "lo que queramos poner del prodcuto" },
{ nombre: "Relleno De Juguetes Para Piñata 52 Piezas", precio: 32000, imagen: "https://http2.mlstatic.com/D_Q_NP_968971-MCO89436938973_082025-F.webp ,https://picsum.photos/id/213/600/600, https://picsum.photos/id/214/600/600, https://picsum.photos/id/215/600/600 ", categoria: "pinateria", descripcion: "lo que queramos poner del prodcuto" },
{ nombre: "Piñateria Pelotas Antiestres X12un Niños Fiesta Personajes Rojo", precio: 29900, imagen: "https://http2.mlstatic.com/D_Q_NP_989534-MCO91751551024_092025-F.webp , https://picsum.photos/id/208/600/600, https://picsum.photos/id/209/600/600 ", categoria: "pinateria" , descripcion: "lo que queramos poner del prodcuto" },
{ nombre: "Juguetes De Peluche Que Respira De Capibara", precio: 29625, imagen: "https://http2.mlstatic.com/D_Q_NP_710479-CBT107678290471_022026-F.webp,https://picsum.photos/id/210/600/600, https://picsum.photos/id/211/600/600, https://picsum.photos/id/212/600/600", categoria: "juguetes" , descripcion: "lo que queramos poner del prodcuto" },
{ nombre: "Lanzador Nerf Pro Gelfire Raid 10000 Recargable Blanco Hasbro", precio: 229900, imagen: "https://http2.mlstatic.com/D_Q_NP_898753-MLA99491192372_112025-F.webp,https://picsum.photos/id/213/600/600, https://picsum.photos/id/214/600/600, https://picsum.photos/id/215/600/600", categoria: "juguetes" , descripcion: "lo que queramos poner del prodcuto" },
{ nombre: "Carro Carreras Drift Control Remoto Niños Juguete Color Verde", precio: 74999, imagen: "https://http2.mlstatic.com/D_Q_NP_805706-MLA99506800054_112025-F.webp,https://http2.mlstatic.com/D_Q_NP_805706-MLA99506800054_112025-F.webp,https://picsum.photos/id/216/600/600, https://picsum.photos/id/217/600/600, https://picsum.photos/id/218/600/600", categoria: "juguetes" , descripcion: "lo que queramos poner del prodcuto" },
{ nombre: "Audífonos Bluetooth Skullcandy Push Play Active Negro", precio: 259900, imagen: "https://http2.mlstatic.com/D_Q_NP_693890-MLA96170625177_102025-F.webp,https://picsum.photos/id/219/600/600, https://picsum.photos/id/220/600/600, https://picsum.photos/id/221/600/600", categoria: "tecnologia" , descripcion: "lo que queramos poner del prodcuto" },
{ nombre: "Pistola Masajeadora De Percusión Portátil Con 6 Velocidades", precio: 33165, imagen: "https://http2.mlstatic.com/D_Q_NP_629990-MLA78762182346_092024-F.webp,https://picsum.photos/id/222/600/600, https://picsum.photos/id/223/600/600, https://picsum.photos/id/224/600/600", categoria: "tecnologia" , descripcion: "lo que queramos poner del prodcuto" },
{ nombre: "Consola Nintendo Switch 2", precio: 2032140, imagen: "https://http2.mlstatic.com/D_Q_NP_758871-MLA96097438383_102025-F.webp,https://picsum.photos/id/225/600/600, https://picsum.photos/id/226/600/600, https://picsum.photos/id/227/600/600", categoria: "tecnologia" , descripcion: "lo que queramos poner del prodcuto" },
{ nombre: "Cepillo De Vapor 3 En 1 Masaje Autolimpieza Peine Para Gatos Color Verde lima", precio: 6439, imagen: "https://http2.mlstatic.com/D_Q_NP_711014-MLA92882265157_092025-F.webp,https://picsum.photos/id/228/600/600, https://picsum.photos/id/229/600/600, https://picsum.photos/id/230/600/600", categoria: "mascotas" , descripcion: "lo que queramos poner del prodcuto" },
{ nombre: "Fuente Bebedero Automático Mascotas Xalta Blanco 2.4L Triple Filtro", precio: 39900, imagen: "https://http2.mlstatic.com/D_Q_NP_751796-MLA92732597215_092025-F.webp,https://picsum.photos/id/201/600/600, https://picsum.photos/id/202/600/600, https://picsum.photos/id/203/600/600", categoria: "mascotas" , descripcion: "LO QUE TOQUE PONER DEL PRODUCTO" }
];
/* =========================
   MODAL (CON GALERÍA PRO)
========================= */

function abrirModal(producto) {
  const modal = document.getElementById("modal-producto");
  const modalImg = document.getElementById("modal-imagen-principal");
  const modalNombre = document.getElementById("modal-nombre");
  const modalPrecio = document.getElementById("modal-precio");
  const modalDescripcion = document.getElementById("modal-descripcion");
  const botonAgregar = document.getElementById("modal-agregar");
  const overlay = document.getElementById("overlay");
  const contenedorMiniaturas = document.getElementById("modal-miniaturas");

  if (!modal || !modalImg || !modalNombre || !modalPrecio) return;

  /* =========================
     MANEJO DE MÚLTIPLES IMÁGENES
  ========================= */

  // Convertir string en array de imágenes
  const imagenes = producto.imagen.split(",").map(img => img.trim());

  // Imagen principal
  modalImg.src = imagenes[0];

  // Limpiar miniaturas anteriores
  if (contenedorMiniaturas) {
    contenedorMiniaturas.innerHTML = "";

    imagenes.forEach(img => {
      const mini = document.createElement("img");
      mini.src = img;
      mini.classList.add("miniatura");

      mini.addEventListener("click", function () {
        modalImg.src = img;
      });

      contenedorMiniaturas.appendChild(mini);
    });
  }

  /* =========================
     DATOS DEL PRODUCTO
  ========================= */

  modalNombre.textContent = producto.nombre;
  modalPrecio.textContent = "$ " + producto.precio.toLocaleString();

  if (modalDescripcion) {
    modalDescripcion.textContent = producto.descripcion || "";
  }

  if (botonAgregar) {
    botonAgregar.onclick = function () {
      agregarAlCarrito(producto.nombre, producto.precio);
    };
  }

  modal.classList.add("activo");
  if (overlay) overlay.classList.add("activo");
}

function cerrarModal() {
  const modal = document.getElementById("modal-producto");
  const overlay = document.getElementById("overlay");

  if (!modal || !overlay) return;

  modal.classList.remove("activo");
  overlay.classList.remove("activo");
}
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
  mostrarProductos(productos);
}

function eliminarFavorito(nombre) {
  favoritos = favoritos.filter(p => p.nombre !== nombre);
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
  actualizarFavoritos();
  mostrarProductos(productos);
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
    card.setAttribute("data-categoria", producto.categoria);

    // ✅ Detecta si la imagen tiene varias URLs separadas por coma
    const imagenPrincipal = producto.imagen.includes(",")
      ? producto.imagen.split(",")[0].trim()
      : producto.imagen;

    card.innerHTML = `
      <span class="btn-favorito ${esFavorito ? 'activo' : ''}">❤</span>
      <img src="${imagenPrincipal}" alt="${producto.nombre}" class="imagen-producto">
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
   FILTRO POR CATEGORIAS
========================= */

document.addEventListener("DOMContentLoaded", function () {

  mostrarProductos();
  actualizarCarrito();
  actualizarFavoritos();

  const botonesFiltro = document.querySelectorAll(".filtro-btn");

  botonesFiltro.forEach(boton => {
    boton.addEventListener("click", function () {

      botonesFiltro.forEach(btn => btn.classList.remove("activo"));
      this.classList.add("activo");

      const categoria = this.getAttribute("data-categoria");

      if (categoria === "todos") {
        mostrarProductos(productos);
      } else {
        const filtrados = productos.filter(p => p.categoria === categoria);
        mostrarProductos(filtrados);
      }

    });
  });

  const buscador = document.getElementById("buscador");

  if (buscador) {
    buscador.addEventListener("input", function () {

      const texto = this.value.toLowerCase().trim();

      if (texto === "") {
        mostrarProductos(productos);
        return;
      }

      const productosFiltrados = productos.filter(function (producto) {
        return producto.nombre.toLowerCase().includes(texto);
      });

      mostrarProductos(productosFiltrados);
    });
  }

});

/* =========================
   MODO DIA / NOCHE
========================= */

const botonTema = document.getElementById("toggle-tema");

if (botonTema) {

  // Cargar tema guardado
  const temaGuardado = localStorage.getItem("tema");

  if (temaGuardado === "oscuro") {
    document.body.classList.add("modo-oscuro");
    botonTema.textContent = "☀️";
  }

  botonTema.addEventListener("click", function () {
    document.body.classList.toggle("modo-oscuro");

    if (document.body.classList.contains("modo-oscuro")) {
      localStorage.setItem("tema", "oscuro");
      botonTema.textContent = "☀️";
    } else {
      localStorage.setItem("tema", "claro");
      botonTema.textContent = "🌙";
    }
  });

}

const btnTop = document.getElementById("btn-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    btnTop.style.display = "block";
  } else {
    btnTop.style.display = "none";
  }
});

btnTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

/* =========================
   FUNCION ENVIAR CARRITO POR WHATSAPP
========================= */

function abrirWhatsApp() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || {};
  let mensaje = "Hola! Quiero hacer el siguiente pedido:%0A";
  let total = 0;

  for (let producto in carrito) {
    const item = carrito[producto];
    const subtotal = item.cantidad * item.precio;
    total += subtotal;
    mensaje += `- ${producto} x${item.cantidad} = $${subtotal.toLocaleString()}%0A`;
  }

  mensaje += `%0ATotal: $${total.toLocaleString()}`; // Agrega total al final

  // Reemplaza con tu número en formato internacional
  const url = `https://wa.me/573209182052?text=${mensaje}`;
  window.open(url, "_blank");
}
function togglePablo() {
  const opciones = document.getElementById("pabloOptions");
  if (opciones.style.display === "flex") {
    opciones.style.display = "none";
  } else {
    opciones.style.display = "flex";
  }
}
function toggleMenu() {

  let menu = document.getElementById("menuLateral");

  if (!menu) return;

  if (menu.style.left === "0px") {
    menu.style.left = "-250px";
  } else {
    menu.style.left = "0px";
  }

}
/* =========================
   FILTRO DESDE MENU LATERAL
========================= */

document.querySelectorAll("#menuLateral a[data-categoria]").forEach(link => {

  link.addEventListener("click", function(e) {

    e.preventDefault(); // evita que el link recargue la página

    const categoria = this.getAttribute("data-categoria");

    if (categoria === "todos") {
      mostrarProductos(productos);
    } else {
      const filtrados = productos.filter(p => p.categoria === categoria);
      mostrarProductos(filtrados);
    }

    toggleMenu(); // cierra el menú después de elegir

  });

});