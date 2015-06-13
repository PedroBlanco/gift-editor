/* jshint ignore: start */
/* jshint camelcase: false */
/* jslint multistr: true */
'use strict';


var asignar_datos_a_modal = function asignar_datos_a_modal ( _selector, _name, _type )
{
  console.debug ( '...Asignando de ' + _selector + ' a ' + _name );

  $( '#modal-' + _name ).attr ( 'target', '#' + _selector );

  $('#form-' + _name + '-comment').val(
    $('#' + _selector).find('p.question-comment').text()
  );
  $('#form-' + _name + '-title').val(
    $('#' + _selector).find('span.question-title').text()
  );

  switch ( _type ) {
    case 'true-false':
      $('#form-' + _name + '-text').val(
        $('#' + _selector).find('p[name="question-text"]').text()
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
      Answer: '{T}' // FIXME-TEMPORAL
    }
  };
  console.debug ( 'Asignando...' + JSON.stringify (_q) );

  return _q;
}

var limpiar_formulario = function limpiar_formulario ( _name )
{
  console.debug ( 'Limpiando #form-' + _name );
  // Limpiamos el formulario
  $('#form-' + _name + ' input').each(function(){
    $(this).val('');
  });
  //TODO: Limpiar el resto de los datos (radios, checkboxes, ...)
}
