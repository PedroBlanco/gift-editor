/* _jshint ignore: start */
/* jshint camelcase: false */
/* jshint multistr: false */
'use strict';

// var PARSE_DEBUG = true;
var PARSE_DEBUG = false;

if ( PARSE_DEBUG ) {
  var GROWL_DELAY = 0;
} else {
  var GROWL_DELAY = 3000;
}


if ( $('#text_gift_input' ).val() === '' ) {
  $('#text_gift_input' ).val( '// Tipo: description/instructions (not really a question)\n::Descripción del examen::Este es un examen de prueba en el que no se pueden usar ni lápiz ni papel\n\n// Tipo essay\n::Opinión sobre texto de relleno::Escriba su opinión sobre si el texto de relleno llamado "Lorem ipsum dolor" debería actualizarse a\nlos tiempos o debería seguir intacto\n{}\n\n// Tipo: True/false\n::Lengua - codos::\n¿Puede usted llegar con su lengua a cualquiera de sus dos codos?\n{F}\n\n// Tipo: math tolerance question\n::Platos de un menú::¿Cuántos platos tiene un menú del día? {#2:1}\n\n// Tipo: math range question\n::Entre 3 y 7::Dígame un número entre 3 y 7 {#3..7}\n' );
}


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


function parseText ( selectorText, _dest )
{
  var _end = {'state':'not_begun', 'message':'Parsing not begun.'};
  var _origen = $(selectorText).val().trim();

  // Fixes #2
  _origen += '\n\n';
  if ( PARSE_DEBUG ) {
    console.debug ('Texto a parsear: ' + _origen );
  }
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
            if ( PARSE_DEBUG ) {
              console.error ('SyntaxError exception: ' + _mensaje.message );
            }
            throw 'SyntaxError exception: ' + _mensaje.message;
          } else {
            if ( PARSE_DEBUG ) {
              console.error ('Unknown exception: ' + e );
            }
            throw 'Unknown exception: ' + e;
          }
        }
        if ( _mensaje.name !== 'SyntaxError' ) {
          if ( PARSE_DEBUG ) {
            var _texto = 'Titulo: "' + _mensaje[0].Title+ '"\n\nComentario: "' + _mensaje[0].Comment+ '"\n\nPregunta: "'+ _mensaje[0].Text.Question+ '"\n\nRespuesta: "' + _mensaje[0].Text.Answer + '"';
          // Mostramos la primera pregunta para asegurarnos que está todo bien
            $('#test_destination' ).text( _texto );
            _end.message = 'Converting (' + selectorText + ') ' + _origen + '" to "' + _texto + '"';
          } else {
            _end.message = 'Correct parsing &nbsp;&nbsp;&nbsp;&nbsp;';
          }
          _end.state = 'success';
          // Creamos las preguntas como elementos
          render_questions ( _mensaje, _dest );
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
      if ( PARSE_DEBUG ) {      console.info ( _end.message );    }
      $.bootstrapGrowl( '<strong>Success</strong>: ' + _end.message, {
        type: 'info',
        align: 'center',
        width: 'auto',
        delay: GROWL_DELAY
      } );
      break;
    case 'warning':
      if ( PARSE_DEBUG ) {      console.warn ( _end.message );    }
      $.bootstrapGrowl( '<strong>Warning</strong>: ' + _end.message, {
        type: 'danger',
        align: 'center',
        width: 'auto',
        delay: GROWL_DELAY
      } );
      break;
    case 'error':
    if ( PARSE_DEBUG ) {      console.error ( _end.message );    }
      $.bootstrapGrowl( '<strong>Error</strong>: ' + _end.message, {
        type: 'danger',
        align: 'center',
        width: 'auto',
        delay: GROWL_DELAY
      } );
      break;
    case 'not_begun':
    if ( PARSE_DEBUG ) {      console.error ( _end.message );    }
      $.bootstrapGrowl( '<strong>Error/Not begun</strong>: ' +  _end.message, {
        type: 'danger',
        align: 'center',
        width: 'auto',
        delay: GROWL_DELAY
      } );
      break;
    default:
    if ( PARSE_DEBUG ) {      console.error ( 'Undefined error!' );    }
      $.bootstrapGrowl( '<strong>Error</strong>: Undefined error!', {
        type: 'danger',
        align: 'center',
        width: 'auto',
        delay: GROWL_DELAY
      } );
  }
}


