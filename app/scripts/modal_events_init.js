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

    $( '#modal_remove_question' ).attr ( 'target', _id );

    if ( PARSE_DEBUG ) {
      console.log ( 'Eliminando: #' + _id + ' - ' +
        $(this).parent().parent().parent().parent().prev().children('span.question-title').text()
      );
    }

    $('#modal_remove_question').modal();
  });

  // Activación del botón del modal para eliminar sólo la pregunta origen
  $('#modal_remove_question').on('click', 'button.btn-danger', function () {
    var _id = $( '#modal_remove_question' ).attr ( 'target' );
    $( '#' + _id ).remove();
    $('#accordion1:empty').info_on_empty ( '#accordion1-empty' );
    $('#accordion1').children('div.group').first().parent().next().hide();
  });

  // Programamos el foco en el botón de eliminar para cuando se muestre por completo el modal
  $('#modal_remove_question').on('shown.bs.modal', function () {
    $('#modal_remove_question button.btn-danger').focus();
  });



  // Eliminar todas las preguntas
  $('#remove-all-questions').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Eliminando todas las preguntas' );
    }

    $('#modal_remove_all_questions').modal();
  } );

  // Activación del botón del modal de eliminar todas las preguntas
  $('#modal_remove_all_questions').on('click', 'button.btn-danger', function () {
    $( '#accordion1' ).children('div.group').each(function () {
      $(this).remove();
    });
    // FIXME: No es necesario (no funciona?)
    $('#accordion1:empty').info_on_empty ( '#accordion1-empty' );
  });

  // Programamos el foco en el botón de eliminar para cuando se muestre por completo el modal
  $('#modal_remove_all_questions').on('shown.bs.modal', function () {
    $('#modal_remove_all_questions button.btn-danger').focus();
  });



  // Eliminar las preguntas seleccionadas
  $('#remove-selected-questions').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Eliminando las preguntas seleccionadas' );
    }

    $('#modal_remove_selected_questions').modal();
  } );

  // Activación del botón del modal de eliminar las preguntas seleccionadas
  $('#modal_remove_selected_questions').on('click', 'button.btn-danger', function () {
    $( '#accordion1' ).find('input[name="question-selected"]:checked').each(function () {
      $(this).remove();
    });
    // FIXME: No es necesario (no funciona?)
    $('#accordion1:empty').info_on_empty ( '#accordion1-empty' );
  });

  // Programamos el foco en el botón de eliminar para cuando se muestre por completo el modal
  $('#modal_remove_selected_questions').on('shown.bs.modal', function () {
    $('#modal_remove_selected_questions button.btn-danger').focus();
  });



  // Añadir pregunta: descripción
  $('#add-question-description').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Añadir pregunta: descripción' );
    }

    // Activamos el modal
    $('#modal_add_question_description').modal();
  } );

  // Activación del botón de aceptar del modal
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

    // Limpiamos el formulario
    $('#modal_add_question_description input').each(function(){
      $(this).val('');
    });

    $( '#accordion1' ).append ( render_description ( _q, detect_question_type ( _q ) ) );
    $( '#accordion1' ).accordion( 'refresh' );
    $('#accordion1').has('div.group').next().hide();
  });

  // Activación del botón de cancelar del modal
  $('#modal_add_question_description').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#modal_add_question_description input').each(function(){
      $(this).val('');
    });

  } );

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal_add_question_description').on('shown.bs.modal', function () {
    $('#form-add-question-description-title').focus();
  });



  // Editar pregunta: descripción
  $('#accordion1').on('click', 'button.edit-question-description', function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Editar pregunta: descripción' );
    }

    var _id = $(this).parent().parent().parent().parent().parent().attr('id');

    $( '#modal_edit_question_description' ).attr ( 'target', _id );

    // Cargamos los datos de la pregunta en el modal
    $('#form-edit-question-description-comment').val(
      $(this).parent().parent().parent().parent().parent().find('p.question-comment').text()
    );
    $('#form-edit-question-description-title').val(
      $(this).parent().parent().parent().parent().parent().find('span.question-title').text()
    );
    $('#form-edit-question-description-text').val(
      $(this).parent().parent().parent().parent().parent().find('p[name="question-text"]').text()
    );

    // Activamos el modal
    $('#modal_edit_question_description').modal();
  } );

  // Activación del botón de aceptar del modal
  $('#modal_edit_question_description').on('click', 'button.btn-primary', function () {

    // Guardamos los datos de la pregunta
    var _q = {
      Comment: [$('#form-edit-question-description-comment').val()],
      Title: $('#form-edit-question-description-title').val(),
      Text: {
        Question: $('#form-edit-question-description-text').val(),
        Answer: ''
      }
    };

    // Limpiamos el formulario
    $('#modal_edit_question_description input').each(function(){
      $(this).val('');
    });

    var _id = $( '#modal_edit_question_description' ).attr ( 'target' );

    $( '#' + _id ).replaceWith ( render_description ( _q, detect_question_type ( _q ) ) );
    $( '#accordion1' ).accordion( 'refresh' );
    $('#accordion1').has('div.group').next().hide();
  });

  // Activación del botón de cancelar del modal
  $('#modal_edit_question_description').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#modal_edit_question_description input').each(function(){
      $(this).val('');
    });

  } );

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal_edit_question_description').on('shown.bs.modal', function () {
    $('#form-edit-question-description-title').focus();
  });



  // Añadir pregunta: redacción
  $('#add-question-essay').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Añadir pregunta: redacción' );
    }

    // Activamos el modal
    $('#modal_add_question_essay').modal();
  } );

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

    // Limpiamos el formulario
    $('#modal_add_question_essay input').each(function(){
      $(this).val('');
    });

    $( '#accordion1' ).append ( render_essay ( _q, detect_question_type ( _q ) ) );
    $( '#accordion1' ).accordion( 'refresh' );
    $('#accordion1').has('div.group').next().hide();
  });

  // Activación del botón de cancelar del modal
  $('#modal_add_question_essay').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#modal_add_question_essay input').each(function(){
      $(this).val('');
    });

  } );

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal_add_question_essay').on('shown.bs.modal', function () {
    $('#form-add-question-essay-title').focus();
  });



  // Editar pregunta: redacción
  $('#accordion1').on('click', 'button.edit-question-essay', function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Editar pregunta: redacción' );
    }

    var _id = $(this).parent().parent().parent().parent().parent().attr('id');

    $( '#modal_edit_question_essay' ).attr ( 'target', _id );

    // Cargamos los datos de la pregunta en el modal
    $('#form-edit-question-essay-comment').val(
      $(this).parent().parent().parent().parent().parent().find('p.question-comment').text()
    );
    $('#form-edit-question-essay-title').val(
      $(this).parent().parent().parent().parent().parent().find('span.question-title').text()
    );
    $('#form-edit-question-essay-text').val(
      $(this).parent().parent().parent().parent().parent().find('p[name="question-text"]').text()
    );

    // Activamos el modal
    $('#modal_edit_question_essay').modal();
  } );

  // Activación del botón de aceptar del modal
  $('#modal_edit_question_essay').on('click', 'button.btn-primary', function () {

    // Guardamos los datos de la pregunta
    var _q = {
      Comment: [$('#form-edit-question-essay-comment').val()],
      Title: $('#form-edit-question-essay-title').val(),
      Text: {
        Question: $('#form-edit-question-essay-text').val(),
        Answer: ''
      }
    };

    // Limpiamos el formulario
    $('#modal_edit_question_essay input').each(function(){
      $(this).val('');
    });

    var _id = $( '#modal_edit_question_essay' ).attr ( 'target' );

    $( '#' + _id ).replaceWith ( render_essay ( _q, detect_question_type ( _q ) ) );
    $( '#accordion1' ).accordion( 'refresh' );
    $('#accordion1').has('div.group').next().hide();
  });

  // Activación del botón de cancelar del modal
  $('#modal_edit_question_essay').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#modal_edit_question_essay input').each(function(){
      $(this).val('');
    });

  } );

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal_edit_question_essay').on('shown.bs.modal', function () {
    $('#form-edit-question-essay-title').focus();
  });



  // Añadir pregunta: rellenar hueco inicial
  $('#add-question-fill-blank-start').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( ' Añadir pregunta: rellenar hueco inicial' );
    }

    // Activamos el modal
    $('#modal_add_question_fill_blank_start').modal();
  } );

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

    // Limpiamos el formulario
    $('#modal_add_question_fill_blank_start input').each(function(){
      $(this).val('');
    });

    $( '#accordion1' ).append ( render_fill_blank ( _q, detect_question_type ( _q ) ) );
    $( '#accordion1' ).accordion( 'refresh' );
    $('#accordion1').has('div.group').next().hide();
  });

  // Activación del botón de cancelar del modal
  $('#modal_add_question_fill_blank_start').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#modal_add_question_fill_blank_start input').each(function(){
      $(this).val('');
    });

  } );

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal_add_question_fill_blank_start').on('shown.bs.modal', function () {
    $('#form-add-question-fill-blank-start-title').focus();
  });



  // Editar pregunta: rellenar hueco inicial
  $('#accordion1').on('click', 'button.edit-question-start-fill-blank', function () {
    if ( PARSE_DEBUG ) {
      console.log ( 'Editar pregunta: descripción' );
    }

    var _id = $(this).parent().parent().parent().parent().parent().attr('id');

    $( '#modal_edit_question_fill_blank_start' ).attr ( 'target', _id );

    // Cargamos los datos de la pregunta en el modal
    $('#form-edit-question-fill-blank-start-comment').val(
      $(this).parent().parent().parent().parent().parent().find('p.question-comment').text()
    );
    $('#form-edit-question-fill-blank-start-title').val(
      $(this).parent().parent().parent().parent().parent().find('span.question-title').text()
    );
    $('#form-edit-question-fill-blank-start-text').val(
      $(this).parent().parent().parent().parent().parent().find('span[name="question-text"]').text()
    );
    $('#form-edit-question-fill-blank-start-void').val(
      $(this).parent().parent().parent().parent().parent().find('input[name="blank"]').val()
    );

    // Activamos el modal
    $('#modal_edit_question_fill_blank_start').modal();
  } );

  // Activación del botón de aceptar del modal
  $('#modal_edit_question_fill_blank_start').on('click', 'button.btn-primary', function () {

    // Guardamos los datos de la pregunta
    var _q = {
      Comment: [$('#form-edit-question-fill-blank-start-comment').val()],
      Title: $('#form-edit-question-fill-blank-start-title').val(),
      Text: {
        Question: $('#form-edit-question-fill-blank-start-text').val(),
        Answer: $('#form-edit-question-fill-blank-start-void').val()
      }
    };

    // Limpiamos el formulario
    $('#modal_edit_question_fill_blank_start input').each(function(){
      $(this).val('');
    });

    var _id = $( '#modal_edit_question_fill_blank_start' ).attr ( 'target' );

    $( '#' + _id ).replaceWith ( render_fill_blank ( _q, detect_question_type ( _q ) ) );
    $( '#accordion1' ).accordion( 'refresh' );
    $('#accordion1').has('div.group').next().hide();
  });

  // Activación del botón de cancelar del modal
  $('#modal_edit_question_fill_blank_start').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#modal_edit_question_fill_blank_start input').each(function(){
      $(this).val('');
    });

  } );

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal_edit_question_fill_blank_start').on('shown.bs.modal', function () {
    $('#form-edit-question-fill-blank-start-title').focus();
  });



  // Añadir pregunta: rellenar hueco enmedio
  $('#add-question-fill-blank-middle').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( ' Añadir pregunta: rellenar hueco enmedio' );
    }

    // Activamos el modal
    $('#modal_add_question_fill_blank_middle').modal();
  } );

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

    // Limpiamos el formulario
    $('#modal_add_question_fill_blank_middle input').each(function(){
      $(this).val('');
    });

    $( '#accordion1' ).append ( render_fill_blank ( _q, detect_question_type ( _q ) ) );
    $( '#accordion1' ).accordion( 'refresh' );
    $('#accordion1').has('div.group').next().hide();
  });

  // Activación del botón de cancelar del modal
  $('#modal_add_question_fill_blank_middle').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#modal_add_question_fill_blank_middle input').each(function(){
      $(this).val('');
    });

  } );

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal_add_question_fill_blank_middle').on('shown.bs.modal', function () {
    $('#form-add-question-fill-blank-middle-title').focus();
  });



  // Añadir pregunta: rellenar hueco final
  $('#add-question-fill-blank-end').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( ' Añadir pregunta: rellenar hueco final' );
    }

    // Activamos el modal
    $('#modal_add_question_fill_blank_end').modal();
  } );

  // Activación del botón del modal
  $('#modal_add_question_fill_blank_end').on('click', 'button.btn-primary', function () {
    // Desactivamos el evento asociado al botón recién pulsado (#30)
    $('#modal_add_question_fill_blank_end').off('click', 'button.btn-primary');

    // Creamos nueva pregunta en el acordeón
    var _q = {
      Comment: [$('#form-add-question-fill-blank-end-comment').val()],
      Title: $('#form-add-question-fill-blank-end-title').val(),
      Text: {
        Question: $('#form-add-question-fill-blank-end-text').val(),
        Answer: '{=' + $('#form-add-question-fill-blank-end-void').val() + '}'
      }
    };

    // Limpiamos el formulario
    $('#modal_add_question_fill_blank_end input').each(function(){
      $(this).val('');
    });

    $( '#accordion1' ).append ( render_fill_blank ( _q, detect_question_type ( _q ) ) );
    $( '#accordion1' ).accordion( 'refresh' );
    $('#accordion1').has('div.group').next().hide();
  });

  // Activación del botón de cancelar del modal
  $('#modal_add_question_fill_blank_end').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#modal_add_question_fill_blank_end input').each(function(){
      $(this).val('');
    });

  } );

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal_add_question_fill_blank_end').on('shown.bs.modal', function () {
    $('#form-add-question-fill-blank-end-title').focus();
  });



  // Añadir pregunta: Emparejar
  $('#add-question-matching').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Añadir pregunta: Emparejar' );
    }

    // Activamos el modal
    $('#modal_add_question_matching').modal();
  } );

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

    // Limpiamos el formulario
    $('#modal_add_question_matching input').each(function(){
      $(this).val('');
    });

    $( '#accordion1' ).append ( render_matching ( _q, detect_question_type ( _q ) ) );
    $( '#accordion1' ).accordion( 'refresh' );
    $('#accordion1').has('div.group').next().hide();
  });

  // Activación del botón de cancelar del modal
  $('#modal_add_question_matching').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#modal_add_question_matching input').each(function(){
      $(this).val('');
    });

  } );

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal_add_question_matching').on('shown.bs.modal', function () {
    $('#form-add-question-matching-title').focus();
  });



  // Añadir pregunta: Rango numérico
  $('#add-question-numeric-range').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Añadir pregunta: Rango numérico' );
    }

    // Activamos el modal
    $('#modal_add_question_numeric_range').modal();
  } );

  // Activación del botón del modal
  $('#modal_add_question_numeric_range').on('click', 'button.btn-primary', function () {
    // Desactivamos el evento asociado al botón recién pulsado (#30)
    $('#modal_add_question_numeric_range').off('click', 'button.btn-primary');

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

    // Limpiamos el formulario
    $('#modal_add_question_numeric_range input').each(function(){
      $(this).val('');
    });

    $( '#accordion1' ).append ( render_numeric ( _q, detect_question_type ( _q ) ) );
    $( '#accordion1' ).accordion( 'refresh' );
    $('#accordion1').has('div.group').next().hide();
  });

  // Activación del botón de cancelar del modal
  $('#modal_add_question_numeric_range').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#modal_add_question_numeric_range input').each(function(){
      $(this).val('');
    });

  } );

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal_add_question_numeric_range').on('shown.bs.modal', function () {
    $('#form-add-question-numeric-range-title').focus();
  });



  // Añadir pregunta: Tolerancia numérica
  $('#add-question-numeric-tolerance').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Añadir pregunta: Tolerancia numérica' );
    }

    // Activamos el modal
    $('#modal_add_question_numeric_tolerance').modal();
  } );

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

    // Limpiamos el formulario
    $('#modal_add_question_numeric_tolerance input').each(function(){
      $(this).val('');
    });

    $( '#accordion1' ).append ( render_numeric ( _q, detect_question_type ( _q ) ) );
    $( '#accordion1' ).accordion( 'refresh' );
    $('#accordion1').has('div.group').next().hide();
  });

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal_add_question_numeric_tolerance').on('shown.bs.modal', function () {
    $('#form-add-question-numeric-tolerance-title').focus();
  });


  // Activación del botón de cancelar del modal
  $('#modal_add_question_numeric_tolerance').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#modal_add_question_numeric_tolerance input').each(function(){
      $(this).val('');
    });

  } );


  // Añadir pregunta: Verdadero/falso
  $('#add-question-true-false').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Añadir pregunta: Verdadero/falso' );
    }

    // Activamos el modal
    $('#modal_add_question_true_false').modal();
  } );

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

    // Limpiamos el formulario
    $('#form-add-question-true-false-comment').val('');
    $('#form-add-question-true-false-title').val('');
    $('#form-add-question-true-false-text').val('');
    $('input[name="form-add-question-true-false-optradio"]:checked').prop('checked', false);

    $( '#accordion1' ).append ( render_true_false ( _q, detect_question_type ( _q ) ) );
    $( '#accordion1' ).accordion( 'refresh' );
    $('#accordion1').has('div.group').next().hide();
  });

  // Activación del botón de cancelar del modal
  $('#modal_add_question_true_false').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#form-add-question-true-false-comment').val('');
    $('#form-add-question-true-false-title').val('');
    $('#form-add-question-true-false-text').val('');
    $('input[name="form-add-question-true-false-optradio"]:checked').prop('checked', false);
  } );

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal_add_question_true_false').on('shown.bs.modal', function () {
    $('#form-add-question-true-false-title').focus();
  });

  // Editar pregunta: redacción
  $('#accordion1').on('click', 'button.edit-question-true-false', function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Editar pregunta: redacción' );
    }

    var _id = $(this).parent().parent().parent().parent().parent().attr('id');

    $( '#modal_edit_question_true_false' ).attr ( 'target', _id );

    // Cargamos los datos de la pregunta en el modal
    $('#form-edit-question-true-false-comment').val(
      $(this).parent().parent().parent().parent().parent().find('p.question-comment').text()
    );
    $('#form-edit-question-true-false-title').val(
      $(this).parent().parent().parent().parent().parent().find('span.question-title').text()
    );
    $('#form-edit-question-true-false-text').val(
      $(this).parent().parent().parent().parent().parent().find('p[name="question-text"]').text()
    );

    // Activamos el modal
    $('#modal_edit_question_true_false').modal();
  } );

  // Activación del botón de aceptar del modal
  $('#modal_edit_question_true_false').on('click', 'button.btn-primary', function () {

    // Guardamos los datos de la pregunta
    var _q = {
      Comment: [$('#form-edit-question-true-false-comment').val()],
      Title: $('#form-edit-question-true-false-title').val(),
      Text: {
        Question: $('#form-edit-question-true-false-text').val(),
        Answer: ''
      }
    };

    // Limpiamos el formulario
    $('#modal_edit_question_true_false input').each(function(){
      $(this).val('');
    });

    var _id = $( '#modal_edit_question_true_false' ).attr ( 'target' );

    $( '#' + _id ).replaceWith ( render_true_false ( _q, detect_question_type ( _q ) ) );
    $( '#accordion1' ).accordion( 'refresh' );
    $('#accordion1').has('div.group').next().hide();
  });

  // Activación del botón de cancelar del modal
  $('#modal_edit_question_true_false').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#modal_edit_question_true_false input').each(function(){
      $(this).val('');
    });

  } );

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal_edit_question_true_false').on('shown.bs.modal', function () {
    $('#form-edit-question-true-false-title').focus();
  });




}
