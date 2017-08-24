

  const cloudBoundary = document.querySelector('.cloud-boundary');
  const bike = document.querySelector('.bike');
  const bmContainer = document.querySelector('#bm');
  const umbrellaAnimation = document.querySelector('.umbrella-animation');
  const rain = document.querySelector('.rain');
  let space;

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

  var umbrella = bodymovin.loadAnimation({
    container: umbrellaAnimation,
    renderer: 'svg',
    loop: false,
    autoplay: false,
    path: 'json/umbrella.json',
  });

  umbrella.setSpeed(2);

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

  const bikeMarker = document.querySelector('.bike__marker');
  const cloudBoundaryMarker = document.querySelector('.cloud-boundary__marker');

  const detectCollision = function(item1, item2) {
    return Math.sqrt((item2.left - item1.left) * (item2.left - item1.left) + (item2.top - item1.top) * (item2.top - item1.top));
  };

  // -------------------------------
  // Keyboard controls for the cloud
  // -------------------------------

  let cloudBoundaryAngle = 0;
  let cloudBoundaryVelocity = 0;
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
    } else if (e.keyCode === 32) {
      space = true;
    }
  });

  document.addEventListener('keyup', (e) => {
    if(e.keyCode === 37) {
      left = false;
    } else if (e.keyCode === 39) {
      left = false;
    } else if (e.keyCode === 32) {
      space = false;
    }
  });

  const step = function() {
    if(left || right) {
      if (cloudBoundaryVelocity < 2) {
        cloudBoundaryVelocity += 0.2;
      }
    }

    cloudBoundary.style.transform = `translateX(-50%) rotate(${cloudBoundaryAngle}deg)`

    if(cloudBoundaryVelocity > 0) {
      if(lastDirection === 'left') {
        cloudBoundaryAngle -= cloudBoundaryVelocity;
      } else if (lastDirection === 'right') {
        cloudBoundaryAngle += cloudBoundaryVelocity;
      }

      cloudBoundaryVelocity -= 0.05;
    } else {
      cloudBoundaryVelocity = 0;
    }

    let distanceFromCloud = detectCollision(bikeMarker.getBoundingClientRect(), cloudBoundaryMarker.getBoundingClientRect());

    if (distanceFromCloud < 80 && space) {
      if(!bmContainer.classList.contains('active')) {
        bmContainer.classList.add('active');
        umbrella.setDirection(1);
        umbrella.play();
      }
    } else {
      if(bmContainer.classList.contains('active')) {
        bmContainer.classList.remove('active');
        umbrella.setDirection(-1);
        umbrella.play();
      }
    }

    //
    if (space) {
      if(!rain.classList.contains('rain--active')) {
        rain.classList.add('rain--active');
      }
    } else {
      if(rain.classList.contains('rain--active')) {
        rain.classList.remove('rain--active');
      }
    }


    window.requestAnimationFrame(step);
  };

  window.requestAnimationFrame(step);
