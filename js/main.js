(function() {

  const cludBoundary = document.querySelector('.cloud-boundary');
  const bike = document.querySelector('.bike');
  const bmContainer = document.querySelector('#bm');

  // ------------------------
  // Bodymovin bike animation
  // ------------------------

  var animation = bodymovin.loadAnimation({
    container: bmContainer,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'json/data.json',
  });

  animation.setSpeed(1);

  // ------------------------------
  // Anime.js animation around path
  // ------------------------------

  var path = anime.path('.outline');

  var motionPath = anime({
    targets: '.bike',
    translateX: path('x'),
    translateY: path('y'),
    rotate: path('angle'),
    easing: 'linear',
    duration: 15000,
    loop: true
  });

  // -----------------------------------------------
  // Detect collision between the bike and the cloud
  // -----------------------------------------------

  const dot = document.querySelector('.dot');

  const detectCollision = function(item1, item2) {
    

    return !(
      item1.right < item2.left ||
      item1.left > item2.right ||
      item1.bottom + 40 < item2.top ||
      item1.top > item2.bottom
    );
  };

  // -------------------------------
  // Keyboard controls for the cloud
  // -------------------------------

  let cludBoundaryAngle = 0;
  let cludBoundaryVelocity = 0;
  let left = false;
  let right = false;
  let lastDirection = '';

  document.addEventListener('keydown', (e) => {
    if(e.keyCode === 37) {
      left = true;
      lastDirection = 'left';
    } else if (e.keyCode === 39) {
      left = true;
      lastDirection = 'right';
    }
  });

  document.addEventListener('keyup', (e) => {
    if(e.keyCode === 37) {
      left = false;
    } else if (e.keyCode === 39) {
      left = false;
    }
  });

  const step = function() {
    if(left || right) {
      if (cludBoundaryVelocity < 2) {
        cludBoundaryVelocity += 0.2;
      }
    }

    cludBoundary.style.transform = `translateX(-50%) rotate(${cludBoundaryAngle}deg)`

    if(cludBoundaryVelocity > 0) {
      if(lastDirection === 'left') {
        cludBoundaryAngle -= cludBoundaryVelocity;
      } else if (lastDirection === 'right') {
        cludBoundaryAngle += cludBoundaryVelocity;
      }

      cludBoundaryVelocity -= 0.05;
    } else {
      cludBoundaryVelocity = 0;
    }

    if(detectCollision(bmContainer.getBoundingClientRect(), cludBoundary.getBoundingClientRect())) {
      if(!bmContainer.classList.contains('active')) {
        bmContainer.classList.add('active');
      } else {
        bmContainer.classList.remove('active');
      }
    }

    window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
})();
