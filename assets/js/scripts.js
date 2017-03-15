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
      winH = $(window).innerHeight() / 4;
      opacity = mouseY / winH;
      if (opacity <= 0) {
        opacity = 0;
      } else if (opacity >= 1) {
        opacity = 1;
      }
      $('#fog').css('opacity', opacity);
      return $('#sun').css('opacity', 1 - opacity);
    });
  });

}).call(this);

//# sourceMappingURL=scripts.js.map
