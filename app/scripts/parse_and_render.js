/* _jshint ignore: start */
/* jshint camelcase: false */
/* jshint multistr: false */
'use strict';


var parseText = function parseText ( selectorText, _dest )
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
            // $('#test_destination' ).text( _texto );
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


var render_individual_question = function render_individual_question ( _q )
{
  var _dest = ''

  // Fix #41 - No es problema del parser
  _q.Title = _q.Title.replace(/(\r\n|\n|\r)/gm,' ').trim();
  if ( _q.Text.Question instanceof Array ) {
    for (var i in _q.Text.Question ){
      _q.Text.Question[i] = _q.Text.Question[i].replace(/(\r\n|\n|\r)/gm,' ').trim();
    }
  } else {
    _q.Text.Question = _q.Text.Question.replace(/(\r\n|\n|\r)/gm,' ').trim();
  }
  _q.Text.Answer = _q.Text.Answer.replace(/(\r\n|\n|\r)/gm,' ');

  var q_detected = detect_question_type ( _q );
  switch (q_detected.type) {
    case 'description':
        if ( PARSE_DEBUG ) {  console.log ('*** Description: ' + _q.Title + '/' + _q.Text.Question  );    }
        _dest =  render_description ( _q, q_detected );
      break;
    case 'essay':
        if ( PARSE_DEBUG ) {  console.log ('*** Essay: ' + _q.Title + '/' + _q.Text.Question  );    }
        _dest =  render_essay ( _q, q_detected );
      break;
    case 'true-false':
        if ( PARSE_DEBUG ) {  console.log ('*** (' + q_detected.answer[0] + '): ' + _q.Title + '/' + _q.Text.Question );    }
        _dest =  render_true_false ( _q, q_detected );
      break;
    case 'numeric-tolerance':
        if ( PARSE_DEBUG ) {  console.log ('*** Tolerance: ' + _q.Title + '/' + _q.Text.Question + ' = ' + q_detected.answer[0] + '+-' + q_detected.answer[1] ); }
        _dest =  render_numeric ( _q, q_detected );
      break;
    case 'numeric-range':
        if ( PARSE_DEBUG ) {  console.log ('*** Range: ' + _q.Title + '/' + _q.Text.Question + ' = ' + q_detected.answer[0] + ' to ' + q_detected.answer[1] ); }
        _dest =  render_numeric ( _q, q_detected );
      break;
    case 'matching':
        if ( PARSE_DEBUG ) {  console.log ('*** Matching: ' + _q.Title + '/' + _q.Text.Question + ' = ' + JSON.stringify ( q_detected.answer) ) ; }
        _dest =  render_matching ( _q, q_detected );
      break;
    case 'fill-blank-start':
    case 'fill-blank-middle':
    case 'fill-blank-end':
        if ( PARSE_DEBUG ) {  console.log ('*** Fill-blank: ' + _q.Title + '/' + JSON.stringify (_q.Text.Question) + ' = ' + JSON.stringify ( q_detected.answer) ) ; }
        _dest =  render_fill_blank ( _q, q_detected );
      break;
    case 'multiple-choice-single-answer':
      if ( PARSE_DEBUG ) {  console.log ('*** multiple-choice-single-answer: ' + _q.Title + '/' + JSON.stringify (_q.Text.Question) + ' = ' + JSON.stringify ( q_detected.answer) ) ; }
      _dest =  render_multiple_choice_single_answer ( _q, q_detected );
    break;
    case 'multiple-choice-multiple-answer':
      if ( PARSE_DEBUG ) {  console.log ('*** multiple-choice-multiple-answer: ' + _q.Title + '/' + JSON.stringify (_q.Text.Question) + ' = ' + JSON.stringify ( q_detected.answer) ) ; }
      _dest =  render_multiple_choice_multiple_answer ( _q, q_detected );
    break;
    default:
        if ( PARSE_DEBUG ) {  console.log ( '¿Type? ' + JSON.stringify ( q_detected ) ); }
        // TODO: show error or something
        _q.Title = 'UNKNOWN ' + _q.Title;
        _q.Comment = 'UNKNOWN ' + _q.Title;
        _q.Text.Question = 'UNKNOWN ' + _q.Text.Question;
        _dest =  render_description ( _q, q_detected );
  }

  return _dest;
}




