/* _jshint ignore: start */
/* jshint camelcase: false */
/* jshint multistr: false */
'use strict';


var extract_question_GIFT = function extract_question_GIFT ( _body, _type )
{
  return '';
}


var accordion_to_GIFT = function accordion_to_GIFT ( _selector )
{
  var _GIFT_text = '';

  $(_selector).find('div.group').each (function () {
    var _title = $(this).find('span.question-title').text();
    var _type = $(this).find('span.question-type').text();
    var _comment = $(this).find('p.question-comment').text();
    var _question_body = $(this).find('div.question-body').html();
    var _question = extract_question_GIFT ( _question_body, _type );

    // if ( PARSE_DEBUG ) {
      console.debug ( '***------------------------------------------------------------------------------------***' );
      console.debug ( '*** accordion_to_GIFT - Título:     ' + _title );
      console.debug ( '*** accordion_to_GIFT - Tipo:       ' + _type );
      console.debug ( '*** accordion_to_GIFT - Comentario: ' + _comment );
      console.debug ( '*** accordion_to_GIFT - Pregunta:   ' + _question_body );
      console.debug ( '***------------------------------------------------------------------------------------***' );
    // }

  });
  _GIFT_text = 'Prueba de accordion_to_GIFT';
  return _GIFT_text;
}
