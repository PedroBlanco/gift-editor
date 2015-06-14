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
      case 'multiple-choice-single-answer':
        _full_question = $(this).find('p[name="question-text"]').text();
        _full_question += ' {\n';

        $(this).find( 'span[name="incorrect-answer"]' ).each(function(){
          _full_question += '~' + $(this).text() + ' \n';
        });
        _full_question += '=' + $(this).find( 'span[name="correct-answer"]' ).text();

        _full_question += '\n}\n\n';
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


// Tomado de http://html5-demos.appspot.com/static/a.download.html
// TODO: ver #19
var download_GIFT_File = function download_GIFT_file()
{
  window.URL = window.webkitURL || window.URL;

  var prevLink = output.querySelector('a');
  if (prevLink) {
    window.URL.revokeObjectURL(prevLink.href);
    output.innerHTML = '';
  }

  var bb = new Blob([typer.textContent], {type: MIME_TYPE});

  // Creación del enlace destino
  var a = document.createElement('a');
  a.download = container.querySelector('input[type="text"]').value;
  a.href = window.URL.createObjectURL(bb);
  a.textContent = 'Download ready';

  a.dataset.downloadurl = [MIME_TYPE, a.download, a.href].join(':');
  a.draggable = true; // Don't really need, but good practice.
  a.classList.add('dragout');

  output.appendChild(a);

  a.onclick = function(e) {
    if ('disabled' in this.dataset) {
      return false;
    }

    cleanUpGIFT (this);
  };
};

var cleanUpGIFT = function cleanUpGIFT (a) {
  a.textContent = 'Downloaded';
  a.dataset.disabled = true;

  // Need a small delay for the revokeObjectURL to work properly.
  setTimeout(function() {
    window.URL.revokeObjectURL(a.href);
  }, 1500);
};
