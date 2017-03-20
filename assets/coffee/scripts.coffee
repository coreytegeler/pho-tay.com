$ ->
	$window = $(window)
	$main = $('main')
	$home = $('#home')
	$scenes = $('#scenes')

	Marquee3k
		selector: '.marquee'

	$('.scene').each (i, scene) ->
		$scene = $(scene)
		$bg = $scene.find('.bg')
		if $bg.length && imageUrl = $bg.data('image')
			image = new Image
			image.src = imageUrl
			$(image).on 'load', (image) ->
				$bg.css
					'backgroundImage': 'url('+image.target.src+')'
				if($scene.is(':first-child'))
					$scene.addClass('show')
	
	$scenes.on 'mousemove', (e) ->
		mouseY = e.offsetY
		mouseX = e.offsetX
		winH = $(window).innerHeight()
		$curScene = $('.scene.show')
		curId = $curScene.attr('id')
		if curId == 'seasonal'
			opacity = mouseY/winH
			if opacity <= 0
				opacity = 0
			else if opacity >= 1
				opacity = 1
			$('#fog').css('opacity', 1-opacity)
			$('#sun').css('opacity', opacity)
		else if curId == 'gazing'
			$scope = $curScene.find('.scope')
			$scope.css
				x: mouseX,
				y: mouseY

	$scenes.on 'click', (e) ->
		$curScene = $('.scene.show')
		$nextScene = $curScene.next()
		if !$nextScene.length
			$nextScene = $('.scene').first()	
		$curScene.removeClass('show')
		$nextScene.addClass('show')

	$('.thing .image img').on 'mouseenter', (e) ->
		$thing = $(this).parents('.thing')
		$thing.addClass('selected')
		$thing.parents('section').find('.thing').each () ->
			if(!$(this).is($thing))
				$(this).addClass('hidden')

	$('.thing .image img').on 'mouseleave', (e) ->
		$thing = $(this).parents('.thing')
		$thing.removeClass('selected')
		$thing.parents('section').find('.thing').each () ->
			$(this).removeClass('hidden')

	return