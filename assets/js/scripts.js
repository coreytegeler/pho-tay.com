(function() {
  $(function() {
    var $about, $body, $canvas, $featured, $home, $main, $nav, $photos, $spotlight, $window, $wrapper, canvas, changePhoto, clickNavLink, clickThing, closeThings, ease, hoverNavLink, hoverThing, loadPage, maskPaper, onLoad, onScroll, openPage, page, resize, root, showPage, toggleAbout, toggleThing, transEnd, unhoverNavLink, unhoverThing;
    $window = $(window);
    $body = $('body');
    $wrapper = $('#wrapper');
    $main = $('main');
    $about = $('#about');
    $featured = $('#featured');
    $nav = $('nav');
    $home = $('#home');
    $photos = $('#photos');
    $spotlight = $('.spotlight');
    root = $body.data('root');
    page = $body.data('page');
    transEnd = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd';
    ease = 'cubic-bezier(0.645, 0.045, 0.355, 1.000)';
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
    changePhoto = function(e) {
      var $curPhoto, $nextPhoto;
      $curPhoto = $('#photos .bg.show');
      $nextPhoto = $curPhoto.next();
      if (!$nextPhoto.length || !$nextPhoto.is('.bg')) {
        $nextPhoto = $('#photos .bg').first();
      }
      $curPhoto.removeClass('show');
      $nextPhoto.addClass('show');
      return closeThings();
    };
    clickThing = function(e) {
      var $thing;
      if ($(e.currentTarget).attr('target')) {
        return;
      }
      $thing = $(e.currentTarget).parents('.thing');
      e.preventDefault();
      if (!$thing.is('.hidden')) {
        return toggleThing($thing);
      } else {
        return closeThings();
      }
    };
    toggleThing = function(thing) {
      var $mores, $siblings, $thing, savedHeight, top;
      $thing = $(thing);
      $mores = $thing.find('.more');
      if (!$thing.is('.opened')) {
        hoverThing($thing);
        $thing.addClass('opened');
        savedHeight = 0;
        $mores.each(function() {
          var $inner, $more, height;
          $more = $(this);
          $inner = $more.find('.inner');
          if ($inner.html().length) {
            height = $inner.innerHeight();
            if (height > savedHeight) {
              savedHeight = height;
            }
            return $more.transition({
              height: height
            }, 400, ease);
          }
        });
        return top = $thing.innerHeight() + $thing.offset().top + savedHeight;
      } else {
        $siblings = $thing.parents('.page').find('.thing').not($thing);
        $thing.removeClass('opened');
        $mores.each(function() {
          var $more;
          $more = $(this);
          return $more.transition({
            height: 0
          }, 600, ease);
        });
        return setTimeout(function() {
          return $siblings.removeClass('hidden');
        }, 600);
      }
    };
    hoverThing = function(x) {
      var $page, $siblings, $target, $thing;
      if ($(x).is('.thing')) {
        $thing = $(x);
      } else {
        $target = $(x.target);
        $thing = $target.parents('.thing');
      }
      $page = $thing.parents('.page');
      $siblings = $page.find('.thing');
      if ($thing.is('.opened') || $siblings.filter('.opened').length) {
        return;
      }
      $thing.addClass('hover').removeClass('hidden');
      if ($siblings.length) {
        $siblings.filter(':not(.hover)').addClass('hidden');
        return $('.hide').addClass('hidden');
      }
    };
    unhoverThing = function(x) {
      var $siblings, $target, $thing;
      if ($(x).is('.thing')) {
        $thing = $(x);
      } else {
        $target = $(x.target);
        $thing = $target.parents('.thing');
      }
      $siblings = $thing.parents('.page').find('.thing');
      if ($thing.is('.opened') || $siblings.filter('.opened').length) {
        return;
      }
      $thing.removeClass('hover');
      if (!$('.page .thing.hover').length) {
        $('.hide').removeClass('hidden');
        return $siblings.removeClass('hidden');
      }
    };
    closeThings = function() {
      return $('.thing.opened').each(function(i, thing) {
        toggleThing(thing);
        return unhoverThing(thing);
      });
    };
    clickNavLink = function(e) {
      var $curPage, $curThings, $nextPage, abouting, pageTop, slug, url;
      e.preventDefault();
      slug = $(this).data('slug');
      url = $(this).attr('href');
      $('nav .button a.selected').removeClass('selected');
      $curPage = $main.find('.page.show');
      $curThings = $curPage.find('article.thing');
      $nextPage = $('#' + slug);
      abouting = $about.is('.show');
      history.pushState(null, slug, url);
      if (slug === 'about') {
        if (abouting) {
          $nav.find('a.' + $curPage.attr('id')).addClass('selected');
          return toggleAbout(false);
        } else {
          $nav.find('a.about').addClass('selected');
          return toggleAbout(true);
        }
      } else {
        $nav.find('a.' + slug).addClass('selected');
        pageTop = $featured.offset().top + $featured.innerHeight() - 25;
        $wrapper.animate({
          scrollTop: pageTop + $wrapper.scrollTop()
        }, 500);
        if ($nextPage.is('.show')) {
          return;
        }
        if (abouting) {
          toggleAbout(false);
          return openPage(slug);
        } else {
          $curThings.removeClass('show');
          return $curThings.eq(0).on(transEnd, function() {
            openPage(slug);
            return $curThings.eq(0).off(transEnd);
          });
        }
      }
    };
    hoverNavLink = function() {
      return $photos.addClass('navigating');
    };
    unhoverNavLink = function() {
      return $photos.removeClass('navigating');
    };
    openPage = function(slug) {
      if (!$('#' + slug).is('.loaded')) {
        return loadPage(slug);
      } else {
        return showPage(slug);
      }
    };
    loadPage = function(slug) {
      var $page;
      $page = $('#' + slug);
      $page.addClass('loaded');
      return $.ajax({
        url: root + '/api?page=' + slug,
        dataType: 'html',
        error: function(jqXHR, status, err) {
          return console.log(jqXHR, status, err);
        },
        success: function(response, status, jqXHR) {
          $page.append(response);
          return showPage(slug);
        }
      });
    };
    showPage = function(slug) {
      var $page;
      $page = $('#' + slug);
      $('.page.show').removeClass('show');
      $page.addClass('show');
      $page.addClass('loaded');
      return $page.find('article.thing').each(function(i, thing) {
        return $(thing).imagesLoaded(function() {
          return $(thing).addClass('show');
        });
      });
    };
    toggleAbout = function(show) {
      if (show) {
        $wrapper.addClass('no-scroll');
        $main.addClass('hidden');
        return $about.addClass('show');
      } else {
        $wrapper.removeClass('no-scroll');
        $main.removeClass('hidden');
        return $about.removeClass('show');
      }
    };
    onLoad = function(page) {
      if (['music', 'shows', 'videos'].indexOf(page) >= 0) {
        $nav.find('a.' + page).addClass('selected');
        return openPage(page);
      } else if (page === 'about') {
        $nav.find('a.about').addClass('selected');
        openPage('music');
        return toggleAbout(true);
      } else {
        $nav.find('a.music').addClass('selected');
        return openPage('music');
      }
    };
    onScroll = function(e) {
      var featuredBottom, mainBottom;
      featuredBottom = $main.position().top + $featured.innerHeight();
      mainBottom = $main.position().top + $main.innerHeight() - $window.innerHeight();
      if (mainBottom <= 0) {
        return $nav.css({
          top: mainBottom
        });
      } else if (featuredBottom <= 0 || $about.is('.show')) {
        return $nav.css({
          top: 0
        });
      } else {
        $nav.removeClass('fixed');
        return $nav.css({
          top: featuredBottom
        });
      }
    };
    resize = function() {
      return $canvas.css({
        width: $window.innerWidth(),
        height: $window.innerHeight()
      });
    };
    $main.on('mouseenter', '.thing .hover', hoverThing);
    $main.on('mouseleave', '.thing .hover', unhoverThing);
    $main.on('click', '.thing a.open', clickThing);
    $('#photos').on('click', changePhoto);
    $('nav .button a').on('click', clickNavLink);
    $('nav .button a').on('mouseenter', hoverNavLink);
    $('nav .button a').on('mouseleave', unhoverNavLink);
    $wrapper.scroll(onScroll).scroll();
    $window.resize(resize).resize();
    onLoad(page);
  });

}).call(this);

//# sourceMappingURL=scripts.js.map
