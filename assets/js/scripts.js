(function() {
  $(function() {
    var $main, $window, lastY;
    $window = $(window);
    $main = $('main');
    lastY = 0;
    return $window.on('mousewheel', function(e) {
      var opacity, thisY;
      thisY = lastY - e.deltaY;
      opacity = thisY / 10000;
      console.log(1 - opacity, opacity);
      $('#fog').css('opacity', 1 - opacity);
      $('#sun').css('opacity', opacity);
      return lastY = thisY;
    });
  });

}).call(this);

//# sourceMappingURL=scripts.js.map
