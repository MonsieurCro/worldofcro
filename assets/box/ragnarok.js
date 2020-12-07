$(document).ready(function(){
  // Bye bye footer-infos
  $('#box-footer').click(function(event){
    event.stopPropagation();
  });
  $('body').on('resultShown', function(){
    $('#box-footer').click(function(event){
      event.stopPropagation();
    });
  });

  $(window).on('gameLoad', function(){
    // Remove explosion
    explosion = function(){};

    // Add button
    /*setTimeout(function(){
      $('#box-game-panel #tuto').append('<button class="button">START</button>');
      $('#box-game-panel #tuto button').click(function(){
        $(this).parent().hide();
      });
    }, 0);*/
  });

  // Retry
  var retry_text = 'Vous pensez pouvoir faire mieux ?';
  var retry_btn = 'Je&nbsp;réessaye';

  $('#box-share .box-content, #box-thanks .box-content, #box-won .box-content').after('<div class="cta_text">' + retry_text + '</div><button id="retry" class="cta">' + retry_btn + '</button>');

  setTimeout(function(){
    $('#retry').click(function(){
      window.parent.postMessage("RELOAD_GAME", "*");
    });
  }, 0);

  // End
  var end_btn = 'TO BE CONTINUED?';
  var end_url = 'https://www.dealabs.com/discussions/jeux-steam-gratuits-gleam-woobox-etc-1071415';
  $('#box-share .box-content, #box-thanks .box-content, #box-won .box-content').after('<a href="' + end_url + '" target="_top"><button class="cta">' + end_btn + '</button></a>');
});