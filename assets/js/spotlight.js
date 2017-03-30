(function() {
  var logoTop, mousePoint, slWidth, spotlight;

  mousePoint = view.center;

  logoTop = view.center.y;

  slWidth = 100;

  spotlight = new Path.Circle(mousePoint, slWidth);

  spotlight.name = 'spotlight';

  spotlight.center = mousePoint;

  spotlight.fillColor = 'white';

  project.importSVG('/assets/img/logo.svg', function(logo) {
    logo.name = 'logo';
    logo.position = view.center;
    logo.fillColor = 'white';
    logo.scale(0.5);
    return $(window).scroll(function(e) {
      var scrollTop, winHeight;
      scrollTop = $(window).scrollTop();
      winHeight = $(window).innerHeight();
      return logoTop = (winHeight / 2) - scrollTop;
    }).scroll();
  });

  view.onMouseMove = function(event) {
    return mousePoint = event.point;
  };

  view.onFrame = function(event) {
    var logo, logoDelta, spotlightDelta;
    spotlightDelta = (mousePoint - spotlight.position) / 5;
    if (spotlightDelta.length > 0.1) {
      spotlight.position += spotlightDelta;
    }
    logo = project.getItem({
      name: 'logo'
    });
    if (logo) {
      logoDelta = (logoTop - logo.position.y) / 3;
      return logo.position.y += logoDelta;
    }
  };

  view.onResize = function(event) {
    var logo;
    if (logo = project.getItem({
      name: 'logo'
    })) {
      logo.position.x = view.center.x;
      return console.log(spotlight);
    }
  };

}).call(this);

//# sourceMappingURL=spotlight.js.map
