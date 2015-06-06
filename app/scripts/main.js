/*jslint node: true */
/*jslint multistr: true */
'use strict';

console.log('Iniciando Editor GIFT GBL-1');


var texto = document.getElementById('text1');
if ( texto !== null ) {
  var textoInicial = '// Comentario \n::T4::Q1\n\n\n';
  texto.innerText = textoInicial;
}


$('#button-process').click (function() {
  var mensaje = peg_parser.parse($('#text1').text() );
  var resultado = document.getElementById('text2');
  resultado.innerText = 'Titulo: ' + mensaje[0].Title+ '\n\nComentario: ' + mensaje[0].Comment+ '\n\nPregunta: '+ mensaje[0].Text.Question+ '\n\nRespuesta: &lt;' + mensaje[0].Text.Answer + '&gt;';

  console.debug (mensaje[0]);
  console.debug (resultado);
});

function parseExample ( nExample )
{
  var _end = {'state':'not_begun', 'message':'Parsing not begun.'};
  var _origen = $('#example_text_' + nExample).text();
  switch (jQuery.type(_origen)) {
    case 'undefined':
    _end.state = 'error';
    _end.message = '#example_text_' + nExample + ' is undefined.' ;
      break;
    case 'null':
    _end.state = 'error';
    _end.message = '#example_text_' + nExample + ' is null.';
      break;
    case 'string':
      if (_origen.length > 0) {
        var _mensaje;
        try {
          _mensaje = peg_parser.parse (_origen );
        } catch (e) {
          if (e instanceof SyntaxError) {
            console.error ('SyntaxError exception.');
            _end.state = 'error';
            _end.message = 'Error: '+_mensaje.message;
          } else {
            console.error ('Unknown exception.');
            _end.state = 'error';
            _end.message = 'Unrecognized exception.';
          }
        }
        if ( _mensaje.name !== 'SyntaxError' ) {
          var _texto = 'Titulo: "' + _mensaje[0].Title+ '"\n\nComentario: "' + _mensaje[0].Comment+ '"\n\nPregunta: "'+ _mensaje[0].Text.Question+ '"\n\nRespuesta: "' + _mensaje[0].Text.Answer + '"';
          $('#example_dest_' + nExample ).text( _texto );
          _end.state = 'success';
          _end.message = 'Convirtiendo (#example_text_' + nExample + ') ' + _origen + '" a "' + _texto + '"';
        } else {
          _end.state = 'error';
          _end.message = _mensaje.message;
        }
      } else {
        _end.state = 'warning';
        _end.message = '#example_text_' + nExample + ' has 0 length.';
      }
      break;
    default:
      _end.state = 'error';
      _end.message = '#example_text_' + nExample + ' is ' + jQuery.type(_origen);
  }

  switch (_end.state) {
    case 'success':
      console.info ( _end.message );
      $('#example_'+nExample+' .alert').addClass('alert-success fade in').show().html('<strong>Success</strong>: ' + _end.message);
      break;
    case 'warning':
      console.warn ( _end.message );
      $('#example_'+nExample+' .alert').addClass('alert-warning fade in').show().html('<strong>Warning</strong>: ' + _end.message);
      break;
    case 'error':
      console.error ( _end.message );
      $('#example_'+nExample+' .alert').addClass('alert-error fade in').show().html('<strong>Error</strong>: ' + _end.message);
      break;
    case 'not_begun':
      console.error ( _end.message );
      $('#example_'+nExample+' .alert').addClass('alert-error fade in').show().html('<strong>Error</strong>: ' + _end.message);
      break;
    default:
      console.error ( 'Undefined error!' );
      $('#example_'+nExample+' .alert').addClass('alert-error fade in').show().html('<strong>Error</strong>: Undefined error!');
  }


}

$('#button_example_1').click ( function () {parseExample(1);} );
$('#button_example_2').click ( function () {parseExample(2);} );
$('#button_example_3').click ( function () {parseExample(3);} );
$('#button_example_4').click ( function () {parseExample(4);} );
$('#button_example_extra').click ( function () {parseExample('extra');} );


/*
$('#text1').change ( function() {
  alert ( 'Cambio a: ' + $(this).text() );
});
*/
