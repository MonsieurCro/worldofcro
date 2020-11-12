$(document).ready(function(){
  // Home
  var logo = 'https://monsieurcro.github.io/worldofcro/assets/logoS1.png';
  var hero = 'https://monsieurcro.github.io/worldofcro/assets/ship.png';
  var mini = 'https://monsieurcro.github.io/worldofcro/assets/cro.png';

  $('#box-home #box-button-home').appendTo('#box-home #box-home-prompt');

  $('#box-home').append([
    $('<img id="logo" src="' + logo + '"/>'),
    $('<img id="hero" class="swing" src="' + hero + '"/>'),
  ]);

  // Wrapper
  $('#box-home-optin, label[for="box-home-optin"]').wrapAll('<div class="terms"></div>');

  // Bye bye footer-infos
  $('#box-footer').click(function(event){
    event.stopPropagation();
  });
  $('body').on('resultShown', function(){
    $('#box-footer').click(function(event){
      event.stopPropagation();
    });
  });

  // Progress infos
  var progr = 0;
  var points = '0';
  var escale = 1;
  var distance = ($('#box').width() - 84);
  var position = 0;
  var answer = null;

  $('body').on('gameLoad', function(){
    escale = $('[class*="ball"]').length;

    $('#middle').append([
      $('<span class="ball" id="ball0" style="position:absolute;left:0;background-color:white;border:1px solid white;transform:translate(-50%,5%);"></span>'),
      $('<span class="ball" id="ball99" style="position:absolute;left:100%;right:0;background-color:#BB4158;border:1px solid #BB4158;transform:translate(-50%,5%);"></span>'),,
      $('<img id="plane" src="' + mini + '"/>')
    ]);

    // Recover progress
    $('#plane').css({'left':$('#current').width()});

    //$('.thumbs #up').addClass('animated slideInLeft');
    //$('.thumbs #down').addClass('animated slideInRight');

    // Send theme color to parent
    postMessage($('#box .response').css('background-color'));
  });

  $('body').on('question', function(){
    progr = luckycycle.answer.length;
    points = $('#points').text();
    distance = ($('#box').width() - 84);
    position = (distance * (1/(escale + 1)) * progr);
    answer = (luckycycle.answer[progr - 1]).toUpperCase();

    // Update node status
    if(progr >= 1){
      var status = null;
      $('#ball' + progr).addClass('neutral');

      setTimeout(function(){
        if($('#ball' + progr).hasClass('green') || $('#end').hasClass('green')){
          status = 'green';
        }
        else if($('#ball' + progr).hasClass('red') || $('#end').hasClass('red')){
          status = 'red';
        }

        $('#ball' + (progr - 1)).removeClass('green red neutral').addClass(status);
      }, 400);
    };

    // Move character
    $('#plane').css({'left':position});

    // Send theme color to parent
    setTimeout(function(){
      postMessage($('#box .response').css('background-color'));
    }, 1750);
  });

  $('body').on('resultShown', function(){
    // Send theme color to parent
    setTimeout(function(){
      postMessage('#95B2D9');
    }, 1751);
  });

  // postMessage
  function postMessage(param){
    window.parent.postMessage(param, '*');
    //console.log(param);
  };

  // Preload game assets
  function preload(array){
    $('#box').append('<div id="preload" style="display:none;"></div>');

    $(array).each(function(){
        $('<img />').attr('src', this).appendTo('#preload');
    });
  };

  preload([
    'https://monsieurcro.github.io/worldofcro/assets/question.png',
    'https://monsieurcro.github.io/worldofcro/assets/background_1.jpg',
    'https://monsieurcro.github.io/worldofcro/assets/front_1.png',
    'https://monsieurcro.github.io/worldofcro/assets/right.png',
    'https://monsieurcro.github.io/worldofcro/assets/wrong.png',
    'https://monsieurcro.github.io/worldofcro/assets/background_2.jpg',
    'https://monsieurcro.github.io/worldofcro/assets/front_2.png',
    'https://monsieurcro.github.io/worldofcro/assets/background_3.jpg',
    'https://monsieurcro.github.io/worldofcro/assets/front_3.png',
    'https://monsieurcro.github.io/worldofcro/assets/background_4.jpg',
    'https://monsieurcro.github.io/worldofcro/assets/front_4.png',
    'https://monsieurcro.github.io/worldofcro/assets/background_5.jpg',
    'https://monsieurcro.github.io/worldofcro/assets/front_5.png',
    'https://monsieurcro.github.io/worldofcro/assets/background_6.jpg',
    'https://monsieurcro.github.io/worldofcro/assets/front_6.png',
    'https://monsieurcro.github.io/worldofcro/assets/background_7.jpg',
    'https://monsieurcro.github.io/worldofcro/assets/front_7.png',
    'https://monsieurcro.github.io/worldofcro/assets/background_8.jpg',
    'https://monsieurcro.github.io/worldofcro/assets/front_8.png',
    'https://monsieurcro.github.io/worldofcro/assets/background_9.jpg',
    'https://monsieurcro.github.io/worldofcro/assets/front_9.png',
    'https://monsieurcro.github.io/worldofcro/assets/end.png',
    'https://a.luckycycle.com/uploads/img/img/21264/79.jpg',
    'https://a.luckycycle.com/uploads/img/img/21265/46.jpg',
    'https://a.luckycycle.com/uploads/img/img/21262/03.jpg'
  ]);
});