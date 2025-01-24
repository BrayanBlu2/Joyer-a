const { createApp } = Vue;

createApp({ // Contenido visible del html/ página web
template: `

<header>
<div id="logo">
    <img src="img/logo.webp" alt="Logo" title="Logo" width="auto" height="80px">
    <p>NightGlow</p>
</div>

<div id="pasos">
    <a href="#" class="botonA">Productos</a>
    <button @click="mostrarCarrito" class="botonA">Carrito</button>
    <div id="cambio">
        <div id="monedaTitulo">EUR</div>
        <ul id="monedas">
            <li><button @click="conver('EUR')">EUR</button></li>
            <li><button @click="conver('USD')">USD</button></li>
            <li><button @click="conver('NIO')">NIO</button></li>
            <li><button @click="conver('JPY')">JPY</button></li>
        </ul>
    </div>
</div>
</header>

<div id="carrito">
  <div id="carrito_popup">
    <button id="cerrar" @click="cerrarCarrito">X</button>

    <div v-if="car.length > 0">
    <h2>Carrito</h2>
        <table> 
          <tr>
              <td><h3>Vista</h3></td>            
              <td><h3>Nombre</h3></td>            
              <td><h3>Precio</h3></td>                 
              <td><h3>Cantidad</h3></td> 
              <td><h3>Subtotal</h3></td>     
          </tr>
          <tr v-for="item in car" :key="item.id" class="car-item">
              <td> <img :src="item.imagen" :alt="item.Nombre" width="70px" height="70px"/></td>
              <td> {{item.Nombre}}</td>
              <td> {{item.Precio}}{{Simbolo}}</td>
              <td> 
              <button @click="disminuirCantidad(item)" class="botonB">-</button>
              {{item.cantidad}}
              <button @click="aumentarCantidad(item)" class="botonB">+</button>
              </td>
              <td> {{ ((item.cantidad * item.Precio) * cambio).toFixed(2) }} {{Simbolo}}</td>
          </tr>
        </table>
      <h3>Total de la compra</h3>
      <p v-if="precioTotal > 0">Total del carrito: {{ (precioTotal * cambio).toFixed(2) }} {{Simbolo}}</p>
      <div id="compraFinal">
        <button @click="vaciarCarrito()" id="vaciar">Vaciar Carrito</button>
        <button @click="finalizarCompra()" id="finalizarCompra">Finalizar Compra</button>
      </div>

    </div> 
        <h3 v-if="car.length==0"> El carrito está vacío</h3>
  </div>
</div>

<h1>La mejor Joyería del Barrio</h1>

<div id="datos">
    <div class="pagination">
        <button class="pulse" @click="prevPage" :disabled="currentPage === 1">Anterior</button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button class="pulse" @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
    </div>

    <div id="container">
        <div v-for="vista in paginatedVistas":key="vista.id" id="card">
            <div class="imagen">
                <img :src="vista.imagen" :alt="vista.Nombre"/>
            </div>
            <div class="cuerpo">
                <strong>{{vista.Nombre}}</strong>
                <div id="aumentar">
                <button :disabled="vista.cantidad == 1" @click="disminuirCantidad(vista)" class="botonB" id="dismi">-</button>
                {{vista.cantidad}}
                <button @click="aumentarCantidad(vista)" class="botonB">+</button>
                </div>
                <p>{{(vista.Precio.toLocaleString() * cambio).toFixed(2)}}{{Simbolo}}</p>
                <button @click="anadir(vista)">Añadir al carrito</button>
            </div>
        </div>
    </div>

    <div class="pagination">
            <button class="pulse" @click="prevPage" :disabled="currentPage === 1">Anterior</button>
            <span>Página {{ currentPage }} de {{ totalPages }}</span>
            <button class="pulse" @click="nextPage" :disabled="currentPage === totalPages">Siguiente</button>
    </div>

  </div>
</div>
`,
data() {
    return { //Variables con contenido
    vistas: [
        { id: 1, Nombre: "Anillo Corona", Precio: 2000, imagen: "img/anilloCorona.webp", cantidad: 1},
        { id: 2, Nombre: "Anillo Curva", Precio: 800, imagen: "img/anilloCurva.webp" , cantidad: 1},
        { id: 3, Nombre: "Anillo Fino", Precio: 1300, imagen: "img/anilloFino.webp" , cantidad: 1},
        { id: 4, Nombre: "Anillo Grande", Precio: 600, imagen: "img/anilloGrande.webp" , cantidad: 1},
        { id: 5, Nombre: "Anillo grueso", Precio: 1800, imagen: "img/anillogrueso.webp", cantidad: 1},
        { id: 6, Nombre: "Anillo Llave", Precio: 2000, imagen: "img/anilloLlave.webp", cantidad: 1},
        { id: 7, Nombre: "Anillo Ola", Precio: 1300, imagen: "img/anilloOla.webp" , cantidad: 1},
        { id: 8, Nombre: "Anillo Perla", Precio: 3000, imagen: "img/anilloPerla.webp" , cantidad: 1},
        { id: 9, Nombre: "Anillo Plata", Precio: 700, imagen: "img/anilloPlata.webp", cantidad: 1},
        { id: 10, Nombre: "Arito", Precio: 300, imagen: "img/arito.webp", cantidad: 1},
        { id: 11, Nombre: "Arito Flor", Precio: 900, imagen: "img/aritoFlor.webp", cantidad: 1},
        { id: 12, Nombre: "Caballito", Precio: 1250, imagen: "img/caballito.webp", cantidad: 1},
        { id: 13, Nombre: "collar Trigo", Precio: 2150, imagen: "img/collarTrigo.webp", cantidad: 1},
        { id: 14, Nombre: "Pulsera Diamante", Precio: 3000, imagen: "img/diamondPulser.webp" , cantidad: 1},
        { id: 15, Nombre: "Anillo de Oro Simbol", Precio: 2400, imagen: "img/goldenAnilloSimbol.webp", cantidad: 1}
    ],
    currentPage: 1,
    itemsPerPage: 10,
    tipoMoneda: "EUR",
    cambio:1,
    cantidad: 1,
    Simbolo:"€",
    car:[], //Variable del Carrito
    };
},
computed: {
    totalPages() {
    return Math.ceil(this.vistas.length / this.itemsPerPage);
    },

    paginatedVistas() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    return this.vistas.slice(start, end);
    },

    precioTotal() { //Parte del carrito
      return this.car.reduce((sum, item) => sum + item.Precio * item.cantidad, 0);
    },
  },
methods: {
    nextPage() {  //Paginación
    if (this.currentPage < this.totalPages) this.currentPage++;
    },
    prevPage() {
    if (this.currentPage > 1) this.currentPage--;
    },
    conver(tipo){
        fetch(' https://v6.exchangerate-api.com/v6/2d32faab06a3c28f785d7e33/latest/EUR')
        .then(response=>response.json()) //Cuando se conecte lo anterior y da una respuesta ok el servidor, que haga lo siguiente
        .then(data =>{

        for(x in data.conversion_rates){
            if(tipo==x){
                this.tipoMoneda=tipo;
                this.cambio= data.conversion_rates[x] 
                document.getElementById("monedaTitulo").innerHTML=tipo 

                if(tipo=="EUR"){   //Cambiar el símbolo del dinero según la moneda
                    this.Simbolo="€"
                } else if(tipo=="USD"){
                    this.Simbolo="$"
                } else if(tipo=="NIO"){
                    this.Simbolo="C$"
                } else if(tipo=="JPY"){
                    this.Simbolo="¥"
                }
            }
          }   
        })     //Exchange Rate API
    },
    anadir(producto) { //Parte del Carrito
        const existeIngItem = this.car.find((item) => item.id === producto.id); //Verifica si el producto ya está añadido al carrito
        if (existeIngItem) {
          existeIngItem.cantidad += producto.cantidad;
        } else {
          this.car.push({ ...producto, cantidad: producto.cantidad }); //Con los 3 punsos se añade tolo lo que ya tenía más lo nuevo.
        }
      },
      mostrarCarrito() { //Desplegar carrito
        document.getElementById("carrito").style.display = "flex";
      },

      cerrarCarrito() {  //Cerrar Carrito
        document.getElementById("carrito").style.display = "none";
      },

      aumentarCantidad(producto){ //aumentar cantidad de productos
        producto.cantidad++;
      },
      disminuirCantidad(producto){ //disminuir cantidad de productos
        producto.cantidad--;

        if(producto.cantidad==0){ //eliminar el producto
          this.car.splice(this.car.indexOf(producto),1);
        }
      },

      vaciarCarrito() { //vaciar carrito
        this.car = [];
      },
      finalizarCompra(){ //finalizar compra
        alert("Gracias por su compra");
        this.car = [];
        this.cerrarCarrito();
      },

},
}).mount('#app'); 