var render_questions = function render_questions ( _qs, _dest )
/*
Fill_blank_middle   -> _qs => Array ( { Comment, Title, Text: { Question[2], Answer } )
Resto de preguntas  -> _qs => Array ( { Comment, Title, Text: { Question, Answer } )
Selector de destino -> _dest = '#accordion1' normalmente
*/
{
  if ( _dest === undefined ) {
    _dest = '#accordion1';
  }

  for ( var x in _qs ) {
    if ( PARSE_DEBUG ) {    console.log ( 'Rendering ('+x+'): ' + _qs[x].Title );    }

    $(_dest).append ( render_individual_question ( _qs[x] ) );

  }

  $( _dest ).accordion( 'refresh' );
}


var detect_question_type = function detect_question_type ( _q )
{
  var _detected = false;

  var _answer = _q.Text.Answer;
  var _result = {type:'unknown', answer: [] };

  // First, the easiest comparison, fill-blank-start or fill-blank-middle
  if ( _q.Text.Question && _q.Text.Question instanceof Array ) {
    if ( _q.Text.Question[0] === '' ) {
      _detected = true;
      _result.type = 'fill-blank-start';
      _result.answer = _q.Text.Answer.slice(1,-1).trim().slice(1).split( '=' );
      // console.debug ( 'DETECTED START: ' + JSON.stringify (_result.answer) + ' ' + _q.Text.Question[1] );
    } else {
      _detected = true;
      _result.type = 'fill-blank-middle';
      _result.answer = _q.Text.Answer.slice(1,-1).trim().slice(1).split( '=' );
      // console.debug ( 'DETECTED INLINE: ' + _q.Text.Question[0] + JSON.stringify (_result.answer) + ' ' + _q.Text.Question[1] );
    }
  } else {
    // console.debug ( '¿QUESTION? ' + _q.Text.Question );
    // questions_global.push (_q.Text.Question);
    // Then the simple and similar comparisons
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
  }

  if ( ! _detected ) {
    // Si no es una respuesta simple, eliminamos los '{' y '}' inicial y final para seguir parseando
    _answer = _q.Text.Answer.slice(1,-1).trim();
    if ( _answer.charAt(0) == '#') {
      // TODO: Detectar mediante
      //    ::Q7:: When was Ulysses S. Grant born? {#
      //    =1822:0      # Correct! Full credit.
      //    =%50%1822:2  # He was born in 1822. Half credit for being close.
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
    } else {
      // Los únicos tipos que nos quedan por detectar serían fill-blank-end y matching
      var _match_separated = _answer.match (/->/gm);
      if ( _match_separated && _match_separated.length >= 3 ) {
        // Para considerarse Matching, debe haber por lo menos 3 opciones (->)
        // Eliminamos el = primero para poder separar la respuesta mediante el resto de =
        _result.answer = _answer.slice(1).split( '=' );
        _result.type = 'matching';
        _detected = true;
      } else {
        var _f_pos = [];
        _f_pos[0] = _answer.indexOf('=');
        _f_pos[1] = _answer.indexOf('~');
        if ( _f_pos[1] === -1 ) {
          //Si no tiene el carácter ~ debe ser fill-blank-end
          _result.answer = _answer.slice(1).split( '=' );
          _result.type = 'fill-blank-end';
          _detected = true;
        } else if ( _f_pos[0] === -1 ) {
          // Si no tiene el el carácter = debe ser una multiple-choice-multiple-answer con sólo ~
          // Cada elemento del array devuelto, es otro array con la puntuación en el primer elemento y la respuesta en el segundo
          var _partial_answers = _answer.slice(1).split( '~' );
          var _separated_partial_answers;
          _result.answer = [];

          for (var i in _partial_answers) {
            _separated_partial_answers = _partial_answers[i].trim().slice(1).split('%');
            _result.answer.push ( _separated_partial_answers );
          }

          _result.type = 'multiple-choice-multiple-answer';
          _detected = true;
        } else {
          // Teniendo 1 = (FIXME:suponemos que sólo hay 1...) y varios ~ es una multiple-choice-single-answer
          // Devolveremos un array en el que la última respuesta es la correcta

          // Primero separo por =
          var _first_split;
          var _correct_answer;
          var _incorrect_answers;
          var _mixed_chunks;

          if ( _f_pos[0] === 0 ) {
            // Si la respuesta correcta es la primera, separamos e invertimos el array
            _first_split = _answer.slice(1).split('~');
            _result.answer = _first_split.reverse();
          } else {
            _first_split = _answer.slice(1).split( '=' );
            _incorrect_answers = _first_split[0].split('~');
            _mixed_chunks = _first_split[1].split('~');
            if ( _mixed_chunks.length === 1 ) {
              // Como en _mixed_chunks sólo está la pregunta correcta, la concatenamos a las incorrectas y terminamos
              console.log ( '// Como en _mixed_chunks sólo está la pregunta correcta, la concatenamos a las incorrectas y terminamos: ' + JSON.stringify ( _mixed_chunks ) + ' -> ' + JSON.stringify ( _first_split ) );
              _result.answer = _incorrect_answers.concat ( _mixed_chunks );
            } else {
              // En este caso, la respuesta correcta es siempre la primera de _mixed_chunks
              _correct_answer = _mixed_chunks.shift();
              // Añadimos las respuestas incorrectas
              _result.answer = _incorrect_answers.concat ( _mixed_chunks );
              // Para añadir finalmente la respuesta correcta
              _result.answer.push ( _correct_answer );
            }
          }
          _result.type = 'multiple-choice-single-answer';
          _detected = true;
        }

        // TODO: ¿Hay alguna más?
        // console.debug ( '+++ END FILL BLANK - ' + JSON.stringify ( _q.Text.Question ) );
      }
    }
  }

  return _result;
}


