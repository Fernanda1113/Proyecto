//Globales
const productos = [];
const carrito   = [];
const categorias = ["Policial","Asesinatos","Investigaciones"];
//Declaración de los productos (libros)
class Producto {
    constructor(id, nombre, precio,categoria,cantidad) {
            this.id = parseInt(id);
            this.nombre = nombre;
            this.precio = parseFloat(precio);
            this.categoria = categoria;
            this.cantidad  = cantidad || 1;
    }

    agregarCantidad(valor){
        this.cantidad += valor; 
    }

    subtotal(){
        return this.cantidad * this.precio;
    }
}
//Implementación de Jquery
function productosUI(productos, id){
    $(id).empty();
    for (const producto of productos) {
       $(id).append(`<div class="card" style="width: 18rem;">
                      <img src="https://via.placeholder.com/150" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.precio}</p>
                        <span class="badge badge-info">${producto.categoria}</span>
                        <a href="#" id='${producto.id}' class="btn btn-primary btn-compra">COMPRAR</a>
                      </div>
                    </div>`);
    }
  }
  //Manejar la compra de libros
  function comprarProducto(e){
    e.preventDefault();
    const idProducto   = e.target.id;
    const seleccionado = carrito.find(p => p.id == idProducto);
    if(seleccionado == undefined){
      carrito.push(productos.find(p => p.id == idProducto));
    }else{
      seleccionado.agregarCantidad(1);
    }
   
    //Guardar en el localStorage
    localStorage.setItem("CARRITO",JSON.stringify(carrito));
    carritoUI(carrito);
  }
  function carritoUI(productos){
    $('#carritoCantidad').html(productos.length);
    $('#carritoProductos').empty();
    for (const producto of productos) {
      $('#carritoProductos').append(registroCarrito(producto));
    }
    $('.btn-delete').on('click', eliminarCarrito);
    $('.btn-add').click(addCantidad);
    $('.btn-sub').click(subCantidad);
  }
  //Html
  function registroCarrito(producto){
    return `<p> ${producto.nombre} 
            <span class="badge badge-warning">$ ${producto.precio}</span>
            <span class="badge badge-dark">${producto.cantidad}</span>
            <span class="badge badge-success"> $ ${producto.subtotal()}</span>
            <a id="${producto.id}" class="btn btn-info    btn-add">+</a>
            <a id="${producto.id}" class="btn btn-warning btn-sub">-</a>
            <a id="${producto.id}" class="btn btn-danger  btn-delete">x</a>
            </p>`
  }
  
  function eliminarCarrito(e){
    console.log(e.target.id);
    let posicion = carrito.findIndex(p => p.id == e.target.id);
    carrito.splice(posicion, 1);
    console.log(carrito);
    carritoUI(carrito);
    localStorage.setItem("CARRITO",JSON.stringify(carrito));
  }
  //Sumando cantidad
  function addCantidad(){
    let producto = carrito.find(p => p.id == this.id);
    producto.agregarCantidad(1);
    $(this).parent().children()[1].innerHTML = producto.cantidad;
    $(this).parent().children()[2].innerHTML = producto.subtotal();
    //Guardar en el localStorage
    localStorage.setItem("CARRITO",JSON.stringify(carrito));
  }
  //Menos cantidad
  function subCantidad(){
    let producto = carrito.find(p => p.id == this.id);
    if(producto.cantidad > 1){
      producto.agregarCantidad(-1);
      let registroUI = $(this).parent().children();
      registroUI[1].innerHTML = producto.cantidad;
      registroUI[2].innerHTML = producto.subtotal();
      //Guardar en el localStorage
      localStorage.setItem("CARRITO",JSON.stringify(carrito));
    }
  }

