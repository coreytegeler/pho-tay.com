(function() {
  $(function() {
    var $home, $main, $scenes, $window;
    $window = $(window);
    $main = $('main');
    $home = $('#home');
    $scenes = $('#scenes');
    Marquee3k({
      selector: '.marquee'
    });
    $('.scene').each(function(i, scene) {
      var $bg, $scene, image, imageUrl;
      $scene = $(scene);
      $bg = $scene.find('.bg');
      if ($bg.length && (imageUrl = $bg.data('image'))) {
        image = new Image;
        image.src = imageUrl;
        return $(image).on('load', function(image) {
          console.log(image.target.src);
          $bg.css({
            'backgroundImage': 'url(' + image.target.src + ')'
          });
          if ($scene.is(':first-child')) {
            return $scene.addClass('show');
          }
        });
      }
    });
    $scenes.on('mousemove', function(e) {
      var $curScene, $scope, curId, mouseX, mouseY, opacity, winH;
      mouseY = e.offsetY;
      mouseX = e.offsetX;
      winH = $(window).innerHeight();
      $curScene = $('.scene.show');
      curId = $curScene.attr('id');
      if (curId === 'seasonal') {
        opacity = mouseY / winH;
        if (opacity <= 0) {
          opacity = 0;
        } else if (opacity >= 1) {
          opacity = 1;
        }
        $('#fog').css('opacity', 1 - opacity);
        return $('#sun').css('opacity', opacity);
      } else if (curId === 'gazing') {
        $scope = $curScene.find('.scope');
        return $scope.css({
          x: mouseX,
          y: mouseY
        });
      }
    });
    $scenes.on('click', function(e) {
      var $curScene, $nextScene;
      $curScene = $('.scene.show');
      $nextScene = $curScene.next();
      if (!$nextScene.length) {
        $nextScene = $('.scene').first();
      }
      $curScene.removeClass('show');
      return $nextScene.addClass('show');
    });
    $('.thing .image img').on('mouseenter', function(e) {
      var $thing;
      $thing = $(this).parents('.thing');
      $thing.addClass('selected');
      $('.scene.show .logo').addClass('hidden');
      return $thing.parents('section').find('.thing').each(function() {
        if (!$(this).is($thing)) {
          return $(this).addClass('hidden');
        }
      });
    });
    $('.thing .image img').on('mouseleave', function(e) {
      var $thing;
      $thing = $(this).parents('.thing');
      $thing.removeClass('selected');
      $('.scene.show .logo').removeClass('hidden');
      return $thing.parents('section').find('.thing').each(function() {
        return $(this).removeClass('hidden');
      });
    });
  });

}).call(this);

//# sourceMappingURL=scripts.js.map
