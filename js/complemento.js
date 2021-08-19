//Preparar Jquery
$(document).ready(function () {
    if("carro" in localStorage){
        const arrayLiterales = JSON.parse(localStorage.getItem("carro"));
        for (const literal of arrayLiterales) {
            carro.push(new Producto(literal.id, literal.nombre, literal.precio, literal.categoria, literal.cantidad));
        }
        console.log(carro);
        carroUI(carro);
    }
    $(".dropdown-menu").click(function (e) { 
        e.stopPropagation();
    });
});
//Paramostrar las img
window.addEventListener('load',()=>{
    //Eliminar
    $('#indicadorCarga').remove();
    //Muestra
    $('#contenedorLibros').fadeIn("slow",()=>{ console.log('ANIMACION FINALIZADA')});
    //Sin mostrar
})
//Objetos
productos.push(new Producto(1, "El pasajero oscuro", 85, categorias[0], 1, "../img/dexter1.jpeg"));
productos.push(new Producto(2, "Querido Dexter", 80, categorias[0], 1, "../img/dexter2.jpeg"));
productos.push(new Producto(3, "En la oscuridad", 90, categorias[1], 1, "../img/dexter3.jpeg"));
productos.push(new Producto(4, "Por desición propia", 125, categorias[1], 1, "../img/dexter4.jpeg"));
productos.push(new Producto(5, "El asesino exquisito", 75, categorias[2], 1, "../img/dexter5.jpeg"));
productos.push(new Producto(6, "Dexter por dos", 70, categorias[2], 1, "../img/dexter6.jpeg"));
productos.push(new Producto(7, "Dexter, camara, acción", 65, categorias[3], 1, "../img/dexter7.jpeg"));
productos.push(new Producto(8, "La muerte de Dexter", 250, categorias[3], 1, "../img/dexter8.jpeg"));

librosUI(productos, '#contenedorLibros');
selectUI(categorias,"#filtroCategorias");
$('#filtroCategorias').change(function (e) { 
    //New valor
    const value = this.value;
    //Animando
    $('#contenedorLibros').fadeOut(600,function(){
        //Filtro/Ocultar
        if(value == 'TODOS'){
            librosUI(productos, '#contenedorLibros');
        }else{
            const filtrados = productos.filter(producto => producto.categoria == value);
            librosUI(filtrados, '#contenedorLibros');
        }
        $('#contenedorLibros').fadeIn();
    });
	$('.subir').click(function (e) {
		e.preventDefault();

		$('html, body').animate({
			scrollTop: 0
		}, 5000);

		return false;
	});
});
