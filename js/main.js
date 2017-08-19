(function() {

  var animation = bodymovin.loadAnimation({
    container: document.querySelector('#bm'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: 'json/bike.json',
  });

  var path = anime.path('.test');

  var motionPath = anime({
    targets: '.bike',
    translateX: path('x'),
    translateY: path('y'),
    rotate: path('angle'),
    easing: 'linear',
    duration: 8000,
    loop: true
  });

})();
