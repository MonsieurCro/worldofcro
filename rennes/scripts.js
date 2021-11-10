$(document).ready(function() {
  // Items
  const troupeauRennes = [
    "./assets/chainsaw-level1_6436e.svg",
    "./assets/chainsaw-level2_42719.svg",
    "./assets/clown-level1_75a4d.svg",
    "./assets/clown-level2_0c9f7.svg",
    "./assets/death-level1_a0e67.svg",
    "./assets/death-level2_428ba.svg",
    "./assets/devil-level1_ad24b.svg",
    "./assets/devil-level2_e578f.svg",
    "./assets/mummy-level1_b8043.svg",
    "./assets/mummy-level2_7ba99.svg",
    "./assets/skeleton-level1_cc6b5.svg",
    "./assets/skeleton-level2_f7da1.svg",
    "./assets/vampire-level1_528bf.svg",
    "./assets/vampire-level2_4f880.svg",
    "./assets/witch-level1_7d1d1.svg",
    "./assets/witch-level2_59b65.svg"
  ];

  // Variables
  var score = 0;
  var timer = 30;
  var challenge = false;
  var delay = 3;
  var loading = null;
  var countdown = null;
  var player = undefined;
  try { if (localStorage.getItem('RC_player')) player = localStorage.getItem('RC_player'); } catch (e) { console.log(e); };

  $('#score > span').text(score);
  $('#timer > span').text(timer);
  $('#mode').html(challenge ? 'Zen' : 'Défi');
  $('#delay > h3').text(delay);

  // Functions
  function startGame() {
    setTimeout(function() {
      $('#start').fadeOut(1000, function() {
        $(this).remove();
        $('#mode, #scores, #score').removeClass('hidden');

        if (challenge) {
          challengeMode();
        } else {
          newTarget();
        };
      });
    }, 1500);
  };
  function resetGame() {
    clearInterval(loading);
    clearInterval(countdown);
    $('.renne').remove();

    score = 0;
    timer = 30;

    $('#score > span').text(score);
    $('#timer').addClass('hidden').one('transitionend webkitTransitionEnd oTransitionEnd', function() { $(this).children('span').text(timer); });
    $('#mode').html(challenge ? 'Zen' : 'Défi');
    $('#delay').addClass('hidden').one('transitionend webkitTransitionEnd oTransitionEnd', function() { $(this).children('h3').text(delay).removeClass('beat'); });
    $('#result').addClass('hidden');

    if (challenge) {
      challengeMode();
    } else {
      newTarget();
    };
  };
  function updateScore() {
    score++;
    $('#score > span').text(score);
  };
  function newTarget() {
    let em = parseFloat($('html').css('font-size'));
    let renne = {}

    renne.type = troupeauRennes[Math.floor(Math.random() * troupeauRennes.length)];
    renne.taille = Math.floor((Math.random() * em * 9) + em);
    renne.taille >= $(document).width() / 4 ? $(document).width() / 4 : renne.taille;
    renne.posX = Math.floor(Math.random() * ($(document).width() - renne.taille));
    renne.posY = Math.floor(Math.random() * ($(document).height() - renne.taille));

    $('body').append('<img id="renne-' + score + '" class="renne" src="' + renne.type + '" style="width:' + renne.taille + 'px;left:' + renne.posX + 'px;top:' + renne.posY + 'px;">').fadeIn(500);

    // TargetEliminated
    $('#renne-' + score).click(function() {
      $(this).remove();
      updateScore();
      newTarget();
    });
  };
  function challengeMode() {
    $('#delay').removeClass('hidden');
    $('#delay > h3').addClass('beat').one('animationend webkitAnimationEnd oAnimationEnd', function() { $(this).removeClass('beat'); });

    let load = delay;
    loading = setInterval(function() {
      load > 0 ? load-- : 0;

      if (load <= 0) {
        clearInterval(loading);
        $('#delay').addClass('hidden');

        newTarget();
        $('#timer').removeClass('hidden');

        let left = timer;
        countdown = setInterval(function() {
          left > 0 ? left-- : 0;

          if (left <= 0) {
            clearInterval(countdown);
            $('#timer').addClass('hidden');
            $('.renne').remove();
            $('.card > .content > .bubble').text(score);
            $('.card > .content > img').attr('src', troupeauRennes[Math.floor(Math.random() * troupeauRennes.length)]);
            $('.card > .text').html(score == 1 ? 'Renne&nbsp;capturé' : 'Rennes&nbsp;capturés');

            if (player && score) {
              let gameData = { player: player, score: score, date: Date.now() };
              try {
                $.post('https://crocro.glitch.me/newgame/Halloween2021', gameData, function(data, status) {
                  //if (status == 'success') { console.log(data); };
                });
              } catch(e) { console.log(e); }
            }

            $('#result').removeClass('hidden');
          } else {
            $('#timer > span').text(left);
          }
        }, 1000);
      } else {
        $('#delay > h3').text(load).addClass('beat').one('animationend webkitAnimationEnd oAnimationEnd', function() { $(this).removeClass('beat'); });
      };
    }, 1500);
  };

  // Let's go
  $('#welcome').click(function() {
    $(this).fadeOut(1000, function() {
      $(this).addClass('hidden');
      if (player) {
        $('#success').removeClass('hidden');
        startGame();
      } else {
        $('#form').removeClass('hidden');

        $('#confirm').click(function() {
          if ($('#player').val() && $('#player').val().length > 2) {
            player = $('#player').val();
            try { localStorage.setItem('RC_player', player); } catch (e) { console.log(e); };

            $('#form').fadeOut(1000, function() {
              $(this).addClass('hidden');
              $('#success').removeClass('hidden');
              startGame();
            });
          } else { $('#player').addClass('error').focus(); };
        });
      };
    });
  });
  // Switch mode
  $('#mode').click(function() {
    challenge = !challenge;
    resetGame();
  });
  // HighScores
  $('#scores').click(function() {
    $('#highscores > ul').html('Chargement…');
    $('#highscores').removeClass('hidden');

    try {
      $.get('https://crocro.glitch.me/highscores/Halloween2021', function(data, status) {
        if (status == 'success' && Object.keys(data).length > 0) {
          Object.keys(data).forEach(function(key) {
            $('#highscores > ul').html('').append('<li><span>' + key + '</span><span>' + data[key] + '</span></li>');
          });
        } else {
          $('#highscores > ul').html('Une erreur est survenue.');
        };
      });
    } catch(e) { console.log(e); }
  });
  $('#highscores > .close').click(function() {
    $('#highscores').addClass('hidden');
  });
  // Replay
  $('#retry').click(function() {
    resetGame();
  });

  // NoOutOfBoundTarget
  $(window).on('resize orientationchange', function() {
    if ($('.renne').length > 0) {
      $('.renne').remove();
      newTarget();
    };
  });
});