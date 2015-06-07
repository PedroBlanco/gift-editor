'use strict';

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
