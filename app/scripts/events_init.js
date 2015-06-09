/* jslint node: true */
/* jshint camelcase: false */
/* jslint multistr: true */
'use strict';



/*** Enlace de eventos ***/

var events_init = function events_init ()
{
  $('#button-process').click (function() {
    var mensaje = peg_parser.parse($('#text1').text() );
    var resultado = document.getElementById('text2');
    resultado.innerText = 'Titulo: ' + mensaje[0].Title+ '\n\nComentario: ' + mensaje[0].Comment+ '\n\nPregunta: '+ mensaje[0].Text.Question+ '\n\nRespuesta: &lt;' + mensaje[0].Text.Answer + '&gt;';

    console.debug (mensaje[0]);
    console.debug (resultado);
  });

  $('#button_example_1').click ( function () {parseExample(1);} );
  $('#button_example_2').click ( function () {parseExample(2);} );
  $('#button_example_3').click ( function () {parseExample(3);} );
  $('#button_example_4').click ( function () {parseExample(4);} );
  $('#button_example_extra').click ( function () {parseExample('extra');} );


  $('#hide-left-panel').click ( function () {
    $(this).parent().parent().hide('fast');
    $('#show-left-panel').show('fast');
    // TODO: Aumentar de tamaño el panel de preguntas
    if ( $('#center-panel').parent().hasClass ( 'col-sm-4' )) {
      $('#center-panel').parent().toggleClass('col-sm-4').toggleClass('col-sm-8');
    } else {
      $('#center-panel').parent().toggleClass('col-sm-8').toggleClass('col-sm-12');
    }
  } );

  $('#hide-right-panel').click ( function () {
    $(this).parent().parent().hide('fast');
    $('#show-right-panel').show('fast');
    // TODO: Aumentar de tamaño el panel de preguntas
    if ( $('#center-panel').parent().hasClass ( 'col-sm-4' )) {
      $('#center-panel').parent().toggleClass('col-sm-4').toggleClass('col-sm-8');
    } else {
      $('#center-panel').parent().toggleClass('col-sm-8').toggleClass('col-sm-12');
    }
  } );

  $('#show-left-panel').click ( function () {
    $(this).hide('fast');
    $('#left-panel').parent().show('fast');
    // TODO: Disminuir de tamaño el panel de preguntas
    if ( $('#center-panel').parent().hasClass ( 'col-sm-8' )) {
      $('#center-panel').parent().toggleClass('col-sm-4').toggleClass('col-sm-8');
    } else {
      $('#center-panel').parent().toggleClass('col-sm-8').toggleClass('col-sm-12');
    }
  } );

  $('#show-right-panel').click ( function () {
    $(this).hide('fast');
    $('#right-panel').parent().show('fast');
    // TODO: Disminuir de tamaño el panel de preguntas
    if ( $('#center-panel').parent().hasClass ( 'col-sm-8' )) {
      $('#center-panel').parent().toggleClass('col-sm-4').toggleClass('col-sm-8');
    } else {
      $('#center-panel').parent().toggleClass('col-sm-8').toggleClass('col-sm-12');
    }
  } );


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
    $('#accordion1').has('div.group').next().hide();
  } );


  $('#button_gift_output').click( function () {
    if ( PARSE_DEBUG ) {
      console.debug ( '> Generando GIFT: Inicio' );
    }

    $('#text_gift_input').val( accordion_to_GIFT ( '#accordion1' ) );

    if ( PARSE_DEBUG ) {
      console.debug ( '< Generando GIFT: Fin' );
    }
    /*
    // Mostramos los controles de salida del GIFT
    $('#text_gift_output').prev().show();
    $('#text_gift_output').show();

    // Ocultamos los controles de entrada de GIFT
    $('#text_gift_input').prev().hide();
    $('#text_gift_input').hide();
    $('#text_gift_input').next().hide();
    $('#text_gift_input').next().next().hide();
    */
  } );


  if ( $('#text_gift_input' ).val() === '' ) {
    $('#text_gift_input' ).val( '// Tipo: fill in the blanks - end\n::T1a::Two plus two\nequals {=four =4}\n\n// Tipo: fill in the blanks - middle\n::T1b::Two plus {=two =2}\nequals four.\n\n// Tipo: fill in the blanks - start\n::T1c::{=Two =2} plus two\nequals four.\n\n// Tipo: matching\n::Food for animals:: Which animal eats which food?\n{ =cat -> cat food =dog -> dog food =fish -> fish food }\n\n// Tipo: description/instructions (not really a question)\n::Descripción del examen::Este es un examen\nde prueba en el que no se pueden usar ni\nlápiz ni papel\n\n// Tipo essay\n::Opinión sobre texto de relleno::Escriba su\nopinión sobre si el texto de relleno\nllamado "Lorem ipsum dolor" debería actualizarse a\nlos tiempos o debería seguir intacto\n{}\n\n// Tipo: True/false\n::Lengua - codos::\n¿Puede usted llegar con su lengua a\ncualquiera de sus dos codos?\n{F}\n\n// Tipo: math tolerance question\n::Platos de un menú::¿Cuántos platos\ntiene un menú del día? {#2:1}\n\n// Tipo: math range question\n::Entre 3 y 7::Dígame un número entre\n3 y 7 {#3..7}\n' );
  }

  // FIXME: Es posible que haya que usar alguna de las dos siguientes líneas cada vez que alteremos el contenido de accordion1
  $('#accordion1:empty').info_on_empty ( '#accordion1-empty' );
  // $('#accordion1').has('div.group').next().hide();


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

    $("#modal_remove_question").modal();
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

    $("#modal_remove_all_questions").modal();
  } );
}
