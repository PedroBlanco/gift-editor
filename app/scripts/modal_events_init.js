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



  // Añadir pregunta: descripción
  $('#add-question-description').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Añadir pregunta: descripción' );
    }

    // Activamos el modal
    $('#modal-add-question-description').modal();
  } );

  // Activación del botón de aceptar del modal
  $('#modal-add-question-description').on('click', 'button.btn-primary', function () {

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
    $('#modal-add-question-description input').each(function(){
      $(this).val('');
    });

    $( '#accordion1' ).append ( render_description ( _q, detect_question_type ( _q ) ) );
    $( '#accordion1' ).accordion( 'refresh' );
    $('#accordion1').has('div.group').next().hide();
  });

  // Activación del botón de cancelar del modal
  $('#modal-add-question-description').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#modal-add-question-description input').each(function(){
      $(this).val('');
    });

  } );

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal-add-question-description').on('shown.bs.modal', function () {
    $('#form-add-question-description-title').focus();
  });



  // Editar pregunta: descripción
  $('#accordion1').on('click', 'button.edit-question-description', function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Editar pregunta: descripción' );
    }

    var _id = $(this).parent().parent().parent().parent().parent().attr('id');

    $( '#modal-edit-question-description' ).attr ( 'target', _id );

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
    $('#modal-edit-question-description').modal();
  } );

  // Activación del botón de aceptar del modal
  $('#modal-edit-question-description').on('click', 'button.btn-primary', function () {

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
    $('#modal-edit-question-description input').each(function(){
      $(this).val('');
    });

    var _id = $( '#modal-edit-question-description' ).attr ( 'target' );

    $( '#' + _id ).replaceWith ( render_description ( _q, detect_question_type ( _q ) ) );
    $( '#accordion1' ).accordion( 'refresh' );
    $('#accordion1').has('div.group').next().hide();
  });

  // Activación del botón de cancelar del modal
  $('#modal-edit-question-description').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#modal-edit-question-description input').each(function(){
      $(this).val('');
    });

  } );

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal-edit-question-description').on('shown.bs.modal', function () {
    $('#form-edit-question-description-title').focus();
  });



  // Añadir pregunta: redacción
  $('#add-question-essay').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Añadir pregunta: redacción' );
    }

    // Activamos el modal
    $('#modal-add-question-essay').modal();
  } );

  // Activación del botón del modal
  $('#modal-add-question-essay').on('click', 'button.btn-primary', function () {

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
    $('#modal-add-question-essay input').each(function(){
      $(this).val('');
    });

    $( '#accordion1' ).append ( render_essay ( _q, detect_question_type ( _q ) ) );
    $( '#accordion1' ).accordion( 'refresh' );
    $('#accordion1').has('div.group').next().hide();
  });

  // Activación del botón de cancelar del modal
  $('#modal-add-question-essay').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#modal-add-question-essay input').each(function(){
      $(this).val('');
    });

  } );

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal-add-question-essay').on('shown.bs.modal', function () {
    $('#form-add-question-essay-title').focus();
  });



  // Editar pregunta: redacción
  $('#accordion1').on('click', 'button.edit-question-essay', function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Editar pregunta: redacción' );
    }

    var _id = $(this).parent().parent().parent().parent().parent().attr('id');

    $( '#modal-edit-question-essay' ).attr ( 'target', _id );

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
    $('#modal-edit-question-essay').modal();
  } );

  // Activación del botón de aceptar del modal
  $('#modal-edit-question-essay').on('click', 'button.btn-primary', function () {

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
    $('#modal-edit-question-essay input').each(function(){
      $(this).val('');
    });

    var _id = $( '#modal-edit-question-essay' ).attr ( 'target' );

    $( '#' + _id ).replaceWith ( render_essay ( _q, detect_question_type ( _q ) ) );
    $( '#accordion1' ).accordion( 'refresh' );
    $('#accordion1').has('div.group').next().hide();
  });

  // Activación del botón de cancelar del modal
  $('#modal-edit-question-essay').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#modal-edit-question-essay input').each(function(){
      $(this).val('');
    });

  } );

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal-edit-question-essay').on('shown.bs.modal', function () {
    $('#form-edit-question-essay-title').focus();
  });



  // Añadir pregunta: rellenar hueco inicial
  $('#add-question-fill-blank-start').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( ' Añadir pregunta: rellenar hueco inicial' );
    }

    // Activamos el modal
    $('#modal-add-question-fill-blank-start').modal();
  } );

  // Activación del botón del modal
  $('#modal-add-question-fill-blank-start').on('click', 'button.btn-primary', function () {

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
    $('#modal-add-question-fill-blank-start input').each(function(){
      $(this).val('');
    });

    $( '#accordion1' ).append ( render_fill_blank ( _q, detect_question_type ( _q ) ) );
    $( '#accordion1' ).accordion( 'refresh' );
    $('#accordion1').has('div.group').next().hide();
  });

  // Activación del botón de cancelar del modal
  $('#modal-add-question-fill-blank-start').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#modal-add-question-fill-blank-start input').each(function(){
      $(this).val('');
    });

  } );

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal-add-question-fill-blank-start').on('shown.bs.modal', function () {
    $('#form-add-question-fill-blank-start-title').focus();
  });



  // Editar pregunta: rellenar hueco inicial
  $('#accordion1').on('click', 'button.edit-question-start-fill-blank', function () {
    if ( PARSE_DEBUG ) {
      console.log ( 'Editar pregunta: descripción' );
    }

    var _id = $(this).parent().parent().parent().parent().parent().attr('id');

    $( '#modal-edit-question-fill-blank-start' ).attr ( 'target', _id );

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
    $('#modal-edit-question-fill-blank-start').modal();
  } );

  // Activación del botón de aceptar del modal
  $('#modal-edit-question-fill-blank-start').on('click', 'button.btn-primary', function () {

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
    $('#modal-edit-question-fill-blank-start input').each(function(){
      $(this).val('');
    });

    var _id = $( '#modal-edit-question-fill-blank-start' ).attr ( 'target' );

    $( '#' + _id ).replaceWith ( render_fill_blank ( _q, detect_question_type ( _q ) ) );
    $( '#accordion1' ).accordion( 'refresh' );
    $('#accordion1').has('div.group').next().hide();
  });

  // Activación del botón de cancelar del modal
  $('#modal-edit-question-fill-blank-start').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#modal-edit-question-fill-blank-start input').each(function(){
      $(this).val('');
    });

  } );

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal-edit-question-fill-blank-start').on('shown.bs.modal', function () {
    $('#form-edit-question-fill-blank-start-title').focus();
  });



  // Añadir pregunta: rellenar hueco enmedio
  $('#add-question-fill-blank-middle').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( ' Añadir pregunta: rellenar hueco enmedio' );
    }

    // Activamos el modal
    $('#modal-add-question-fill-blank-middle').modal();
  } );

  // Activación del botón del modal
  $('#modal-add-question-fill-blank-middle').on('click', 'button.btn-primary', function () {

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
    $('#modal-add-question-fill-blank-middle input').each(function(){
      $(this).val('');
    });

    $( '#accordion1' ).append ( render_fill_blank ( _q, detect_question_type ( _q ) ) );
    $( '#accordion1' ).accordion( 'refresh' );
    $('#accordion1').has('div.group').next().hide();
  });

  // Activación del botón de cancelar del modal
  $('#modal-add-question-fill-blank-middle').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#modal-add-question-fill-blank-middle input').each(function(){
      $(this).val('');
    });

  } );

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal-add-question-fill-blank-middle').on('shown.bs.modal', function () {
    $('#form-add-question-fill-blank-middle-title').focus();
  });



  // Añadir pregunta: rellenar hueco final
  $('#add-question-fill-blank-end').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( ' Añadir pregunta: rellenar hueco final' );
    }

    // Activamos el modal
    $('#modal-add-question-fill-blank-end').modal();
  } );

  // Activación del botón del modal
  $('#modal-add-question-fill-blank-end').on('click', 'button.btn-primary', function () {
    // Desactivamos el evento asociado al botón recién pulsado (#30)
    $('#modal-add-question-fill-blank-end').off('click', 'button.btn-primary');

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
    $('#modal-add-question-fill-blank-end input').each(function(){
      $(this).val('');
    });

    $( '#accordion1' ).append ( render_fill_blank ( _q, detect_question_type ( _q ) ) );
    $( '#accordion1' ).accordion( 'refresh' );
    $('#accordion1').has('div.group').next().hide();
  });

  // Activación del botón de cancelar del modal
  $('#modal-add-question-fill-blank-end').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#modal-add-question-fill-blank-end input').each(function(){
      $(this).val('');
    });

  } );

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal-add-question-fill-blank-end').on('shown.bs.modal', function () {
    $('#form-add-question-fill-blank-end-title').focus();
  });



  // Añadir pregunta: Emparejar
  $('#add-question-matching').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Añadir pregunta: Emparejar' );
    }

    // Activamos el modal
    $('#modal-add-question-matching').modal();
  } );

  // Activación del botón del modal
  $('#modal-add-question-matching').on('click', 'button.btn-primary', function () {

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
    $('#modal-add-question-matching input').each(function(){
      $(this).val('');
    });

    $( '#accordion1' ).append ( render_matching ( _q, detect_question_type ( _q ) ) );
    $( '#accordion1' ).accordion( 'refresh' );
    $('#accordion1').has('div.group').next().hide();
  });

  // Activación del botón de cancelar del modal
  $('#modal-add-question-matching').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#modal-add-question-matching input').each(function(){
      $(this).val('');
    });

  } );

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal-add-question-matching').on('shown.bs.modal', function () {
    $('#form-add-question-matching-title').focus();
  });



  // Añadir pregunta: Rango numérico
  $('#add-question-numeric-range').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Añadir pregunta: Rango numérico' );
    }

    // Activamos el modal
    $('#modal-add-question-numeric-range').modal();
  } );

  // Activación del botón del modal
  $('#modal-add-question-numeric-range').on('click', 'button.btn-primary', function () {
    // Desactivamos el evento asociado al botón recién pulsado (#30)
    $('#modal-add-question-numeric-range').off('click', 'button.btn-primary');

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
    $('#modal-add-question-numeric-range input').each(function(){
      $(this).val('');
    });

    $( '#accordion1' ).append ( render_numeric ( _q, detect_question_type ( _q ) ) );
    $( '#accordion1' ).accordion( 'refresh' );
    $('#accordion1').has('div.group').next().hide();
  });

  // Activación del botón de cancelar del modal
  $('#modal-add-question-numeric-range').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#modal-add-question-numeric-range input').each(function(){
      $(this).val('');
    });

  } );

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal-add-question-numeric-range').on('shown.bs.modal', function () {
    $('#form-add-question-numeric-range-title').focus();
  });



  // Añadir pregunta: Tolerancia numérica
  $('#add-question-numeric-tolerance').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Añadir pregunta: Tolerancia numérica' );
    }

    // Activamos el modal
    $('#modal-add-question-numeric-tolerance').modal();
  } );

  // Activación del botón del modal
  $('#modal-add-question-numeric-tolerance').on('click', 'button.btn-primary', function () {

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
    $('#modal-add-question-numeric-tolerance input').each(function(){
      $(this).val('');
    });

    $( '#accordion1' ).append ( render_numeric ( _q, detect_question_type ( _q ) ) );
    $( '#accordion1' ).accordion( 'refresh' );
    $('#accordion1').has('div.group').next().hide();
  });

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal-add-question-numeric-tolerance').on('shown.bs.modal', function () {
    $('#form-add-question-numeric-tolerance-title').focus();
  });


  // Activación del botón de cancelar del modal
  $('#modal-add-question-numeric-tolerance').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#modal-add-question-numeric-tolerance input').each(function(){
      $(this).val('');
    });

  } );


  // Añadir pregunta: Verdadero/falso
  $('#add-question-true-false').click( function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Añadir pregunta: Verdadero/falso' );
    }

    // Activamos el modal
    $('#modal-add-question-true-false').modal();
  } );

  // Activación del botón del modal
  $('#modal-add-question-true-false').on('click', 'button.btn-primary', function () {

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
  $('#modal-add-question-true-false').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#form-add-question-true-false-comment').val('');
    $('#form-add-question-true-false-title').val('');
    $('#form-add-question-true-false-text').val('');
    $('input[name="form-add-question-true-false-optradio"]:checked').prop('checked', false);
  } );

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal-add-question-true-false').on('shown.bs.modal', function () {
    $('#form-add-question-true-false-title').focus();
  });

  // Editar pregunta: redacción
  $('#accordion1').on('click', 'button.edit-question-true-false', function () {

    if ( PARSE_DEBUG ) {
      console.log ( 'Editar pregunta: redacción' );
    }

    var _id = $(this).parent().parent().parent().parent().parent().attr('id');

    $( '#modal-edit-question-true-false' ).attr ( 'target', _id );

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
    $('#modal-edit-question-true-false').modal();
  } );

  // Activación del botón de aceptar del modal
  $('#modal-edit-question-true-false').on('click', 'button.btn-primary', function () {

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
    $('#modal-edit-question-true-false input').each(function(){
      $(this).val('');
    });

    var _id = $( '#modal-edit-question-true-false' ).attr ( 'target' );

    $( '#' + _id ).replaceWith ( render_true_false ( _q, detect_question_type ( _q ) ) );
    $( '#accordion1' ).accordion( 'refresh' );
    $('#accordion1').has('div.group').next().hide();
  });

  // Activación del botón de cancelar del modal
  $('#modal-edit-question-true-false').on('click', 'button.btn-info', function () {

    // Limpiamos el formulario
    $('#modal-edit-question-true-false input').each(function(){
      $(this).val('');
    });

  } );

  // Programamos el foco en el primer campo para cuando se muestre por completo el modal
  $('#modal-edit-question-true-false').on('shown.bs.modal', function () {
    $('#form-edit-question-true-false-title').focus();
  });