var render_description = function render_description ( _q, _d )
{
  if ( PARSE_DEBUG ) {
    console.log ( '--- Rendering description _q: ' + JSON.stringify ( _q ) );
    console.log ( '--- Rendering description _d: ' + JSON.stringify ( _d ) );
  }

  var _rendered_question = {
    type: 'Descripción',
    detected_type: _d.type,
    title: _q.Title,
    comment: _q.Comment.join ( '<br/>'),
    html: '' };

  _rendered_question.html = '<form class="form-inline" role="form">';

  _rendered_question.html += '<div class="form-group form-group-sm">';
  _rendered_question.html +=  '<p class="form-control-static" name="question-text">' + _q.Text.Question + '</p><br/>';
  _rendered_question.html += '</div>';

  _rendered_question.html += '</form>';

  return new_accordion_question ( _rendered_question );
}


var render_essay = function render_essay ( _q, _d )
{
  if ( PARSE_DEBUG ) {
    console.log ( '--- Rendering essay' );
  }

  var _rendered_question = {
    type: 'Redacción',
    detected_type: _d.type,
    title: _q.Title,
    comment: _q.Comment.join ( '<br/>'),
    html: '' };

  _rendered_question.html = '<form class="form-inline" role="form">';

  _rendered_question.html += '<div class="form-group form-group-sm">';
  _rendered_question.html +=  '<p class="form-control-static" name="question-text">' + _q.Text.Question + '</p><br/>';
  _rendered_question.html +=  '<textarea class="form-control" rows="5" disabled></textarea>';
  _rendered_question.html += '</div>';

  _rendered_question.html += '</form>';

  return new_accordion_question ( _rendered_question );
}


