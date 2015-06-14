/* jslint node: true */
/* jshint camelcase: false */
/* jslint multistr: true */
'use strict';

/*** Configuración general y registro de eventos ***/

// var PARSE_DEBUG = true;
var PARSE_DEBUG = false;

// var MODAL_DEBUG = true;
var MODAL_DEBUG = false;

if ( PARSE_DEBUG ) {
  var GROWL_DELAY = 0;
} else {
  var GROWL_DELAY = 3000;
}

console.log('Iniciando Editor GIFT: GBL-1');

init_accordion ();

events_init ();

modal_events_init ();
