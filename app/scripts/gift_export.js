/* _jshint ignore: start */
/* jshint camelcase: false */
/* jshint multistr: false */
'use strict';


var accordion_to_GIFT = function accordion_to_GIFT ( _selector )
{
  var _GIFT_text = '';

  $(_selector).find('div.group').each (function () {
    var _title = $(this).find('span.question-title').text();
    var _type = $(this).find('span.question-type').attr('value');
    var _comment = $(this).find('p.question-comment').text();
    var _full_question = '';

    switch ( _type ) {
      case 'description':
        _full_question = $(this).find('p[name="question-text"]').text() + '\n\n';
      break;
      case 'essay':
        _full_question = $(this).find('p[name="question-text"]').text() + ' {}\n\n';
      break;
      case 'true-false':
        _full_question = $(this).find('p[name="question-text"]').text();
        _full_question += ' {' + $(this).find('div.radio').attr('value') + '}\n\n';
      break;
      case 'numeric-range':
        _full_question = $(this).find('p[name="question-text"]').text();
        _full_question += ' {#';
        _full_question += $(this).find('input[name="first"]').val();
        _full_question += '..';
        _full_question += $(this).find('input[name="second"]').val();
        _full_question += '}\n\n';
      break;
      case 'numeric-tolerance':
        _full_question = $(this).find('p[name="question-text"]').text();
        _full_question += ' {#';
        _full_question += $(this).find('input[name="first"]').val();
        _full_question += ':';
        _full_question += $(this).find('input[name="second"]').val();
        _full_question += '}\n\n';
      break;
      case 'matching':
        _full_question = $(this).find('p[name="question-text"]').text();
        _full_question += ' { ';

        $(this).find('span[name="match-separator"]').each(function() {
          _full_question += '=';
          _full_question += $(this).prev().attr('value');
          _full_question += ' -> ';
          _full_question += $(this).next().attr('value');
          _full_question += ' ';
        });

        _full_question += '}\n\n';
      break;
      case 'fill-blank-start':
        _full_question += '{';

        $(this).find('input[name="blank"]').each(function(){
          _full_question += '=';
          _full_question += $(this).val();
          _full_question += ' ';
        });

        _full_question += '} ';
        _full_question += $(this).find('span[name="question-text"]').text() + '\n\n';
      break;
      case 'fill-blank-middle':
        _full_question += $(this).find('span[name="question-text-first"]').text();
        _full_question += ' {';

        $(this).find('input[name="blank"]').each(function(){
          _full_question += '=';
          _full_question += $(this).val();
          _full_question += ' ';
        });

        _full_question += '} ';
        _full_question += $(this).find('span[name="question-text-second"]').text() + '\n\n';
      break;
      case 'fill-blank-end':
        _full_question += $(this).find('span[name="question-text"]').text();
        _full_question += ' {';

        $(this).find('input[name="blank"]').each(function(){
          _full_question += '=';
          _full_question += $(this).val();
          _full_question += ' ';
        });

        _full_question += '}\n\n';
      break;
      default:
        _full_question = '(UNKNOWN)' + $(this).find('p[name="question-text"]').text() + '\n\n';
    }

    if ( PARSE_DEBUG ) {
      console.debug ( '***------------------------------------------------------------------------------------***' );
      console.debug ( '*** accordion_to_GIFT - Tipo:         ' + _type );
      console.debug ( '*** accordion_to_GIFT - Título:       ' + _title );
      console.debug ( '*** accordion_to_GIFT - Comentario:   ' + _comment );
      console.debug ( '*** accordion_to_GIFT - Pregunta:     ' + _full_question );
      // console.debug ( '*** accordion_to_GIFT - HTML interno: ' + $(this).html() );
      console.debug ( '***------------------------------------------------------------------------------------***' );
    }
    _GIFT_text += '// ' + _comment + '\n';
    _GIFT_text += '::' + _title;
    _GIFT_text += '::' + _full_question;
  });

  return _GIFT_text;
}