var render_true_false = function render_true_false ( _q, _d )
{
  if ( PARSE_DEBUG ) {
    console.log ( '--- Rendering true/false' );
  }

  var _rendered_question = {
    type: 'Verdadero/Falso',
    detected_type: _d.type,
    title: _q.Title,
    comment: _q.Comment.join ( '<br/>'),
    html: '' };

  _rendered_question.html = '<form class="form-inline" role="form">';

  _rendered_question.html += '<div class="form-group form-group-sm">';
  _rendered_question.html +=  '<p class="form-control-static" name="question-text">' + _q.Text.Question + '</p><br/>';
  _rendered_question.html +=  '<div class="radio" value="'+_d.answer+'">';
  _rendered_question.html +=   '<input type="radio" name="optradio" value="T" ' +
                                ((_d.answer=='T')?'checked="checked"':'disabled') + '>';
  _rendered_question.html +=   '<label class="control-label">Verdadero</label>';
  _rendered_question.html +=   '<br/>';
  _rendered_question.html +=   '<input type="radio" name="optradio" value="F" ' +
                                ((_d.answer=='F')?'checked="checked"':'disabled') + '>';
  _rendered_question.html +=   '<label class="control-label">Falso</label>';
  _rendered_question.html +=  '</div>';
  _rendered_question.html += '</div>';

  _rendered_question.html += '</form>';

  return new_accordion_question ( _rendered_question );
}


var render_numeric = function render_numeric ( _q, _d )
{
  if ( PARSE_DEBUG ) {
    console.log ( '--- Rendering numeric ' + _d.type );
  }

  var _rendered_question = {
    type: ( ( _d.type == 'numeric-tolerance')?'Tolerancia numérica':'Rango numérico'),
    detected_type: _d.type,
    title: _q.Title,
    comment: _q.Comment.join ( '<br/>'),
    html: '' };

  _rendered_question.html = '<form class="form-inline" role="form">';

  _rendered_question.html += '<div class="form-group form-group-sm">';
  _rendered_question.html +=  '<p class="form-control-static" name="question-text">' + _q.Text.Question + '</p><br/>';
  _rendered_question.html +=  '<label class="control-label">';
  _rendered_question.html +=  ( _d.type === 'numeric-tolerance')?'':'Desde&nbsp;';
  _rendered_question.html +=  '<input class="form-control" type="number" name="first" value="' + _d.answer[0] + '" disabled/>';
  _rendered_question.html +=  '</label>';
  _rendered_question.html +=  '<label class="control-label">';
  _rendered_question.html +=  ( _d.type === 'numeric-tolerance')?'&nbsp;con una toleracia de&nbsp;':'&nbsp;hasta&nbsp;';
  _rendered_question.html +=  '<input class="form-control" type="number" name="second" value="' + _d.answer[1] + '" disabled/>';
  _rendered_question.html +=  '</label>';
  _rendered_question.html += '</div>';

  _rendered_question.html += '</form>';

  return new_accordion_question ( _rendered_question );
}


var render_matching = function render_matching ( _q, _d )
{
  if ( PARSE_DEBUG ) {
    console.log ( '--- Rendering matching' );
  }

  var _rendered_question = {
    type: 'Emparejar',
    detected_type: _d.type,
    title: _q.Title,
    comment: _q.Comment.join ( '<br/>'),
    html: '' };

  _rendered_question.html = '<form class="form-inline" role="form">';
  _rendered_question.html += '<div class="form-group form-group-sm">';
  _rendered_question.html +=  '<p class="form-control-static" name="question-text">' + _q.Text.Question + '</p><br/>';

  var _split_pair;
  for ( var _pair in _d.answer ) {
    _split_pair = _d.answer[_pair].split('->');
    _rendered_question.html +=  '<div name="pair">';
    _rendered_question.html +=   '<input class="form-control" type="text" value="' + $.trim( _split_pair[0] ) + '" name="first" disabled/>';
    _rendered_question.html +=   '<span class="glyphicon glyphicon-arrow-right" aria-hidden="true" name= "match-separator"></span>';
    _rendered_question.html +=   '<input class="form-control" type="text" value="' + $.trim( _split_pair[1] ) + '" name="second" disabled/>';
    _rendered_question.html +=  '</div>';
    _rendered_question.html +=  '<hr/>';
  }
  _rendered_question.html += '</div>';
  _rendered_question.html += '</form>';

  return new_accordion_question ( _rendered_question );
}


