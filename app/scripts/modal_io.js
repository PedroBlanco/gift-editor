/* jshint ignore: start */
/* jshint camelcase: false */
/* jslint multistr: true */
'use strict';


var asignar_datos_a_modal = function asignar_datos_a_modal ( _selector, _name, _type )
{
  if ( MODAL_DEBUG ) { console.debug ( '...Asignando de ' + _selector + ' a ' + _name ); }

  $( '#modal-' + _name ).attr ( 'target', '#' + _selector );

  $('#form-' + _name + '-comment').val(
    $('#' + _selector).find('p.question-comment').text()
  );
  $('#form-' + _name + '-title').val(
    $('#' + _selector).find('span.question-title').text()
  );

  switch ( _type ) {
    case 'description':
      $('#form-' + _name + '-text').val(
        $('#' + _selector).find('p[name="question-text"]').text()
      );
    break;
    case 'essay':
      $('#form-' + _name + '-text').val(
        $('#' + _selector).find('p[name="question-text"]').text()
      );
    break;
    case 'numeric-range':
      $('#form-' + _name + '-text').val(
        $('#' + _selector).find('p[name="question-text"]').text()
      );
      $('#form-' + _name + '-answer-begin').val(
        $('#' + _selector).find('input[name="first"]').val()
      );
      $('#form-' + _name + '-answer-finish').val(
        $('#' + _selector).find('input[name="second"]').val()
      );
    break;
    case 'numeric-tolerance':
      $('#form-' + _name + '-text').val(
        $('#' + _selector).find('p[name="question-text"]').text()
      );
      $('#form-' + _name + '-answer').val(
        $('#' + _selector).find('input[name="first"]').val()
      );
      $('#form-' + _name + '-radius').val(
        $('#' + _selector).find('input[name="second"]').val()
      );
    break;
    case 'true-false':
      $('#form-' + _name + '-text').val(
        $('#' + _selector).find('p[name="question-text"]').text()
      );
      if ( $('#' + _selector).find('input[name="optradio"]:checked').val()
 === 'T' ) {
        $('#form-' + _name + '-optradio1').prop('checked', true);
      } else {
        $('#form-' + _name + '-optradio2').prop('checked', true);
      }
    break;
    default:
      // Si no somos capaces de detectar la pregunta antes de mostrar un modal, tal vez deberíamos parar y mostrar un error
  }
}

var asignar_datos_desde_modal = function asignar_datos_desde_modal ( _name, _type )
{
  var _q = {
    Comment: [$('#form-' + _name + '-comment').val()],
    Title: $('#form-' + _name + '-title').val(),
    Text: {
      Question: $('#form-' + _name + '-text').val(),
      Answer: '' // FIXME-TEMPORAL
    }
  };

  switch ( _type ) {
    case 'description':
      _q.Text.Question = $('#form-' + _name + '-text').val();
      _q.Text.Answer = '';
    break;
    case 'essay':
      _q.Text.Question = $('#form-' + _name + '-text').val();
      _q.Text.Answer = '{}';
    break;
    case 'true-false':
      _q.Text.Question = $('#form-' + _name + '-text').val();
      _q.Text.Answer = '{' + $('#form-' + _name + ' input[name="optradio"]:checked').val() + '}';
    break;
    case 'numeric-range':
      _q.Text.Question = $('#form-' + _name + '-text').val();
      // console.debug ( 'Begin: ' + '#form-' + _name + '-answer-begin');
      // console.debug ( 'Finish: ' + '#form-' + _name + '-answer-finish');
      _q.Text.Answer = '{#' + $('#form-' + _name + '-answer-begin').val() + '..' + $('#form-' + _name + '-answer-finish').val() + '}';
    break;
    case 'numeric-tolerance':
      _q.Text.Question = $('#form-' + _name + '-text').val();
      // console.debug ( 'Answer: ' + '#form-' + _name + '-answer');
      // console.debug ( 'Radius: ' + '#form-' + _name + '-radius');
      _q.Text.Answer = '{#' + $('#form-' + _name + '-answer').val() + ':' + $('#form-' + _name + '-radius').val() + '}';
    break;
    default:
      // Si no somos capaces de detectar la pregunta desde el modal, creamos una pregunta tipo descripción
      _q.Text.Question = $('#form-' + _name + '-text').val();
      _q.Text.Answer = '';

  }

  if ( MODAL_DEBUG ) {
    $('[id|="form-' + _name + '"]').each (function(){
      console.debug ( $(this).attr('id') + '->' + $(this).val() );
    });
  }

  if ( MODAL_DEBUG ) { console.debug ( 'Asignando...' + JSON.stringify (_q) ); }

  return _q;
}

var limpiar_formulario = function limpiar_formulario ( _name )
{
  if ( MODAL_DEBUG ) { console.debug ( 'Limpiando #form-' + _name ); }
  // Limpiamos el formulario
  $('#form-' + _name + ' input').each(function(){
    if ( $(this).attr('type') === 'radio' ) {
      $(this).prop('checked', false);
    } else {
      $(this).val('');
    }
  });

  //TODO: Limpiar el resto de los datos (radios, checkboxes, ...)
}
