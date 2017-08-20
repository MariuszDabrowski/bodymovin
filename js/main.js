(function() {

  var animation = bodymovin.loadAnimation({
    container: document.querySelector('#bm'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'json/data.json',
  });

  animation.setSpeed(1);

  var path = anime.path('.test');

  var motionPath = anime({
    targets: '.bike',
    translateX: path('x'),
    translateY: path('y'),
    rotate: path('angle'),
    easing: 'linear',
    duration: 15000,
    loop: true
  });

})();