var render_multiple_choice_single_answer = function render_multiple_choice_single_answer ( _q, _d )
{
  if ( PARSE_DEBUG ) {
    console.log ( '--- Rendering multiple-choice-single-answer' );
  }

  var _rendered_question = {
    type: 'Una respuesta a elegir',
    detected_type: _d.type,
    title: _q.Title,
    comment: _q.Comment.join ( '<br/>'),
    html: '' };

  _rendered_question.html = '<form class="form-inline" role="form">';
  _rendered_question.html += '<div class="form-group form-group-sm">';
  _rendered_question.html +=  '<p class="form-control-static" name="question-text">' + _q.Text.Question + '</p><br/>';

  var _correct = _d.answer.pop();
  for ( var i in _d.answer ) {
    _rendered_question.html +=  '<div name="single-answer">';
    _rendered_question.html +=   '<span class="glyphicon glyphicon-remove text-danger"></span>&nbsp;&nbsp;&nbsp;';
    _rendered_question.html +=   '<span class="form-control-static" name="incorrect-answer">';
    _rendered_question.html += $.trim(_d.answer[i]) + '</span>';
    _rendered_question.html +=  '</div>';
  }
  _rendered_question.html +=  '<div name="single-answer">';
  _rendered_question.html +=   '<span class="glyphicon glyphicon-ok text-success"></span>&nbsp;&nbsp;&nbsp;';
  _rendered_question.html +=   '<span class="form-control-static" name="correct-answer">';
  _rendered_question.html += $.trim(_correct) + '</span>';
  _rendered_question.html +=  '</div>';


  _rendered_question.html += '</div>';
  _rendered_question.html += '</form>';

  return new_accordion_question ( _rendered_question );
}


var render_multiple_choice_multiple_answer = function render_multiple_choice_multiple_answer ( _q, _d )
{
  if ( PARSE_DEBUG ) {
    console.log ( '--- Rendering multiple-choice-multiple-answer' );
  }

  var _rendered_question = {
    type: 'Varias respuesta a elegir',
    detected_type: _d.type,
    title: _q.Title,
    comment: _q.Comment.join ( '<br/>'),
    html: '' };

  _rendered_question.html = '<form class="form-inline" role="form">';
  _rendered_question.html += '<div class="form-group form-group-sm">';
  _rendered_question.html +=  '<p class="form-control-static" name="question-text">' + _q.Text.Question + '</p><br/>';

  for ( var i in _d.answer ) {
    _rendered_question.html +=  '<div name="partial-answer">';
    _rendered_question.html +=   '<span class="form-control-static" name="answer-percentage">';
    _rendered_question.html +=   $.trim(_d.answer[i][0]) + '</span>%';
    _rendered_question.html +=   '&nbsp;&nbsp;<span class="glyphicon glyphicon-arrow-right">&nbsp;&nbsp;';
    _rendered_question.html +=   '<span class="form-control-static" name="answer-text">';
    _rendered_question.html +=   $.trim(_d.answer[i][1]) + '</span>';
    _rendered_question.html +=  '</div>';
  }

  _rendered_question.html += '</div>';
  _rendered_question.html += '</form>';

  return new_accordion_question ( _rendered_question );
}


