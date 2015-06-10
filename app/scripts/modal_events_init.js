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
      var _q = {
        Comment: [$('#form-add-question-description-comment').val()],
        Title: $('#form-add-question-description-title').val(),
        Text: {
          Question: $('#form-add-question-description-text').val(),
          Answer: ''
        }
      };

      $( '#accordion1' ).append ( render_description ( _q, detect_question_type ( _q ) ) );
      $( '#accordion1' ).accordion( 'refresh' );
      $('#accordion1').has('div.group').next().hide();
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
      var _q = {
        Comment: [$('#form-add-question-essay-comment').val()],
        Title: $('#form-add-question-essay-title').val(),
        Text: {
          Question: $('#form-add-question-essay-text').val(),
          Answer: '{}'
        }
      };

      $( '#accordion1' ).append ( render_essay ( _q, detect_question_type ( _q ) ) );
      $( '#accordion1' ).accordion( 'refresh' );
      $('#accordion1').has('div.group').next().hide();
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
      var _q = {
        Comment: [$('#form-add-question-fill-blank-start-comment').val()],
        Title: $('#form-add-question-fill-blank-start-title').val(),
        Text: {
          Question: ['', $('#form-add-question-fill-blank-start-text').val()],
          Answer: '{=' + $('#form-add-question-fill-blank-start-void').val() + '}'
        }
      };

      $( '#accordion1' ).append ( render_fill_blank ( _q, detect_question_type ( _q ) ) );
      $( '#accordion1' ).accordion( 'refresh' );
      $('#accordion1').has('div.group').next().hide();
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
      var _q = {
        Comment: [$('#form-add-question-fill-blank-middle-comment').val()],
        Title: $('#form-add-question-fill-blank-middle-title').val(),
        Text: {
          Question: [$('#form-add-question-fill-blank-middle-text-begin').val(),
                    $('#form-add-question-fill-blank-middle-text-finish').val()],
          Answer: '{=' + $('#form-add-question-fill-blank-middle-void').val() + '}'
        }
      };

      $( '#accordion1' ).append ( render_fill_blank ( _q, detect_question_type ( _q ) ) );
      $( '#accordion1' ).accordion( 'refresh' );
      $('#accordion1').has('div.group').next().hide();
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
      var _q = {
        Comment: [$('#form-add-question-fill-blank-end-comment').val()],
        Title: $('#form-add-question-fill-blank-end-title').val(),
        Text: {
          Question: $('#form-add-question-fill-blank-end-text').val(),
          Answer: '{=' + $('#form-add-question-fill-blank-end-void').val() + '}'
        }
      };

      $( '#accordion1' ).append ( render_fill_blank ( _q, detect_question_type ( _q ) ) );
      $( '#accordion1' ).accordion( 'refresh' );
      $('#accordion1').has('div.group').next().hide();
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
      var _q = {
        Comment: [$('#form-add-question-matching-comment').val()],
        Title: $('#form-add-question-matching-title').val(),
        Text: {
          Question: $('#form-add-question-matching-text').val(),
          Answer: '{ =' +
          $('#form-add-question-matching-pair-1-1').val() +
          ' -> ' +
          $('#form-add-question-matching-pair-1-2').val() +
          ' =' +
          $('#form-add-question-matching-pair-2-1').val() +
          ' -> ' +
          $('#form-add-question-matching-pair-2-2').val() +
          ' =' +
          $('#form-add-question-matching-pair-3-1').val() +
          ' -> ' +
          $('#form-add-question-matching-pair-3-2').val() +
          ' }'
        }
      };

      $( '#accordion1' ).append ( render_matching ( _q, detect_question_type ( _q ) ) );
      $( '#accordion1' ).accordion( 'refresh' );
      $('#accordion1').has('div.group').next().hide();
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
      var _q = {
        Comment: [$('#form-add-question-numeric-range-comment').val()],
        Title: $('#form-add-question-numeric-range-title').val(),
        Text: {
          Question: $('#form-add-question-numeric-range-text').val(),
          Answer: '{#' + $('#form-add-question-numeric-range-answer-begin').val() +
          '..' + $('#form-add-question-numeric-range-answer-finish').val() + '}'
        }
      };

      $( '#accordion1' ).append ( render_numeric ( _q, detect_question_type ( _q ) ) );
      $( '#accordion1' ).accordion( 'refresh' );
      $('#accordion1').has('div.group').next().hide();
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
      var _q = {
        Comment: [$('#form-add-question-numeric-tolerance-comment').val()],
        Title: $('#form-add-question-numeric-tolerance-title').val(),
        Text: {
          Question: $('#form-add-question-numeric-tolerance-text').val(),
          Answer: '{#' + $('#form-add-question-numeric-tolerance-answer').val() +
          ':' + $('#form-add-question-numeric-tolerance-radius').val() + '}'
        }
      };

      $( '#accordion1' ).append ( render_numeric ( _q, detect_question_type ( _q ) ) );
      $( '#accordion1' ).accordion( 'refresh' );
      $('#accordion1').has('div.group').next().hide();
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
      var _q = {
        Comment: [$('#form-add-question-true-false-comment').val()],
        Title: $('#form-add-question-true-false-title').val(),
        Text: {
          Question: $('#form-add-question-true-false-text').val(),
          Answer: '{'+ $('input[name="form-add-question-true-false-optradio"]:checked').val() +'}'
        }
      };

      $( '#accordion1' ).append ( render_true_false ( _q, detect_question_type ( _q ) ) );
      $( '#accordion1' ).accordion( 'refresh' );
      $('#accordion1').has('div.group').next().hide();
    });

    // Activamos el modal
    $('#modal_add_question_true_false').modal();
  } );


}
