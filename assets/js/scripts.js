(function() {
  $(function() {
    var $body, $follow, $home, $logo, $main, $window, changePhoto, hoverThing, time, toggleThing, unhoverThing;
    $window = $(window);
    $body = $('body');
    $main = $('main');
    $home = $('#home');
    $follow = $('.follow');
    $logo = $('#logo');
    Marquee3k({
      selector: '.marquee'
    });
    $('.bg').each(function(i, bg) {
      var $bg, image, imgUrl;
      $bg = $(bg);
      if (imgUrl = $bg.data('image')) {
        image = new Image;
        image.src = imgUrl;
        return $(image).on('load', function(image) {
          $bg.css({
            'backgroundImage': 'url(' + image.target.src + ')'
          });
          if (i === 0) {
            return $bg.addClass('show');
          }
        });
      }
    });
    time = 5000;
    setInterval(function() {
      var height, width, x, y, z;
      width = window.innerWidth;
      height = window.innerHeight;
      x = (Math.floor((Math.random() * 3) + 1)) * (Math.round(Math.random()) * 2 - 1);
      y = (Math.floor((Math.random() * 3) + 1)) * (Math.round(Math.random()) * 2 - 1);
      z = (Math.floor((Math.random() * 3) + 1)) * (Math.round(Math.random()) * 2 - 1);
      return $logo.transition({
        x: x,
        y: y,
        rotate: z
      }, time);
    }, time);
    $window.on('mousemove', function(e) {
      var mouseX, mouseY, winH;
      mouseY = e.clientY;
      mouseX = e.clientX;
      winH = $(window).innerHeight();
      return $follow.css({
        x: mouseX,
        y: mouseY
      });
    });
    changePhoto = function(e) {
      var $curPhoto, $nextPhoto;
      $curPhoto = $('.bg.show');
      $nextPhoto = $curPhoto.next();
      if (!$nextPhoto.length || !$nextPhoto.is('.bg')) {
        $nextPhoto = $('.bg').first();
      }
      $curPhoto.removeClass('show');
      $nextPhoto.addClass('show');
      return $('.thing.opened').each(function(i, thing) {
        $(thing).removeClass('opened');
        return unhoverThing($(thing));
      });
    };
    toggleThing = function(e) {
      var $inner, $more, $target, $thing;
      e.preventDefault();
      $target = $(e.target);
      $thing = $target.parents('.thing');
      $more = $thing.find('.more');
      $inner = $more.find('.inner');
      if (!$thing.is('.opened')) {
        hoverThing($thing);
        return $thing.addClass('opened');
      } else {
        $thing.removeClass('opened');
        unhoverThing($thing);
        return $more.css('height', '');
      }
    };
    hoverThing = function(x) {
      var $siblings, $target, $thing;
      if ($(x).is('.thing')) {
        $thing = $(x);
      } else {
        $target = $(x.target);
        $thing = $target.parents('.thing');
      }
      $siblings = $thing.parents('section').find('.thing');
      if ($thing.is('.opened') || $siblings.filter('.opened').length) {
        return;
      }
      $thing.addClass('hover').removeClass('hidden');
      $('.hide').addClass('hidden');
      return $siblings.each(function(i, elem) {
        if (!$(elem).is($thing) && !$(elem).is('.hover')) {
          return setTimeout(function() {
            return $(elem).addClass('hidden');
          }, i * 10);
        }
      });
    };
    unhoverThing = function(x) {
      var $siblings, $target, $thing;
      if ($(x).is('.thing')) {
        $thing = $(x);
      } else {
        $target = $(x.target);
        $thing = $target.parents('.thing');
      }
      $siblings = $thing.parents('section').find('.thing');
      if ($thing.is('.opened') || $siblings.filter('.opened').length) {
        return;
      }
      $thing.removeClass('hover');
      if (!$('.thing.hover').length) {
        $('.hide').removeClass('hidden');
        return $siblings.each(function(i, elem) {
          return setTimeout(function() {
            return $(elem).removeClass('hidden');
          }, i * 10);
        });
      }
    };
    $('.thing .hover').on('mouseenter', hoverThing);
    $('.thing .hover').on('mouseleave', unhoverThing);
    $('.thing a.open').on('click', toggleThing);
    $('#photos').on('click', changePhoto);
  });

}).call(this);

//# sourceMappingURL=scripts.js.map
