/*jslint node: true */
/*jslint multistr: true */
'use strict';

console.log('Iniciando Editor GIFT GBL-1');


/*** Enlace de eventos ***/

$('#button-process').click (function() {
  var mensaje = peg_parser.parse($('#text1').text() );
  var resultado = document.getElementById('text2');
  resultado.innerText = 'Titulo: ' + mensaje[0].Title+ '\n\nComentario: ' + mensaje[0].Comment+ '\n\nPregunta: '+ mensaje[0].Text.Question+ '\n\nRespuesta: &lt;' + mensaje[0].Text.Answer + '&gt;';

  console.debug (mensaje[0]);
  console.debug (resultado);
});

$('#button_example_1').click ( function () {parseExample(1);} );
$('#button_example_2').click ( function () {parseExample(2);} );
$('#button_example_3').click ( function () {parseExample(3);} );
$('#button_example_4').click ( function () {parseExample(4);} );
$('#button_example_extra').click ( function () {parseExample('extra');} );



$('#button_gift_input').click( function () {
  try {
    parseText('#text_gift_input', '#accordion1' );
  } catch ( myException ) {
    if ( PARSE_DEBUG ) {
      console.error ('Exception caught: ' + myException );
    }
    $.bootstrapGrowl( '<strong>Exception caught</strong>: ' +  myException, {
      type: 'danger',
      align: 'center',
      width: 'auto',
      delay: GROWL_DELAY
    } );
  }
} );


/*** Código de incialización a ejecutar ***/

var texto = document.getElementById('text1');
if ( texto !== null ) {
  var textoInicial = '// Comentario \n::T4::Q1\n\n\n';
  texto.innerText = textoInicial;
}


if ( $('#text_gift_input' ).val() === '' ) {
  $('#text_gift_input' ).val( '// Tipo: fill in the blanks - end\n::T1a::Two plus two\nequals {=four =4}\n\n// Tipo: fill in the blanks - middle\n::T1b::Two plus {=two =2}\nequals four.\n\n// Tipo: fill in the blanks - start\n::T1c::{=Two =2} plus two\nequals four.\n\n// Tipo: matching\n::Food for animals:: Which animal eats which food?\n{ =cat -> cat food =dog -> dog food =fish -> fish food }\n\n// Tipo: description/instructions (not really a question)\n::Descripción del examen::Este es un examen\nde prueba en el que no se pueden usar ni\nlápiz ni papel\n\n// Tipo essay\n::Opinión sobre texto de relleno::Escriba su\nopinión sobre si el texto de relleno\nllamado "Lorem ipsum dolor" debería actualizarse a\nlos tiempos o debería seguir intacto\n{}\n\n// Tipo: True/false\n::Lengua - codos::\n¿Puede usted llegar con su lengua a\ncualquiera de sus dos codos?\n{F}\n\n// Tipo: math tolerance question\n::Platos de un menú::¿Cuántos platos\ntiene un menú del día? {#2:1}\n\n// Tipo: math range question\n::Entre 3 y 7::Dígame un número entre\n3 y 7 {#3..7}\n' );
}

// var questions_global = [];

// var PARSE_DEBUG = true;
var PARSE_DEBUG = false;

if ( PARSE_DEBUG ) {
  var GROWL_DELAY = 0;
} else {
  var GROWL_DELAY = 3000;
}
