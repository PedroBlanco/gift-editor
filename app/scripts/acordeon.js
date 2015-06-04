/* jshint camelcase: false */
'use strict';

$(function() {
$( '#accordion1' )
  .accordion({
    header: '> div > div.acc_title',
    collapsible: true,
    heightStyle: 'content'
  })
  .sortable({
    axis: 'y',
//    handle: 'div.acc_title',
    handle: 'span.ui-accordion-header-icon',
    stop: function( event, ui ) {
      // IE doesn't register the blur when sorting
      // so trigger focusout handlers to remove .ui-state-focus
      ui.item.children( 'div.acc_title' ).triggerHandler( 'focusout' );

      // Refresh accordion to handle new order
      $( this ).accordion( 'refresh' );
    }
  });
});

$(function() {
$( '#accordion2' )
  .accordion({
    header: '> div > div.acc_title',
    collapsible: true,
    heightStyle: 'content'
  })
  .sortable({
    axis: 'y',
//    handle: 'div.acc_title',
    handle: 'span.ui-accordion-header-icon',
    stop: function( event, ui ) {
      // IE doesn't register the blur when sorting
      // so trigger focusout handlers to remove .ui-state-focus
      ui.item.children( 'div.acc_title' ).triggerHandler( 'focusout' );

      // Refresh accordion to handle new order
      $( this ).accordion( 'refresh' );
    }
  });
});



$('#button_gift_input').click( function () {
  try {
    parseText('#text_gift_input');
  } catch ( myException ) {
    console.error ('Exception: ' + myException );
    $.bootstrapGrowl( '<strong>Exception</strong>: ' +  myException, {
      type: 'error',
      align: 'center',
      width: 'auto'
    } );
  }
} );


function parseText ( selectorText )
{
  var _end = {'state':'not_begun', 'message':'Parsing not begun.'};
  var _origen = $(selectorText).val();
  console.debug ('Texto a parsear: ' + _origen );
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
            console.error ('SyntaxError exception: ' + _mensaje.message );
            throw 'SyntaxError exception: ' + _mensaje.message;
          } else {
            console.error ('Unknown exception: ' + _mensaje.message );
            throw 'Unknown exception: ' + _mensaje.message;
          }
        }
        if ( _mensaje.name !== 'SyntaxError' ) {
          var _texto = 'Titulo: "' + _mensaje[0].Title+ '"\n\nComentario: "' + _mensaje[0].Comment+ '"\n\nPregunta: "'+ _mensaje[0].Text.Question+ '"\n\nRespuesta: "' + _mensaje[0].Text.Answer + '"';
          // Mostramos la primera pregunta para asegurarnos que está todo bien
          $('#test_destination' ).text( _texto );
          // Creamos las preguntas como elementos
          render_questions ( _mensaje );
          _end.state = 'success';
          _end.message = 'Convirtiendo (' + selectorText + ') ' + _origen + '" a "' + _texto + '"';
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
      console.info ( _end.message );
      $.bootstrapGrowl( '<strong>Success</strong>: ' + _end.message, {
        type: 'info',
        align: 'center',
        width: 'auto'
      } );
      break;
    case 'warning':
      console.warn ( _end.message );
      $.bootstrapGrowl( '<strong>Warning</strong>: ' + _end.message, {
        type: 'warning',
        align: 'center',
        width: 'auto'
      } );
      break;
    case 'error':
      console.error ( _end.message );
      $.bootstrapGrowl( '<strong>Error</strong>: ' + _end.message, {
        type: 'error',
        align: 'center',
        width: 'auto'
      } );
      break;
    case 'not_begun':
      console.error ( _end.message );
      $.bootstrapGrowl( '<strong>Error/Not begun</strong>: ' +  _end.message, {
        type: 'error',
        align: 'center',
        width: 'auto'
      } );
      break;
    default:
      console.error ( 'Undefined error!' );
      $.bootstrapGrowl( '<strong>Error</strong>: Undefined error!', {
        type: 'error',
        align: 'center',
        width: 'auto'
      } );
  }


}

function render_questions ( _q, _dest = '' ) {

}
/*
for ( x in preguntas ) {

    $('<div>', {class='group'} ).appendTo('#accordion');
    var _nueva = $(''

    // ver http://stackoverflow.com/a/10619477
}
*/
