(function() {
  var $wrapper, circle, circlePoint, invert, logo, rect, root;

  $wrapper = $('#wrapper');

  rect = new Shape.Rectangle(0, 0, $(window).innerWidth(), $(window).innerHeight());

  rect.fillColor = 'white';

  circlePoint = new Point(view.center.x, view.center.y);

  circle = new Path.Circle(circlePoint, 100);

  circle.name = 'circle';

  circle.center = circlePoint;

  circle.fillColor = 'white';

  circle.blendMode = 'difference';

  root = $('body').data('root');

  logo = null;

  project.importSVG(root + '/assets/img/logo.svg', function(logo) {
    var logoPoint;
    logoPoint = new Point(view.center.x, view.center.y / 2);
    logo.name = 'logo';
    logo.position = logoPoint;
    logo.fillColor = 'white';
    logo.blendMode = 'difference';
    return $wrapper.addClass('loa');
  });

  $wrapper.scroll(function(e) {
    var scrollTop;
    return scrollTop = $(this).scrollTop();
  });

  invert = null;

  view.onMouseMove = function(event) {
    return circlePoint = event.point;
  };

  invert = new Group();

  view.onFrame = function(event) {
    var circleDelta, logoDelta, y;
    circleDelta = (circlePoint - circle.position) / 5;
    if (circleDelta.length > 0.1 && (logo = project.getItem({
      name: 'logo'
    }))) {
      circle.position += circleDelta;
      logoDelta = {
        x: (Math.abs(circle.position.x) - $(window).innerWidth()) * -1,
        y: (Math.abs(circle.position.y) - $(window).innerHeight()) * -1
      };
      logo.rotate((circleDelta.x + circleDelta.y) / 2);
      logo.position = logoDelta;
      if (invert) {
        invert.removeChildren();
      }
    }
    rect.position.x = $(window).innerWidth() / 2;
    rect.set({
      size: [$(window).innerWidth(), $(window).innerHeight()]
    });
    if ($('#about').is('.show')) {
      return rect.position.y = $(window).innerHeight() / 2;
    } else {
      y = -$wrapper.scrollTop() + $(window).innerHeight() / 2;
      return rect.position.y = y;
    }
  };

}).call(this);

//# sourceMappingURL=canvas.js.map
