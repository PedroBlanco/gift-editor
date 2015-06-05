/* _jshint ignore: start */
/* jshint camelcase: false */
'use strict';

$('#button_gift_input').click( function () {
  try {
    parseText('#text_gift_input');
  } catch ( myException ) {
    console.error ('Exception caught: ' + myException );
    $.bootstrapGrowl( '<strong>Exception caught</strong>: ' +  myException, {
      type: 'danger',
      align: 'center',
      width: 'auto'
    } );
  }
} );


function parseText ( selectorText )
{
  var _end = {'state':'not_begun', 'message':'Parsing not begun.'};
  var _origen = $(selectorText).val();
  console.debug ('Texto a parsear: ' + _origen );
  switch (jQuery.type(_origen)) {
    case 'undefined':
    _end.state = 'error';
    _end.message = selectorText + ' is undefined.' ;
      break;
    case 'null':
    _end.state = 'error';
    _end.message = selectorText + ' is null.';
      break;
    case 'string':
      if (_origen.length > 0) {
        var _mensaje;
        try {
          _mensaje = peg_parser.parse (_origen );
        } catch (e) {
          if (e instanceof SyntaxError) {
            console.error ('SyntaxError exception: ' + _mensaje.message );
            throw 'SyntaxError exception: ' + _mensaje.message;
          } else {
            console.error ('Unknown exception: ' + e );
            throw 'Unknown exception: ' + e;
          }
        }
        if ( _mensaje.name !== 'SyntaxError' ) {
          var _texto = 'Titulo: "' + _mensaje[0].Title+ '"\n\nComentario: "' + _mensaje[0].Comment+ '"\n\nPregunta: "'+ _mensaje[0].Text.Question+ '"\n\nRespuesta: "' + _mensaje[0].Text.Answer + '"';
          // Mostramos la primera pregunta para asegurarnos que está todo bien
          $('#test_destination' ).text( _texto );
          // Creamos las preguntas como elementos
          render_questions ( _mensaje );
          _end.state = 'success';
          _end.message = 'Convirtiendo (' + selectorText + ') ' + _origen + '" a "' + _texto + '"';
        } else {
          _end.state = 'error';
          _end.message = _mensaje.message;
        }
      } else {
        _end.state = 'warning';
        _end.message = selectorText + ' has 0 length.';
      }
      break;
    default:
      _end.state = 'error';
      _end.message = selectorText + ' is ' + jQuery.type(_origen);
  }

  switch (_end.state) {
    case 'success':
      console.info ( _end.message );
      $.bootstrapGrowl( '<strong>Success</strong>: ' + _end.message, {
        type: 'info',
        align: 'center',
        width: 'auto'
      } );
      break;
    case 'warning':
      console.warn ( _end.message );
      $.bootstrapGrowl( '<strong>Warning</strong>: ' + _end.message, {
        type: 'danger',
        align: 'center',
        width: 'auto'
      } );
      break;
    case 'error':
      console.error ( _end.message );
      $.bootstrapGrowl( '<strong>Error</strong>: ' + _end.message, {
        type: 'danger',
        align: 'center',
        width: 'auto'
      } );
      break;
    case 'not_begun':
      console.error ( _end.message );
      $.bootstrapGrowl( '<strong>Error/Not begun</strong>: ' +  _end.message, {
        type: 'danger',
        align: 'center',
        width: 'auto'
      } );
      break;
    default:
      console.error ( 'Undefined error!' );
      $.bootstrapGrowl( '<strong>Error</strong>: Undefined error!', {
        type: 'danger',
        align: 'center',
        width: 'auto'
      } );
  }


}

function render_questions ( _qs, _dest = '' ) {
  for ( var x in _qs ) {
    // console.log ( 'Rendering ('+x+'): ' + _q[x].Title );
    var q_detected = detect_question_type ( _qs[x] );
    switch (q_detected.type) {
      case 'description':
          console.log ('*** Description: ' + _qs[x].Title + '/' + _qs[x].Text.Question  );
        break;
      case 'essay':
        console.log ('*** Essay: ' + _qs[x].Title + '/' + _qs[x].Text.Question  );
        break;
      case 'true-false':
          console.log ('*** (' + q_detected.answer[0] + '): ' + _qs[x].Title + '/' + _qs[x].Text.Question );
        break;
      case 'numeric-tolerance':
          console.log ('*** Tolerance: ' + _qs[x].Title + '/' + _qs[x].Text.Question + ' = ' + q_detected.answer[0] + '+-' + q_detected.answer[1] );
        break;
      case 'numeric-range':
      console.log ('*** Range: ' + _qs[x].Title + '/' + _qs[x].Text.Question + ' = ' + q_detected.answer[0] + ' to ' + q_detected.answer[1] );
        break;
      default:
          console.log ( '¿Type? ' + q_detected );
    }
  }
}

function detect_question_type ( _q )
{
  var _detected = false;

  var _answer = _q.Text.Answer;
  var _result = {type:'unknown', answer: [] };

  switch ( _answer  ) {
    case '':
        _result.type = 'description';
        _detected = true;
      break;
    case '{}':
        _result.type = 'essay';
        _detected = true;
      break;
    case '{T}':
    case '{F}':
        _result.type = 'true-false';
        _result.answer[0] = _answer.slice(1,-1);
        _detected = true;
      break;
  }

  if ( ! _detected ) {
    // Si no es una respuesta simple, eliminamos los '{' y '}' inicial y final para seguir parseando
    _answer = _q.Text.Answer.slice(1,-1).trim();
    if ( _answer.charAt(0) == '#') {
      var _split_answer = _answer.split(':');
      if ( _split_answer.length == 2 ) {
        _result.answer[0] = _split_answer[0].slice(1);
        _result.answer[1] = _split_answer[1];
        _result.type = 'numeric-tolerance';
        _detected = true;
      } else {
        _split_answer = _answer.split('..');
        _result.answer[0] = _split_answer[0].slice(1);
        _result.answer[1] = _split_answer[1];
        _result.type = 'numeric-range';
        _detected = true;
      }
    } else if ( _answer ) {
      // Keep checking !!!
    }
  }

  return _result;
}


/*
for ( x in preguntas ) {

    $('<div>', {class='group'} ).appendTo('#accordion');
    var _nueva = $(''

    // ver http://stackoverflow.com/a/10619477
}
*/
