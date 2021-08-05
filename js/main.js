alert("Hola! esta es una pagina con contenido fuerte en algunas historias, si eres sensible te recomiendo leer otro tipo de contenido :D");

alert("Bienvenidx a Cuentame tu histoira, el desarollador no se hace responsable de daños psicologicos");


class Producto{
            constructor(id, nombre, precio, imagen) {
                    this.id = parseInt(id);
                    this.nombre = nombre;
                    this.precio = parseFloat(precio);
                    this.imagen = imagen;
            }
}


const productos = [];
if("productos" in localStorage){
    console.log("Clave existente");
    const guardado = JSON.parse(localStorage.getItem("productos"));
    console.log(guardado);
    for (const producto of guardado) {
        productos.push(new Producto(producto.id, producto.nombre, producto.precio, producto.imagen));
    }
}

//Libros/productos
productos.push(new Producto(1,"El oscuro pasajero",180, "../img/dexter1.jpeg" ));
productos.push(new Producto(2, "Querido Dexter", 80, "../img/dexter2.jpeg"));
productos.push(new Producto(3, "Dexter en la oscuridad", 160, "../img/dexter3.jpeg"));
productos.push(new Producto(4, "Por decisión propia", 90, "../img/dexter4.jpeg"));

for (const producto of productos) {
    let div = document.createElement("div");

    div.classList.add("card");
    //Estructurar el div
    div.innerHTML = `<div class="card-body ">
                             <h2>${producto.nombre}</h2>
                             <img src='${producto.imagen}'>
                             <h3>${producto.precio}</h3>
                             <button id="${producto.id}" class="btn btn-dark">COMPRAR</button>
                             </div>`;
    document.getElementById('tienda').appendChild(div);
}

const botones = document.getElementsByClassName('btn-dark');
console.log(botones);

const carro = [];

function manejador(){
    const selecciona = productos.find( producto => producto.id == this.id);
    carro.push(selecciona);
    console.log(carro);
    localStorage.setItem('carro', JSON.stringify(carro));
    const divCarro = document.getElementById('carro');
    divCarro.innerHTML = '';
    for(const producto of carro){
        let item = document.createElement("p");
        item.innerHTML = `Producto: ${producto.nombre} ${producto.precio}`;
        divCarro.appendChild(item);
    }
}

for (const boton of botones){
    boton.addEventListener("click", manejador);
}

const formulario = document.getElementById("addProducto");
/*const productoRegistrado = [];
formulario.addEventListener("submit", function(event){
    event.preventDefault();
    const inputs = formulario.children;
    console.log(inputs);
    const nuevo = new Producto(inputs[0].value,
                               inputs[1].value, 
                               inputs[2].value)
                               inputs[3].value;
    productoRegistrado.push(nuevo);
    localStorage.setItem('productos',JSON.stringify(productoRegistrado));
    tienda(productos);
})*/
formulario.onsubmit = (event) =>{
    event.preventDefault();
    const inputs = formulario.children;
    console.log(inputs);
    const nuevoProducto = new Producto(getID(),inputs[0].value,
    inputs[1].value, 
    inputs[2].value,
    inputs[3].value);
    console.log(nuevoProducto);
    productos.push(nuevoProducto);
    tienda(productos);
}
function tienda(productos){
    const divProductosUI = document.getElementById('tienda');
    divProductosUI.innerHTML = '';
    for (const producto of productos) {
            let div = document.createElement("div");
            div.innerHTML = `<h2>${producto.nombre}</h2>
                            </h3>${producto.precio}</h3>
                            <button id='${producto.id}' class="btnCompra">COMPRAR</button>`;
            divtienda.appendChild(div);
    }
    const botones = document.getElementsByClassName('btnCompra');
    for (const boton of botones) {
            boton.addEventListener("click", manejador);
    }
}
function getID(){
    return productos.length;
}