var render_fill_blank = function render_fill_blank ( _q, _d )
{
  if ( PARSE_DEBUG ) {
    console.log ( '--- Rendering fill blank - ' + JSON.stringify ( _q.Text.Question ) );
  }

  var _rendered_question = {
    type: 'Hueco',
    detected_type: _d.type,
    title: _q.Title,
    comment: _q.Comment.join ( '<br/>'),
    html: '' };

  _rendered_question.html = '<form class="form-inline" role="form">';
  _rendered_question.html += '<div class="form-group form-group-sm">';

  // console.debug ( '+++ ' +  _d.type + ' - ' + JSON.stringify ( _q.Text.Question ) );

  switch ( _d.type ) {
  case 'fill-blank-start':
    for ( var _x in _d.answer ) {
      // console.debug ( 'START: ' + _d.answer[_x] + ' ' + _q.Text.Question[1] );
      _rendered_question.html +=  '<input class="form-control" type="text" value="' + _d.answer[_x] + '" name="blank" disabled/>';
    }
    _rendered_question.html +=  '<span class="form-control-static" name="question-text">' + _q.Text.Question[1] + '</span>';
    break;
  case 'fill-blank-middle':
    _rendered_question.html +=  '<span class="form-control-static" name="question-text-first">' + _q.Text.Question[0] + '</span>';
    for ( var _x in _d.answer ) {
      // console.debug ( 'INLINE ' + _q.Text.Question[0] + _d.answer[_x] + ' ' + _q.Text.Question[1] );
      _rendered_question.html +=  '<input class="form-control" type="text" value="' + _d.answer[_x] + '" name="blank" disabled/>';
    }
    _rendered_question.html +=  '<span class="form-control-static" name="question-text-second">' + _q.Text.Question[1] + '</span>';
    break;
  case 'fill-blank-end':
    _rendered_question.html +=  '<span class="form-control-static" name="question-text">' + _q.Text.Question + '</span>';
    for ( var _x in _d.answer ) {
      // console.debug ( 'END: ' + _q.Text.Question + ' ' + _d.answer[_x] );
      _rendered_question.html +=  '<input class="form-control" type="text" value="' + _d.answer[_x] + '" name="blank" disabled/>';
    }
    break;

    default:

  }

  _rendered_question.html += '</div>';
  _rendered_question.html += '</form>';

  // for ( var _c in _q.Comment ) {
  //   console.debug ( '+++ Comentario: ' + _q.Comment[_c] );
  // }

  return new_accordion_question ( _rendered_question );
}


var new_accordion_question = function new_accordion_question ( _rq )
{
  var _new_question = $(
    '<div class="group" id="' + _uniqueId ( '_question' ) + '" question-type="' + _rq.detected_type + '">' +
      '<div class="acc_title">' +
        // '<span class="label label-default question-type" value="' + _rq.detected_type + '">'+ _rq.type + '</span>' +
// No podemos usar un checkbox de marca en el título porque el evento al pinchar lo recibe el acordeón y no el checkbox...
//        '<input type="checkbox" class="question-selected-mark" name="question-selected" value="">' +
        '&nbsp;<span class="question-title">' + _rq.title + '</span><br>' +
        '&nbsp;<span class="question-type" value="' + _rq.detected_type + '">Tipo: ' + _rq.type + '</span>' +
      '</div>' +
      '<div class="question-details">' +
        '<div class="question-operations">' +
          '<div class="btn-group btn-group-justified">' +
            '<div class="btn-group">' +
              '<button type="button" class="btn btn-info edit-question-' + _rq.detected_type + '"><span class="glyphicon glyphicon-pencil"></span>&nbsp;Editar</button>' +
            '</div>' +
            '<div class="btn-group">' +
              '<button type="button" class="btn btn-danger remove-question"><span class="glyphicon glyphicon-remove"></span>&nbsp;Eliminar</button>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<br/><p class="text-info question-comment">' + _rq.comment + '</p><br/>' +
        '<div class="question-body">' + _rq.html + '</div>' +
      '</div>' +
    '</div>'
  );

  return _new_question;
}


// Visto en http://stackoverflow.com/a/14044646
var idCounter = 0;
var _uniqueId = function _uniqueId ( prefix )
{
  var id = '' + ++idCounter;
  return prefix ? prefix + id : id;
};
