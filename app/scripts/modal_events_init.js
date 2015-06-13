/* _jshint ignore: start */
/* jshint camelcase: false */
/* jslint multistr: true */
'use strict';

/*** Enlace de eventos de ventanas modales ***/

var modal_events_init = function modal_events_init ()
{

  // Añadir pareja de correspondencia
  $('button.btn-new-pair').click(function(){
    var _name = $(this).attr('id').slice(5,-9);
    console.log ( ' Pulsando... ' + $(this).attr('id') + ' de ' + _name );
    create_edit_matching_pair ( _name, '', '', true );
    $(this).prev().prev().find('input:first').focus();
  });

  // Eliminar pareja de correspondencia
  $('div.modal-body').on('click', 'span.remove-pair', function(){
    $(this).parent().next().remove();
    $(this).parent().remove();
  });

  // Eliminar pregunta
  $('#accordion1').on('click', 'button.remove-question' ,function () {

    var _id = $(this).parent().parent().parent().parent().parent().attr('id');

    $( '#modal-remove-question' ).attr ( 'target', _id );

    if ( PARSE_DEBUG ) {
      console.log ( 'Eliminando: #' + _id + ' - ' +
        $(this).parent().parent().parent().parent().prev().children('span.question-title').text()
      );
    }

    $('#modal-remove-question').modal();
  });

  // Activación del botón del modal para eliminar sólo la pregunta origen
  $('#modal-remove-question').on('click', 'button.btn-danger', function () {
    var _id = $( '#modal-remove-question' ).attr ( 'target' );
    $( '#' + _id ).remove();
    $('#accordion1:empty').info_on_empty ( '#accordion1-empty' );
    $('#accordion1').children('div.group').first().parent().next().hide();
  });

  // Programamos el foco en el botón de eliminar para cuando se muestre por completo el modal
  $('#modal-remove-question').on('shown.bs.modal', function () {
    $('#modal-remove-question button.btn-danger').focus();
  });



  // Eliminar todas las preguntas
  $('#remove-all-questions').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Eliminando todas las preguntas' );
    }

    $('#modal-remove-all-questions').modal();
  } );

  // Activación del botón del modal de eliminar todas las preguntas
  $('#modal-remove-all-questions').on('click', 'button.btn-danger', function () {
    $( '#accordion1' ).children('div.group').each(function () {
      $(this).remove();
    });
    // FIXME: No es necesario (no funciona?)
    $('#accordion1:empty').info_on_empty ( '#accordion1-empty' );
  });

  // Programamos el foco en el botón de eliminar para cuando se muestre por completo el modal
  $('#modal-remove-all-questions').on('shown.bs.modal', function () {
    $('#modal-remove-all-questions button.btn-danger').focus();
  });



  // Eliminar las preguntas seleccionadas
  $('#remove-selected-questions').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Eliminando las preguntas seleccionadas' );
    }

    $('#modal-remove-selected-questions').modal();
  } );

  // Activación del botón del modal de eliminar las preguntas seleccionadas
  $('#modal-remove-selected-questions').on('click', 'button.btn-danger', function () {
    $( '#accordion1' ).find('input[name="question-selected"]:checked').each(function () {
      $(this).remove();
    });
    // FIXME: No es necesario (no funciona?)
    $('#accordion1:empty').info_on_empty ( '#accordion1-empty' );
  });

  // Programamos el foco en el botón de eliminar para cuando se muestre por completo el modal
  $('#modal-remove-selected-questions').on('shown.bs.modal', function () {
    $('#modal-remove-selected-questions button.btn-danger').focus();
  });

  var new_modals = [
    'add-question-description',
    'add-question-essay',
    'add-question-true-false',
    'add-question-numeric-range',
    'add-question-numeric-tolerance',
    'add-question-matching',
    'add-question-fill-blank-start',
    'add-question-fill-blank-middle',
    'add-question-fill-blank-end'
  ];

  for ( var i in new_modals ) {

    if ( MODAL_DEBUG ) { console.log ( 'Activando modal-' + new_modals[i] ); }

    // Pulsamos sobre añadir pregunta
    $('#' + new_modals[i]).click( function () {
      var _name = $(this).attr('id');

      if ( MODAL_DEBUG ) {
        console.log ( 'Ejecutando acción ' + _name );
      }

      // Activamos el modal
      $('#modal-' + _name).modal();
    } );

    // Modal ocultado
    $('#modal-' + new_modals[i]).on('hidden.bs.modal', function () {
      var _name = $(this).attr('id').substr (6);

      if ( MODAL_DEBUG ) { console.debug('Ocultando el modal de validación ' + '#modal-' + _name ); }

      if ( MODAL_DEBUG ) { console.log ( 'Nodo hidden: ' + $(this).attr('id') ); }

      $( '#form-' + _name  ).validator('destroy').off('submit');

      // Limpiamos el formulario
      limpiar_formulario ( _name );

    } );

    // Modal mostrado
    $('#modal-' + new_modals[i] ).on('shown.bs.modal', function () {
      var _name = $(this).attr('id').substr(6);
      var _question_type = $(this).attr('question-type');

      // Programamos el foco en el primer campo para cuando se muestre por completo el modal
      $('#form-' + _name + ' input:first').focus();

      // Activamos la validación, desactivando submit si no valida
      $( '#form-' + _name  ).validator({disable:'true'}).on('submit', function (e) {
        console.debug('Submit en el modal ' + '#modal-' + _name );

        if (e.isDefaultPrevented()) {
          // handle the invalid form...
          if ( MODAL_DEBUG ) { console.error ('Error: validacion fallida ' + '#modal-' + _name ); }
          // alert ('Error: validacion fallida ' + '#modal-' + _name );
        } else {

          if ( MODAL_DEBUG ) { console.log ( 'Guardando nuevos datos de ' + _name + '/' + _question_type ); }
          var _q = asignar_datos_desde_modal ( _name, _question_type );

          if ( MODAL_DEBUG ) { console.log ( 'Datos devueltos: ' + JSON.stringify(_q) ); }

          $( '#modal-' + _name  ).modal('hide');

          var _result = render_individual_question ( _q  );

          if ( MODAL_DEBUG ) { console.log ( 'Resultado: ' + _result ); }

          $( '#accordion1' ).append ( _result );
          $( '#accordion1' ).accordion( 'refresh' );

          $('#accordion1').has('div.group').next().hide();

          // everything looks good!
          if ( MODAL_DEBUG ) { console.info ('Exito: validacion exitosa ' + '#modal-' + _name ); }
          // alert ('Exito: validacion exitosa ' + '#modal-' + _name );
        }

        return false;
      });
    });


  } // FOR


  var edit_modals = [
    'edit-question-description',
    'edit-question-essay',
    'edit-question-true-false',
    'edit-question-numeric-range',
    'edit-question-numeric-tolerance',
    'edit-question-matching',
    'edit-question-fill-blank-start',
    'edit-question-fill-blank-middle',
    'edit-question-fill-blank-end'
  ];

  for (var i in edit_modals) {

    // Editar pregunta
    if ( MODAL_DEBUG ) { console.log ( 'Activando modal-' + edit_modals[i] ); }
    $('#accordion1').on('click', 'button.' + edit_modals[i], function () {

      var _id = '';
      var _dest = 'edit-question-';
      var _type = '';
      $(this).parentsUntil('div.group','div.question-details').each(function(){
        _id = $(this).parent().attr('id');
        _type = $(this).parent().attr('question-type');
      });
      _dest += _type;

      if ( MODAL_DEBUG ) {
        console.log ( 'Editar pregunta: '+ _type );
      }

      if ( MODAL_DEBUG ) { console.log ( 'Asignando datos '+ _type + ' de ' + _id + ' a ' + _dest ); }

      asignar_datos_a_modal ( _id, _dest, _type );

      // Activamos el modal
      $('#modal-' + _dest).modal();
    } );


    // Modal ocultado (tras aceptar los cambios, darle a cancelar, pulsar sobre la X o sobre la zona sombreada)
    $('#modal-' + edit_modals[i]).on('hidden.bs.modal', function () {

      var _name = $(this).attr('id').substr (6);

      if ( MODAL_DEBUG ) { console.debug('Ocultando el modal de validación ' + '#modal-' + _name ); }

      if ( MODAL_DEBUG ) { console.log ( 'Nodo hidden: ' + $(this).attr('id') ); }

      $( '#form-' + _name  ).validator('destroy').off('submit');

      limpiar_formulario ( _name );

    } );

    // Modal mostrado (cargamos los datos y ponemos el foco)
    $('#modal-' + edit_modals[i]).on('shown.bs.modal', function () {
      var _name = $(this).attr('id').substr(6);
      var _target = $(this).attr('target');
      var _question_type = $(this).attr('question-type');

      $('#form-' + _name + ' input:first').focus();


      // Activamos la validación, desactivando submit si no valida
      $( '#form-' + _name  ).validator({disable:'true'}).on('submit', function (e) {
        console.debug('Submit en el modal ' + '#modal-' + _name );

        if (e.isDefaultPrevented()) {
          // handle the invalid form...
          if ( MODAL_DEBUG ) { console.error ('Error: validacion fallida ' + '#modal-' + _name ); }
          // alert ('Error: validacion fallida ' + '#modal-' + _name );
        } else {

          if ( MODAL_DEBUG ) { console.log ( 'Guardando datos de ' + _name + '/' + _question_type + ' a ' + _target ); }
          var _q = asignar_datos_desde_modal ( _name, _question_type );

          if ( MODAL_DEBUG ) { console.log ( 'Datos devueltos: ' + JSON.stringify(_q) ); }

          $( '#modal-' + _name  ).modal('hide');

          var _result = render_individual_question ( _q  );

          if ( MODAL_DEBUG ) { console.log ( 'Resultado: ' + _result ); }

          $( _target ).replaceWith ( _result );
          $( '#accordion1' ).accordion( 'refresh' );

          // No haría falta ocultar el texto info_on_empty al estar editando una pregunta existente
          $('#accordion1').has('div.group').next().hide();

          // everything looks good!
          if ( MODAL_DEBUG ) { console.info ('Exito: validacion exitosa ' + '#modal-' + _name ); }
          // alert ('Exito: validacion exitosa ' + '#modal-' + _name );
        }

        return false;
      });

    });
  }

