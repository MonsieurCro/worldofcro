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

  var cta_text = 'TO BE CONTINUED?';
  var cta_url = 'https://www.dealabs.com/discussions/jeux-steam-gratuits-gleam-woobox-etc-1071415';
  $('#box-share .box-content, #box-thanks .box-content, #box-won .box-content').after('<a href="' + cta_url + '" target="_blank"><button class="button cta">' + cta_text + '</button></a>');
});