/*
  // Prueba de validación
  $('#modal-test-validator-danger').click (function() {
    console.info ('Iniciando validación manual');
    $('#form-test-validator').validator('validate');
  });


  $('#menu-test-validator').click(function(){

  });
*/


/*

Para cada modal debemos capturar los siguientes eventos:

apertura {
  foco en el primer campo
  activación de la validación
    opciones
      deshabilitar submit (quitar data-dismiss del botón)
}

cierre {
  eliminación de la validación
}

pulsar submit {
  si validar
    ejecutar proceso
    ocultar el modal
}


*/
  // Modales a validar
  var v_mod = [
    'test-validator',
    'test-validator-B'
    ];

  for (var i in v_mod) {

    console.log ( 'Modal: ' + '#modal-'+v_mod[i]);
    console.log ( 'Formulario: ' + '#form-'+v_mod[i]);

/*
    $( 'body' ).on('shown.bs.modal', '#modal-'+v_mod[i], function () {
      console.log ( 'Modal mostrado');
    });
    */

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
  // for (var i in v_mod) {

    // console.log ( 'Modal: ' + '#modal-'+v_mod[i]);
    // console.log ( 'Formulario: ' + '#form-'+v_mod[i]);

/*
    $( 'body' ).on('shown.bs.modal', '#modal-'+v_mod[i], function () {
      console.log ( 'Modal mostrado');
    });
    */
/*

    $( 'body' ).on('shown.bs.modal', '#modal-test-validator', function () {
      // Activamos el primer campo del formulario
      $( '#form-test-validator input:first' ).focus();
      console.debug('Activando primer campo del modal de validación ' + '#modal-test-validator');

      $( '#modal-test-validator' ).data('submit-in-progress', 'false' );

      // Activamos la validación, desactivando submit si no valida
      $( '#form-test-validator' ).validator({disable:'true'}).on('submit', function (e) {
        console.debug('Submit en el modal de validación ' + '#modal-test-validator');
        if ( $( '#modal-test-validator' ).data('submit-in-progress') === 'false' ) {
          // FIXME: como el evento submit se dispara dos veces, comprobamos que sólo apliquemos una
          $( '#modal-test-validator' ).data('submit-in-progress', 'true');

          if (e.isDefaultPrevented()) {
            // handle the invalid form...
            console.error ('Error: validacion fallida ' + '#modal-test-validator');
            alert ('Error: validacion fallida ' + '#modal-test-validator');
          } else {
            // everything looks good!
            console.info ('Exito: validacion exitosa ' + '#modal-test-validator');
            alert ('Exito: validacion exitosa ' + '#modal-test-validator');
            $( '#modal-test-validator' ).modal("hide");
          }
        } else {
          $( '#modal-test-validator' ).data('submit-in-progress', 'false' );
        }
        return false;
      });
    });

    // Salir del modal: Eliminamos la validación, desactivamos el submit y limpiamos los datos
    $( 'body' ).on('hidden.bs.modal', '#modal-test-validator', function () {
      console.debug('Ocultando el modal de validación ' + '#modal-test-validator');
      $( '#modal-test-validator' ).removeData('submit-in-progress' );
      $( '#form-test-validator' ).validator('destroy').off('submit').find('input').each(function(){
        $(this).val('');
      });

    });

  // }

    $( 'body' ).on('shown.bs.modal', '#modal-test-validator-B', function () {
      // Activamos el primer campo del formulario
      $( '#form-test-validator-B input:first' ).focus();
      console.debug('Activando primer campo del modal de validación ' + '#modal-test-validator-B');

      $( '#modal-test-validator-B' ).data('submit-in-progress', 'false' );

      // Activamos la validación, desactivando submit si no valida
      $( '#form-test-validator-B' ).validator({disable:'true'}).on('submit', function (e) {
        console.debug('Submit en el modal de validación ' + '#modal-test-validator-B');
        if ( $( '#modal-test-validator-B' ).data('submit-in-progress') === 'false' ) {
          // FIXME: como el evento submit se dispara dos veces, comprobamos que sólo apliquemos una
          $( '#modal-test-validator-B' ).data('submit-in-progress', 'true');

          if (e.isDefaultPrevented()) {
            // handle the invalid form...
            console.error ('Error: validacion fallida ' + '#modal-test-validator-B');
            alert ('Error: validacion fallida ' + '#modal-test-validator-B');
          } else {
            // everything looks good!
            console.info ('Exito: validacion exitosa ' + '#modal-test-validator-B');
            alert ('Exito: validacion exitosa ' + '#modal-test-validator-B');
            $( '#modal-test-validator-B' ).modal("hide");
          }
        } else {
          $( '#modal-test-validator-B' ).data('submit-in-progress', 'false' );
        }
      });
    });

    // Salir del modal: Eliminamos la validación, desactivamos el submit y limpiamos los datos
    $( 'body' ).on('hidden.bs.modal', '#modal-test-validator-B', function () {
      console.debug('Ocultando el modal de validación ' + '#modal-test-validator-B');
      $( '#modal-test-validator-B' ).removeData('submit-in-progress' );
      $( '#form-test-validator-B' ).validator('destroy').off('submit').find('input').each(function(){
        $(this).val('');
      });

    });
*/

}
