$(document).ready(function () {
    //Agregar un aviso en index
    $('#aviso').css({background: '#ccc'});
    $('#aviso').html('Bienvenidx, este es un espacio libre para que cuentes tus historias o experiencias paranormales');
    //Ocultar y mostrar información
    $('#mostrar').hide();
    $('#mostrar').click(function(){
        $(this).hide();
        $('#ocultar').show();
        $('#aviso').show('normal');
    });
    $('#ocultar').click(function(){
        $(this).hide();
        $('#mostrar').show();
        $('#aviso').hide('normal');
    });
    //Fondo de los titulos en historias y boton de aumento
    $('.bg').css({background: '#ccc'});

    var parrafo = $('.historia');

    $('.btn-dark').click(function () { 
        parrafo.toggleClass('display-6');        
    });
});

    $('#contactar').animate({
        margin: '30px',
        opacity: 0.4,
        fontSize: '2em'
    }, 2000);

    $('.footer').animate({
        opacity: 0.5,
        fontSize: '2em'        
    }, 2000);
    $('.autor').animate({
        left: '+=1000px'
    }, 1000);