/*jslint node: true */
/*jslint multistr: true */
'use strict';

console.log('Iniciando Editor GIFT GBL-1');

var textoInicial = '// Comentario \n::T4::Q1\n\n\n';


var texto = document.getElementById('text1');
texto.innerText = textoInicial;

/*
var mensaje = peg_parser.parse(textoInicial);

var resultado = document.getElementById('text2');
resultado.innerText = 'Titulo: ' + mensaje[0].Title+ '\n\nComentario: ' + mensaje[0].Comment+ '\n\nPregunta: '+ mensaje[0].Text.Question+ '\n\nRespuesta: ' + mensaje[0].Text.Answer + '';
console.debug (mensaje[0]);

console.debug (resultado);
*/

$('#button-process').click (function() {
  var mensaje = peg_parser.parse(textoInicial);
  var resultado = document.getElementById('text2');
  resultado.innerText = 'Titulo: ' + mensaje[0].Title+ '\n\nComentario: ' + mensaje[0].Comment+ '\n\nPregunta: '+ mensaje[0].Text.Question+ '\n\nRespuesta: ' + mensaje[0].Text.Answer + '';

  console.debug (mensaje[0]);
  console.debug (resultado);
});