/*
  // Modales a validar
  var v_mod = [
    'test-validator',
    'test-validator-B'
    ];

  for (var i in v_mod) {

    // console.log ( 'Modal: ' + '#modal-'+v_mod[i]);
    // console.log ( 'Formulario: ' + '#form-'+v_mod[i]);


    // $( 'body' ).on('shown.bs.modal', '#modal-'+v_mod[i], function () {
    //   console.log ( 'Modal mostrado');
    // });


    $( 'body' ).on('shown.bs.modal', '#modal-' + v_mod[i] , function () {
      var _m = $(this).attr('id').substr (6);

      // Activamos el primer campo del formulario
      $( '#form-' + _m + ' input:first' ).focus();

      console.log ( 'Nodo shown: ' + $(this).attr('id') );

      console.debug('Activando primer campo del modal de validación ' + '#modal-' + _m );

      $( '#modal-' + _m  ).data('submit-in-progress', 'false' );

      // Activamos la validación, desactivando submit si no valida
      $( '#form-' + _m  ).validator({disable:'true'}).on('submit', function (e) {
        console.debug('Submit en el modal de validación ' + '#modal-' + _m );
        if ( $( '#modal-' + _m  ).data('submit-in-progress') === 'false' ) {
          // FIXME: como el evento submit se dispara dos veces, comprobamos que sólo apliquemos una
          $( '#modal-' + _m  ).data('submit-in-progress', 'true');

          if (e.isDefaultPrevented()) {
            // handle the invalid form...
            console.error ('Error: validacion fallida ' + '#modal-' + _m );
            alert ('Error: validacion fallida ' + '#modal-' + _m );
          } else {
            // everything looks good!
            console.info ('Exito: validacion exitosa ' + '#modal-' + _m );
            alert ('Exito: validacion exitosa ' + '#modal-' + _m );
            $( '#modal-' + _m  ).modal('hide');
          }
        } else {
          $( '#modal-' + _m  ).data('submit-in-progress', 'false' );
        }
        return false;
      });
    });

    // Salir del modal: Eliminamos la validación, desactivamos el submit y limpiamos los datos
    $( 'body' ).on('hidden.bs.modal', '#modal-' + v_mod[i], function () {
      var _m = $(this).attr('id').substr (6);

      console.debug('Ocultando el modal de validación ' + '#modal-' + _m );

      console.log ( 'Nodo hidden: ' + $(this).attr('id') );

      $( '#modal-' + _m  ).removeData('submit-in-progress' );
      $( '#form-' + _m  ).validator('destroy').off('submit').find('input').each(function(){
        $(this).val('');
      });

    });

  }
  */

}