function render_questions ( _qs, _dest )
{
  if ( _dest === undefined ) {
  _dest = '#accordion1';
  }

  for ( var x in _qs ) {
    if ( PARSE_DEBUG ) {    console.log ( 'Rendering ('+x+'): ' + _qs[x].Title );    }
    var q_detected = detect_question_type ( _qs[x] );
    switch (q_detected.type) {
      case 'description':
          if ( PARSE_DEBUG ) {  console.log ('*** Description: ' + _qs[x].Title + '/' + _qs[x].Text.Question  );    }
          $(_dest).append ( render_description ( _qs[x], q_detected ) );
        break;
      case 'essay':
          if ( PARSE_DEBUG ) {  console.log ('*** Essay: ' + _qs[x].Title + '/' + _qs[x].Text.Question  );    }
          $(_dest).append ( render_essay ( _qs[x], q_detected ) );
        break;
      case 'true-false':
          if ( PARSE_DEBUG ) {  console.log ('*** (' + q_detected.answer[0] + '): ' + _qs[x].Title + '/' + _qs[x].Text.Question );    }
          $(_dest).append ( render_true_false ( _qs[x], q_detected ) );
        break;
      case 'numeric-tolerance':
          if ( PARSE_DEBUG ) {  console.log ('*** Tolerance: ' + _qs[x].Title + '/' + _qs[x].Text.Question + ' = ' + q_detected.answer[0] + '+-' + q_detected.answer[1] ); }
          $(_dest).append ( render_numeric ( _qs[x], q_detected ) );
        break;
      case 'numeric-range':
          if ( PARSE_DEBUG ) {  console.log ('*** Range: ' + _qs[x].Title + '/' + _qs[x].Text.Question + ' = ' + q_detected.answer[0] + ' to ' + q_detected.answer[1] ); }
          $(_dest).append ( render_numeric ( _qs[x], q_detected ) );
        break;
      default:
          if ( PARSE_DEBUG ) {  console.log ( '¿Type? ' + q_detected ); }
          // TODO: show error or something
    }
  }
  $( _dest ).accordion( 'refresh' );
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


function render_description ( _q, _d )
{
  if ( PARSE_DEBUG ) {
    console.log ( '--- Rendering description' );
  }

  var _rendered_question = {
    type: 'Descripción',
    title: _q.Title,
    html: '' };

  _rendered_question.html = '<form class="form-inline" role="form">';

  _rendered_question.html += '<div class="form-group form-group-sm">';
  _rendered_question.html +=  '<p class="form-control-static">' + _q.Text.Question + '</p><br/>';
  _rendered_question.html += '</div>';

  _rendered_question.html += '</form>';

  return new_accordion_question ( _rendered_question );
}


function render_essay ( _q, _d )
{
  if ( PARSE_DEBUG ) {
    console.log ( '--- Rendering essay' );
  }

  var _rendered_question = {
    type: 'Redacción',
    title: _q.Title,
    html: '' };

  _rendered_question.html = '<form class="form-inline" role="form">';

  _rendered_question.html += '<div class="form-group form-group-sm">';
  _rendered_question.html +=  '<p class="form-control-static">' + _q.Text.Question + '</p><br/>';
  _rendered_question.html +=  '<textarea class="form-control" rows="5" disabled></textarea>';
  _rendered_question.html += '</div>';

  _rendered_question.html += '</form>';

  return new_accordion_question ( _rendered_question );
}



function render_true_false ( _q, _d )
{
  if ( PARSE_DEBUG ) {
    console.log ( '--- Rendering true/false' );
  }

  var _rendered_question = {
    type: 'Verdadero/Falso',
    title: _q.Title,
    html: '' };

  _rendered_question.html = '<form class="form-inline" role="form">';

  _rendered_question.html += '<div class="form-group form-group-sm">';
  _rendered_question.html +=  '<p class="form-control-static">' + _q.Text.Question + '</p><br/>';
  _rendered_question.html +=  '<div class="radio">';
  _rendered_question.html +=   '<input type="radio" name="optradio1"' + ((_d.answer=='T')?' checked="checked"':'') + '>';
  _rendered_question.html +=   '<label class="control-label" for="optradio1">Verdadero</label>';
  _rendered_question.html +=   '<br/>';
  _rendered_question.html +=   '<input type="radio" name="optradio2"' + ((_d.answer=='F')?' checked="checked"':'') + '>';
  _rendered_question.html +=   '<label class="control-label" for="optradio2">Falso</label>';
  _rendered_question.html +=  '</div>';
  _rendered_question.html += '</div>';

  _rendered_question.html += '</form>';

  return new_accordion_question ( _rendered_question );
}



function render_numeric ( _q, _d )
{
  if ( PARSE_DEBUG ) {
    console.log ( '--- Rendering numeric ' + _d.type );
  }

  var _rendered_question = {
    type: ( ( _d.type == 'numeric-tolerance')?'Tolerancia numérica':'Rango numérico'),
    title: _q.Title,
    html: '' };

  _rendered_question.html = '<form class="form-inline" role="form">';

  _rendered_question.html += '<div class="form-group form-group-sm">';
  _rendered_question.html +=  '<p class="form-control-static">' + _q.Text.Question + '</p><br/>';
  _rendered_question.html +=  '<label class="control-label" for="first">';
  _rendered_question.html +=  ( _d.type == 'numeric-tolerance')?'':'Desde';
  _rendered_question.html +=  '</label>';
  _rendered_question.html +=  '<input class="form-control" type="number" id="first" value="' + _d.answer[0] + '"/>';
  _rendered_question.html +=  '<label class="control-label" for="second">';
  _rendered_question.html +=  ( _d.type == 'numeric-tolerance')?'con una toleracia de':'hasta';
  _rendered_question.html +=  '</label>';
  _rendered_question.html +=  '<input class="form-control" type="number" id="second" value="' + _d.answer[1] + '"/>';
  _rendered_question.html += '</div>';

  _rendered_question.html += '</form>';

  return new_accordion_question ( _rendered_question );
}


function new_accordion_question ( _rq )
{
  var _new_question = $('<div class="group"><div class="acc_title"><span>' +  _rq.title + '</span><span class="pull-right label label-default">'+ _rq.type + '</span></div><div>' + _rq.html + '</div></div>' );

  return _new_question;
}



/*
for ( x in preguntas ) {

    $('<div>', {class='group'} ).appendTo('#accordion');
    var _nueva = $(''

    // ver http://stackoverflow.com/a/10619477
}
*/
