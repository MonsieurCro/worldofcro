document.addEventListener('DOMContentLoaded', function(){

  var flakes = [],
  canva = document.getElementById('snow-canva'),
  ctx = canva.getContext('2d'),
  flakeCount = 200,
  mX = -100,
  mY = -100;

  size(canva);

  function snow(){
    ctx.clearRect(0, 0, canva.width, canva.height);
    for(var i = 0; i < flakeCount; i++){
      var flake = flakes[i],
      x = mX,
      y = mY,
      minDist = 150,
      x2 = flake.x,
      y2 = flake.y;

      var dist = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y)),
      dx = x2 - x,
      dy = y2 - y;

      if(dist < minDist){
        var force = minDist / (dist * dist),
        xcomp = (x - x2) / dist,
        ycomp = (y - y2) / dist,
        deltaV = force / 2;

        flake.velX -= deltaV * xcomp;
        flake.velY -= deltaV * ycomp;
      } else {
        flake.velX *= .98;

        if(flake.velY <= flake.speed){
          flake.velY = flake.speed;
        }
        flake.velX += Math.cos(flake.step += .05) * flake.stepSize;
      }
      ctx.fillStyle = 'rgba(255, 255, 255, ' + flake.opacity + ')';
      flake.y += flake.velY;
      flake.x += flake.velX;
      if(flake.y >= canva.height || flake.y <= 0){
        reset(flake);
      }
      if(flake.x >= canva.width || flake.x <= 0){
        reset(flake);
      }
      ctx.beginPath();
      ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(snow);
  };

  function reset(flake){
    flake.x = Math.floor(Math.random() * canva.width);
    flake.y = 0;
    flake.size = (Math.random() * 5) + 2.5;
    flake.speed = (Math.random() * 5) - 1.2;
    flake.velY = flake.speed;
    flake.velX = 0;
    flake.opacity = (Math.random() * .5) + .3;
  };

  function init(){
    for(var i = 0; i < flakeCount; i++){
      var x = Math.floor(Math.random() * canva.width),
      y = Math.floor(Math.random() * canva.height),
      size = (Math.random() * 3) + .5,
      speed = (Math.random() * 1) - .2,
      opacity = (Math.random() * .5) + .3;

      flakes.push({
        speed: speed,
        velY: speed,
        velX: 0,
        x: x,
        y: y,
        size: size,
        stepSize: (Math.random()) / 30,
        step: 0,
        opacity: opacity
      });
    }
    snow();
  };

  /*canva.addEventListener('mousemove', function(e){
    mX = e.clientX,
    mY = e.clientY;
  });*/
    
  window.addEventListener('resize',function(){
    size(canva);
  });
  window.addEventListener('orientationchange',function(){
    size(canva);
  });

  function size(container){
    canva.width = container.offsetWidth;
    canva.height = container.offsetHeight;
  }
    
  init();

});