/* jshint camelcase: false */
'use strict';


var init_accordion = function init_accordion ()
{
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
}


jQuery.fn.info_on_empty = function ( _selector ) {
  $( _selector ).show();
  if ( PARSE_DEBUG ) { console.debug ( 'Mostrando ' + _selector ); }
};
