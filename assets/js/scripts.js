(function() {
  $(function() {
    var $about, $black, $body, $canvas, $featured, $fixings, $footer, $home, $main, $nav, $pages, $window, $wrapper, changePhoto, clickAboutToggle, clickNavLink, clickThing, clickWrapper, closeThings, defineSide, ease, handlePage, holdPlace, hoverNavLink, hoverThing, loadPage, onBrowserNav, onLoad, onScroll, openPage, page, resize, resizeVideo, root, scrollNavLink, showPage, toggleAbout, toggleThing, transEnd, unhoverNavLink, unhoverThing;
    $window = $(window);
    $body = $('body');
    $wrapper = $('#wrapper');
    $main = $('main');
    $footer = $('footer');
    $about = $('#about');
    $featured = $('#featured');
    $pages = $('#pages');
    $nav = $('nav');
    $home = $('#home');
    $fixings = $('#fixings');
    $black = $('#black');
    $canvas = $('#canvas');
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
    changePhoto = function(e) {
      var $curPhoto, $nextPhoto;
      $curPhoto = $('#fixings .bg.show');
      $nextPhoto = $curPhoto.next();
      if (!$nextPhoto.length || !$nextPhoto.is('.bg')) {
        $nextPhoto = $('#fixings .bg').first();
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
      var $embeds, $group, $mores, $siblings, $thing, savedHeight, slug, thingTop;
      $thing = $(thing);
      page = $thing.parents('.page').attr('id');
      slug = $thing.attr('data-slug');
      $group = $thing.parents('.group');
      $mores = $thing.find('.more');
      $embeds = $thing.find('.embed');
      if (!$thing.is('.opened')) {
        hoverThing($thing);
        $thing.addClass('opened');
        if (!$group.is('.half')) {
          thingTop = $thing.offset().top + $wrapper.scrollTop() - 25;
          $wrapper.animate({
            scrollTop: thingTop
          }, 500);
        }
        savedHeight = 0;
        return $embeds.each(function(i, embed) {
          var $embed;
          $embed = $(embed);
          return $.ajax({
            url: root + '/api?page=' + page + '&slug=' + slug,
            dataType: 'html',
            error: function(jqXHR, status, err) {
              return console.log(jqXHR, status, err);
            },
            success: function(embed, status, jqXHR) {
              var $parent, newHeight;
              if (!$embed.html().length) {
                $embed.append(embed);
              }
              if ($thing.is('.video')) {
                $parent = $embed.parents('.display');
                $parent.addClass('play');
              } else {
                $parent = $embed.parents('.more .inner');
                $embed.addClass('show');
              }
              newHeight = $embed.innerHeight();
              $parent.css({
                height: newHeight
              });
              resizeVideo();
              $group.masonry('layout');
              return $mores.each(function() {
                var $inner, $more, height;
                $more = $(this);
                $inner = $more.find('.inner');
                if ($inner.html().length) {
                  height = $inner.innerHeight();
                  if (height > savedHeight) {
                    savedHeight = height;
                  }
                  $more.css({
                    height: height
                  });
                  return $group.masonry('layout');
                }
              });
            }
          });
        });
      } else {
        $group = $thing.parents('.group');
        $siblings = $group.find('.thing');
        $thing.removeClass('opened');
        $mores.each(function() {
          var $embed, $more;
          $more = $(this);
          $embed = $more.find('.embed');
          setTimeout(function() {
            return $more.css({
              height: 0
            });
          }, 400);
          $group.masonry('layout');
          if ($embed.length && !$thing.is('.opened')) {
            $embed.removeClass('show');
            return setTimeout(function() {
              if (!$thing.is('.opened')) {
                return $embed.html('');
              }
            }, 400);
          }
        });
        return $embeds.each(function(i, embed) {
          var $display, $embed;
          $embed = $(embed);
          $display = $embed.parents('.display');
          $display.removeClass('play');
          return $display.css({
            height: 'auto'
          });
        });
      }
    };
    hoverThing = function(x) {
      var $group, $siblings, $target, $thing;
      if ($(x).is('.thing')) {
        $thing = $(x);
      } else {
        $target = $(x.target);
        $thing = $target.parents('.thing');
      }
      $group = $thing.parents('.group');
      $siblings = $group.find('.thing');
      if ($thing.is('.opened') || $siblings.filter('.opened').length) {
        return;
      }
      $thing.addClass('hover');
      $thing.removeClass('hidden');
      if ($siblings.length && !$group.is('.half')) {
        $siblings.filter(':not(.hover)').addClass('hidden');
        if ($thing.find('.display').is('.image')) {
          return $('.hide').addClass('hidden');
        }
      }
    };
    unhoverThing = function(x) {
      var $group, $siblings, $target, $thing;
      if ($(x).is('.thing')) {
        $thing = $(x);
      } else {
        $target = $(x.target);
        $thing = $target.parents('.thing');
      }
      $group = $thing.parents('.group');
      $siblings = $group.find('.thing');
      if ($thing.is('.opened') || $siblings.filter('.opened').length) {
        return;
      }
      $thing.removeClass('hover');
      if (!$('.page .thing.hover').length && !$group.is('.half')) {
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
      var slug, url;
      e.preventDefault();
      slug = $(this).data('slug');
      url = $(this).attr('href');
      history.pushState({
        slug: slug
      }, slug, url);
      return handlePage(slug);
    };
    scrollNavLink = function(e) {
      var delta;
      delta = e.originalEvent.deltaY;
      return $wrapper.scrollTop($wrapper.scrollTop() + delta);
    };
    handlePage = function(slug) {
      var $curPage, $curThings, $nextPage, abouting, pageTop;
      $curPage = $main.find('.page.show');
      $curThings = $curPage.find('.thing');
      $nextPage = $('#' + slug);
      abouting = $about.is('.show');
      $('nav .button a.selected').removeClass('selected');
      $nav.find('a.' + slug).addClass('selected');
      pageTop = $pages.offset().top;
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
    };
    hoverNavLink = function() {
      return $fixings.addClass('navigating');
    };
    unhoverNavLink = function() {
      return $fixings.removeClass('navigating');
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
      holdPlace(slug);
      $page.find('.grid').masonry({
        itemSelector: '.thing',
        percentPosition: true,
        transitionDuration: 0
      });
      return $page.find('.thing').each(function(i, thing) {
        $(thing).addClass('show');
        return $(thing).imagesLoaded(function() {
          $(thing).addClass('loaded');
          $(thing).find('.display.image').css({
            height: 'auto'
          });
          $page.find('.grid').masonry('layout');
          return defineSide(thing);
        });
      });
    };
    holdPlace = function() {
      var $displays;
      $displays = $('.page.show .thing .display.image:not(.play)');
      return $displays.each(function(i, display) {
        var imgHeight, imgWidth, newHeight, ratio;
        imgHeight = $(display).data('height');
        imgWidth = $(display).data('width');
        ratio = imgHeight / imgWidth;
        newHeight = $(display).innerWidth() * ratio;
        return $(display).css({
          'height': newHeight
        });
      });
    };
    defineSide = function(thing) {
      $(thing).removeClass('left').removeClass('right');
      if (parseInt($(thing).css('left')) === 0) {
        return $(thing).addClass('left');
      } else {
        return $(thing).addClass('right');
      }
    };
    clickAboutToggle = function(e) {
      e.preventDefault();
      $('nav .button a.selected').removeClass('selected');
      if ($about.attr('data-show') === 'true') {
        return toggleAbout(false);
      } else {
        return toggleAbout(true);
      }
    };
    toggleAbout = function(show) {
      var curPage, y;
      if (show) {
        $canvas.addClass('hidden');
        $wrapper.addClass('no-scroll');
        $main.addClass('hidden');
        $black.data('y', $black.css('y'));
        $about.attr('data-show', 'true');
        $('#aboutToggle h3').text('X');
        $nav.transition({
          top: 0
        }, 300);
        return $black.transition({
          y: 0
        }, 500, function() {
          if ($about.attr('data-show') === 'true') {
            return $about.addClass('show');
          }
        });
      } else {
        curPage = $main.find('.page.show').attr('id');
        $nav.find('a.' + curPage).addClass('selected');
        $wrapper.removeClass('no-scroll');
        $main.removeClass('hidden');
        $about.removeClass('show');
        $about.attr('data-show', 'false');
        $('#aboutToggle h3').text('?');
        onScroll(null, 300);
        if (y = $black.data('y')) {
          return $black.transition({
            y: y
          }, 500, function() {
            if ($about.attr('data-show') === 'false') {
              return $canvas.removeClass('hidden');
            }
          });
        }
      }
    };
    clickWrapper = function(e) {
      var $target;
      $target = $(e.target);
      if ($target.is('#top')) {
        return $wrapper.animate({
          scrollTop: $window.innerHeight()
        }, 500);
      } else if (!$target.is('a') && !$target.parents('a').length) {
        return changePhoto();
      }
    };
    resizeVideo = function() {
      return $('.embed iframe').each(function(i, iframe) {
        var $embed, $iframe, embedWidth, height, newHeight, ratio, width;
        $iframe = $(iframe);
        $embed = $iframe.parents('.embed');
        width = $iframe.attr('width');
        height = $iframe.attr('height');
        ratio = width / height;
        embedWidth = $embed.innerWidth();
        newHeight = embedWidth / ratio;
        return $iframe.css({
          height: newHeight
        });
      });
    };
    onLoad = function(page) {
      if (['music', 'shows', 'videos', 'news'].indexOf(page) >= 0) {
        $nav.find('a.' + page).addClass('selected');
        return openPage(page);
      } else if (page === 'about') {
        $nav.find('a.about').addClass('selected');
        openPage('home');
        return toggleAbout(true);
      } else {
        $nav.find('a.home').addClass('selected');
        return openPage('home');
      }
    };
    onScroll = function(e, dur) {
      var blackY, featuredBottom, pagesEnd, scrollTop, top;
      if (!dur) {
        dur = 0;
      }
      scrollTop = $wrapper.scrollTop();
      featuredBottom = $main.position().top + $featured.innerHeight() + $window.innerHeight();
      pagesEnd = $pages.offset().top + $pages.innerHeight();
      if (pagesEnd <= $window.innerHeight()) {
        top = pagesEnd - $window.innerHeight();
        $nav.transition({
          top: top
        }, dur);
      } else if (featuredBottom <= 0 || $about.is('.show')) {
        $nav.transition({
          top: 0
        }, dur);
      } else {
        $nav.removeClass('fixed');
        $nav.transition({
          top: featuredBottom
        }, dur);
      }
      blackY = $(window).innerHeight() - scrollTop;
      if (blackY <= 0) {
        blackY = 0;
      }
      return $black.css({
        y: blackY
      });
    };
    resize = function() {
      $canvas.css({
        width: $window.innerWidth(),
        height: $window.innerHeight()
      });
      holdPlace();
      resizeVideo();
      return $('.page.show .thing').each(function(i, thing) {
        return defineSide(thing);
      });
    };
    onBrowserNav = function(e) {
      var slug, state;
      e.preventDefault();
      state = history.state;
      if (state) {
        slug = state.slug;
        return handlePage(slug);
      }
    };
    $main.on('mouseenter', '.thing .hover', hoverThing);
    $main.on('mouseleave', '.thing .hover', unhoverThing);
    $main.on('click', '.thing a.open', clickThing);
    $wrapper.on('click', clickWrapper);
    $('nav .button a').on('click', clickNavLink);
    $('nav .button a').on('mouseenter', hoverNavLink);
    $('nav .button a').on('mouseleave', unhoverNavLink);
    $('nav .button a').on('mousewheel', scrollNavLink);
    $('#aboutToggle').on('click', clickAboutToggle);
    $wrapper.scroll(onScroll).scroll();
    $window.resize(resize).resize();
    $(window).on('popstate', onBrowserNav);
    onLoad(page);
  });

}).call(this);

//# sourceMappingURL=scripts.js.map
