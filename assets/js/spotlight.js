(function() {
  var cursor, cursorPoint, root;

  cursorPoint = new Point(view.center.x * 1.5, view.center.y);

  cursor = new Path.Circle(cursorPoint, 100);

  cursor.name = 'cursor';

  cursor.center = cursorPoint;

  cursor.fillColor = 'white';

  root = $('body').data('root');

  project.importSVG(root + '/assets/img/logo.svg', function(logo) {
    var logoPoint;
    logoPoint = new Point(view.center.x / 2, view.center.y);
    logo.name = 'logo';
    logo.position = logoPoint;
    logo.fillColor = 'white';
    logo.scale(0.5);
    return $('body').scroll(function(e) {
      var scrollTop, winHeight;
      scrollTop = $('body').scrollTop();
      return winHeight = $('body').innerHeight();
    }).scroll();
  });

  view.onMouseMove = function(event) {
    return cursorPoint = event.point;
  };

  view.onFrame = function(event) {
    var cursorDelta, logo, logoDelta;
    cursorDelta = (cursorPoint - cursor.position) / 5;
    if (cursorDelta.length > 0.1 && (logo = project.getItem({
      name: 'logo'
    }))) {
      cursor.position += cursorDelta;
      logoDelta = {
        x: (Math.abs(cursor.position.x) - $(window).innerWidth()) * -1,
        y: (Math.abs(cursor.position.y) - $(window).innerHeight()) * -1
      };
      logo.rotate((cursorDelta.x + cursorDelta.y) / 3);
      return logo.position = logoDelta;
    }
  };

}).call(this);

//# sourceMappingURL=spotlight.js.map
