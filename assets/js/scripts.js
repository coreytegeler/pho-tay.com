(function() {
  $(function() {
    var $body, $canvas, $home, $main, $nav, $photos, $spotlight, $window, canvas, changePhoto, clickNavLink, hoverNavLink, hoverThing, maskPaper, onScroll, resize, toggleThing, unhoverNavLink, unhoverThing;
    $window = $(window);
    $body = $('body');
    $main = $('main');
    $nav = $('nav');
    $home = $('#home');
    $photos = $('#photos');
    $spotlight = $('.spotlight');
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
    maskPaper = new paper.PaperScope;
    canvas = document.getElementById('canvas');
    $canvas = $(canvas);
    onScroll = function(e) {
      if ($('section.things').eq(0).offset().top - $window.scrollTop() <= 0) {
        return $nav.addClass('fixed');
      } else {
        return $nav.removeClass('fixed');
      }
    };
    resize = function() {
      return $canvas.css({
        width: $window.innerWidth(),
        height: $window.innerHeight()
      });
    };
    changePhoto = function(e) {
      var $curPhoto, $nextPhoto;
      $curPhoto = $('#photos .bg.show');
      $nextPhoto = $curPhoto.next();
      if (!$nextPhoto.length || !$nextPhoto.is('.bg')) {
        $nextPhoto = $('#photos .bg').first();
      }
      $curPhoto.removeClass('show');
      $nextPhoto.addClass('show');
      return $('.thing.opened').each(function(i, thing) {
        return toggleThing(thing);
      });
    };
    toggleThing = function(x) {
      var $inner, $more, $target, $thing, height;
      if ($(x).is('.thing')) {
        $thing = $(x);
      } else {
        $target = $(x.target);
        x.preventDefault();
        $thing = $target.parents('.thing');
      }
      $more = $thing.find('.more');
      $inner = $more.find('.inner');
      console.log($more);
      if (!$thing.is('.opened')) {
        hoverThing($thing);
        if ($inner.html().length) {
          height = $inner.innerHeight();
          $thing.addClass('opened');
          return $more.css('height', height);
        }
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
      return $('.hide').addClass('hidden');
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
    clickNavLink = function(e) {
      var slug;
      e.preventDefault();
      slug = $(this).attr('href').replace('#', '');
      return $.ajax({
        url: '/api?page=' + slug,
        dataType: 'html',
        error: function(jqXHR, status, err) {
          return console.log(jqXHR, status, err);
        },
        success: function(response, status, jqXHR) {
          return console.log(response);
        }
      });
    };
    hoverNavLink = function() {
      $main.addClass('no-mix');
      return $photos.addClass('navigating');
    };
    unhoverNavLink = function() {
      $main.removeClass('no-mix');
      return $photos.removeClass('navigating');
    };
    $('.thing .hover').on('mouseenter', hoverThing);
    $('.thing .hover').on('mouseleave', unhoverThing);
    $('.thing a.open').on('click', toggleThing);
    $('#photos').on('click', changePhoto);
    $('nav .button a').on('click', clickNavLink);
    $('nav .button a').on('mouseenter', hoverNavLink);
    $('nav .button a').on('mouseleave', unhoverNavLink);
    $window.scroll(onScroll).scroll();
    $window.resize(resize).resize();
  });

}).call(this);

//# sourceMappingURL=scripts.js.map
