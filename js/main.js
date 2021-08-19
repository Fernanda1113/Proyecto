//Globales
const productos = [];
const carro   = [];
const categorias = ["Policial","Asesinatos","Investigación", "Sangre"];
class Producto {
    constructor(id, nombre, precio, categoria, cantidad, imagen) {
        this.id = parseInt(id);
        this.nombre = nombre;
        this.precio = parseFloat(precio);
        this.categoria = categoria;
        this.cantidad = parseInt(cantidad);
        this.imagen = imagen;
    }

    agregarCantidad(valor) {
        this.cantidad += valor;
    }

    subtotal() {
        return this.cantidad * this.precio;
    }
}
//Implementación de Jquery
function librosUI(productos, id){
    $(id).empty();
    for (const producto of productos) {
       $(id).append(`<div class="card" style="width: 23rem;">
                      <img src="${producto.imagen}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">${producto.precio}</p>
                        <span class="badge badge-info">${producto.categoria}</span>
                        <a href="#" id='${producto.id}' class="btn btn-dark btn-compra">COMPRAR</a>
                      </div>
                    </div>`);
    }
    $('.btn-compra').on("click", comprarProducto);
  }
  function comprarProducto(e){
    e.preventDefault();
    const idProducto   = e.target.id;
    const seleccionado = carro.find(p => p.id == idProducto);
    if(seleccionado == undefined){
      carro.push(productos.find(p => p.id == idProducto));
    }else{
      //Agregar
      seleccionado.agregarCantidad(1);
    }
   
    //Guardar en el localStorage
    localStorage.setItem("carro",JSON.stringify(carro));
    //Salida
    carroUI(carro);
  }
  function carroUI(productos){
    $('#carroCantidad').html(productos.length);
    //Limpiar
    $('#carroLibros').empty();
    for (const producto of productos) {
      $('#carroLibros').append(registroCarro(producto));
    }

    $('.btn-delete').on('click', eliminarCarro);
    $('.btn-add').click(addCantidad);
    $('.btn-sub').click(subCantidad);
  }
  //html
  function registroCarro(producto){
    return `<p> ${producto.nombre} 
            <span class="badge badge-warning">$ ${producto.precio}</span>
            <span class="badge badge-dark">${producto.cantidad}</span>
            <span class="badge badge-success"> $ ${producto.subtotal()}</span>
            <a id="${producto.id}" class="btn btn-info    btn-add">+</a>
            <a id="${producto.id}" class="btn btn-warning btn-sub">-</a>
            <a id="${producto.id}" class="btn btn-danger  btn-delete">x</a>
            </p>`
  }
  
  function eliminarCarro(e){
    console.log(e.target.id);
    let posicion = carro.findIndex(p => p.id == e.target.id);
    carro.splice(posicion, 1);
    carroUI(carro);
    //Con localStorage guardar en el carro
    localStorage.setItem("carro",JSON.stringify(carro));
  }
  //MANEJADOR PARA AGREGAR CANTIDAD CANTIDAD
  function addCantidad(){
    let producto = carro.find(p => p.id == this.id);
    producto.agregarCantidad(1);
    $(this).parent().children()[1].innerHTML = producto.cantidad;
    $(this).parent().children()[2].innerHTML = producto.subtotal();
    //Guardar en el localStorage
    localStorage.setItem("carro",JSON.stringify(carro));
  }
  function subCantidad(){
    let producto = carro.find(p => p.id == this.id);
    if(producto.cantidad > 1){
      producto.agregarCantidad(-1);
      let registroUI = $(this).parent().children();
      registroUI[1].innerHTML = producto.cantidad;
      registroUI[2].innerHTML = producto.subtotal();
      //Guardar en el localStorage
      localStorage.setItem("carro",JSON.stringify(carro));
    }
  }
  //Select
  function selectUI(lista, selector){
    $(selector).empty();
    lista.forEach(element => {
        $(selector).append(`<option value='${element}'>${element}</option>`);
    });
    $(selector).prepend(`<option value='TODOS' selected>TODOS</option>`);
  }
