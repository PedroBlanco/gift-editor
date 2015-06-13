/* jshint ignore: start */
/* jshint camelcase: false */
/* jslint multistr: true */
'use strict';


var create_edit_matching_pair = function create_edit_matching_pair ( _name, _first, _second, _volatile )
{
  // FIXME: Para asegurarnos de que no vamos a coincidir el en id (1, 2 o 3), aumentamos _uniqueID...
  var _id = _uniqueId () + _uniqueId () + _uniqueId (); // El valor no importa que se pierda
  _id = _uniqueId ( 'form-' + _name + '-pair-');
  var _v_text = '';
  if ( _volatile ) {
    _v_text = 'volatile-field';
  } else {
    _v_text = '';
  }

  var _new_pair = '<div class="form-group ' + _v_text + ' matching-pair" id="' + _id + '">';
  _new_pair += '<input class="input-small" name="first" type="text" id="'+ _id;
  _new_pair += '-1" placeholder="" value="' + _first + '" required="required"/>';
  _new_pair += '&nbsp;<span class="glyphicon glyphicon-arrow-right" aria-hidden="true"></span>&nbsp;';
  _new_pair += '<input class="input-small" name="second" type="text" id="'+ _id;
  _new_pair += '-2" placeholder="" value="' + _second + '" required="required"/>';

  if (_volatile ) {
    _new_pair += '&nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-trash remove-pair" aria-hidden="true"></span>';
  }
  _new_pair += '</div><hr class="' + _v_text + '">';

  console.log ( 'Creando nueva pareja ( ' + _name + ', ' + _first + ', ' + _second + ', ' + _volatile + ' )');

  $('#form-' + _name + '-new-pair').before( _new_pair );
}

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
      if ( $('#' + _selector).find('input[name="optradio"]:checked').val() === 'T' ) {
        $('#form-' + _name + '-optradio1').prop('checked', true);
      } else {
        $('#form-' + _name + '-optradio2').prop('checked', true);
      }
    break;
    case 'matching':
      $('#form-' + _name + '-text').val(
        $('#' + _selector).find('p[name="question-text"]').text()
      );
      var _n_p = 1;
      $('#' + _selector + ' input[name="first"]' ).each(function(){
        if ( _n_p > 3) {
          create_edit_matching_pair ( _name, $(this).val(), $(this).next().next().val(), true );
        } else {
          $('#form-' + _name + '-pair-' + _n_p + '-1').val( $(this).val() );
          $('#form-' + _name + '-pair-' + _n_p + '-2').val( $(this).next().next().val() );
        }
        _n_p++;
      });
    break;
    case 'fill-blank-start':
      $('#form-' + _name + '-void').val(
        $('#' + _selector).find('input[name="blank"]').val()
      );
      $('#form-' + _name + '-text').val(
        $('#' + _selector).find('span[name="question-text"]').text()
      );
    break;
    case 'fill-blank-middle':
      $('#form-' + _name + '-text-begin').val(
        $('#' + _selector).find('span[name="question-text-first"]').text()
      );
      $('#form-' + _name + '-text-finish').val(
        $('#' + _selector).find('span[name="question-text-second"]').text()
      );
      $('#form-' + _name + '-void').val(
        $('#' + _selector).find('input[name="blank"]').val()
      );
    break;
    case 'fill-blank-end':
      $('#form-' + _name + '-text').val(
        $('#' + _selector).find('span[name="question-text"]').text()
      );
      $('#form-' + _name + '-void').val(
        $('#' + _selector).find('input[name="blank"]').val()
      );
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
    case 'matching':
      _q.Text.Question = $('#form-' + _name + '-text').val();
      _q.Text.Answer = '{';
      $('#form-' + _name + ' div.matching-pair').each(function(){
        _q.Text.Answer += '=' + $(this).find('input[name="first"]').val();
        _q.Text.Answer += ' -> ' + $(this).find('input[name="second"]').val() + ' ';
      });
      _q.Text.Answer += '}';
      console.debug ( 'Matching answer: ' + JSON.stringify (_q.Text.Answer));
    break;
    case 'fill-blank-start':
      _q.Text.Question = ['', $('#form-' + _name + '-text').val()];
      _q.Text.Answer = '{=' + $('#form-' + _name + '-void').val() + '}';
    break;
    case 'fill-blank-middle':
      _q.Text.Question = [$('#form-' + _name + '-text-begin').val(), $('#form-' + _name + '-text-finish').val()];
      _q.Text.Answer = '{=' + $('#form-' + _name + '-void').val() + '}';
    break;
    case 'fill-blank-end':
      _q.Text.Question = $('#form-' + _name + '-text').val();
      _q.Text.Answer = '{=' + $('#form-' + _name + '-void').val() + '}';
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

  $('.volatile-field').each(function (){
    $(this).remove();
  });

  //TODO: Limpiar el resto de los datos (radios, checkboxes, ...)
}
