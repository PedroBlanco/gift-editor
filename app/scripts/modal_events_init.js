/* jslint node: true */
/* jshint camelcase: false */
/* jslint multistr: true */
'use strict';



/*** Enlace de eventos de ventanas modales ***/

var modal_events_init = function modal_events_init ()
{
  // Eliminar pregunta
  $('#accordion1').on('click', 'button.remove-question' ,function () {

    var _id = $(this).parent().parent().parent().parent().parent().attr('id');

    if ( PARSE_DEBUG ) {
      console.log ( 'Eliminando: #' + _id + ' - ' +
        $(this).parent().parent().parent().parent().prev().children('span.question-title').text()
      );
    }

    // Activación del botón del modal para eliminar sólo la pregunta origen
    $('#modal_remove_question').on('click', 'button.btn-danger', function () {
      $( '#' + _id ).remove();
    });

    $('#modal_remove_question').modal();
  });


  // Eliminar todas las preguntas
  $('#remove-all-questions').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Eliminando todas las preguntas' );
    }

    // Activación del botón del modal de eliminar todas las preguntas
    $('#modal_remove_all_questions').on('click', 'button.btn-danger', function () {
      $( '#accordion1' ).children('div.group').each(function () {
        $(this).remove();
      });
      $('#accordion1:empty').info_on_empty ( '#accordion1-empty' );
    });

    $('#modal_remove_all_questions').modal();
  } );


  // Añadir pregunta: descripción
  $('#add-question-description').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Añadir pregunta: descripción' );
    }

    // Activación del botón del modal
    $('#modal_add_question_description').on('click', 'button.btn-primary', function () {
      // Creamos nueva pregunta en el acordeón
    });

    // Activamos el modal
    $('#modal_add_question_description').modal();
  } );


  // Añadir pregunta: redacción
  $('#add-question-essay').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Añadir pregunta: redacción' );
    }

    // Activación del botón del modal
    $('#modal_add_question_essay').on('click', 'button.btn-primary', function () {
      // Creamos nueva pregunta en el acordeón
    });

    // Activamos el modal
    $('#modal_add_question_essay').modal();
  } );


  // Añadir pregunta: rellenar hueco inicial
  $('#add-question-fill-blank-start').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( ' Añadir pregunta: rellenar hueco inicial' );
    }

    // Activación del botón del modal
    $('#modal_add_question_fill_blank_start').on('click', 'button.btn-primary', function () {
      // Creamos nueva pregunta en el acordeón
    });

    // Activamos el modal
    $('#modal_add_question_fill_blank_start').modal();
  } );


  // Añadir pregunta: rellenar hueco enmedio
  $('#add-question-fill-blank-middle').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( ' Añadir pregunta: rellenar hueco enmedio' );
    }

    // Activación del botón del modal
    $('#modal_add_question_fill_blank_middle').on('click', 'button.btn-primary', function () {
      // Creamos nueva pregunta en el acordeón
    });

    // Activamos el modal
    $('#modal_add_question_fill_blank_middle').modal();
  } );


  // Añadir pregunta: rellenar hueco final
  $('#add-question-fill-blank-end').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( ' Añadir pregunta: rellenar hueco final' );
    }

    // Activación del botón del modal
    $('#modal_add_question_fill_blank_end').on('click', 'button.btn-primary', function () {
      // Creamos nueva pregunta en el acordeón
    });

    // Activamos el modal
    $('#modal_add_question_fill_blank_end').modal();
  } );


  // Añadir pregunta: Emparejar
  $('#add-question-matching').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Añadir pregunta: Emparejar' );
    }

    // Activación del botón del modal
    $('#modal_add_question_matching').on('click', 'button.btn-primary', function () {
      // Creamos nueva pregunta en el acordeón
    });

    // Activamos el modal
    $('#modal_add_question_matching').modal();
  } );


  // Añadir pregunta: Rango numérico
  $('#add-question-numeric-range').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Añadir pregunta: Rango numérico' );
    }

    // Activación del botón del modal
    $('#modal_add_question_numeric_range').on('click', 'button.btn-primary', function () {
      // Creamos nueva pregunta en el acordeón
    });

    // Activamos el modal
    $('#modal_add_question_numeric_range').modal();
  } );


  // Añadir pregunta: Tolerancia numérica
  $('#add-question-numeric-tolerance').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Añadir pregunta: Tolerancia numérica' );
    }

    // Activación del botón del modal
    $('#modal_add_question_numeric_tolerance').on('click', 'button.btn-primary', function () {
      // Creamos nueva pregunta en el acordeón
    });

    // Activamos el modal
    $('#modal_add_question_numeric_tolerance').modal();
  } );


  // Añadir pregunta: Verdadero/falso
  $('#add-question-true-false').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Añadir pregunta: Verdadero/falso' );
    }

    // Activación del botón del modal
    $('#modal_add_question_true_false').on('click', 'button.btn-primary', function () {
      // Creamos nueva pregunta en el acordeón
    });

    // Activamos el modal
    $('#modal_add_question_true_false').modal();
  } );


}
