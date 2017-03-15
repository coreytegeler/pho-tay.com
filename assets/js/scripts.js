(function() {
  $(function() {
    var $main, $window;
    $window = $(window);
    $main = $('main');
    Marquee3k({
      selector: '.marquee'
    });
    return $main.on('mousemove', function(e) {
      var mouseY, opacity, winH;
      mouseY = e.offsetY;
      winH = $(window).innerHeight() / 2;
      opacity = mouseY / winH;
      if (opacity <= 0) {
        opacity = 0;
      } else if (opacity >= 1) {
        opacity = 1;
      }
      $('#fog').css('opacity', 1 - opacity);
      return $('#sun').css('opacity', opacity);
    });
  });

}).call(this);

//# sourceMappingURL=scripts.js.map
