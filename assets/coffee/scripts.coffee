$ ->
	$window = $(window)
	$body = $('body')
	$main = $('main')
	$home = $('#home')
	$follow = $('.follow')
	$logo = $('#logo')

	Marquee3k
		selector: '.marquee'

	$('.bg').each (i, bg) ->
		$bg = $(bg)
		if imgUrl = $bg.data('image')
			image = new Image
			image.src = imgUrl
			$(image).on 'load', (image) ->
				$bg.css
					'backgroundImage': 'url('+image.target.src+')'
				if(i == 0)
					$bg.addClass('show')

	time = 5000
	setInterval () ->
		width = window.innerWidth;
		height = window.innerHeight;
		x = (Math.floor((Math.random() * 3) + 1)) * (Math.round(Math.random()) * 2 - 1);
		y = (Math.floor((Math.random() * 3) + 1)) * (Math.round(Math.random()) * 2 - 1);
		z = (Math.floor((Math.random() * 3) + 1)) * (Math.round(Math.random()) * 2 - 1);
		$logo.transition
			x:x,
			y:y,
			rotate:z
		, time
	, time
	
	$window.on 'mousemove', (e) ->
		mouseY = e.clientY
		mouseX = e.clientX
		winH = $(window).innerHeight()
		$follow.css
			x: mouseX,
			y: mouseY

	changePhoto = (e) ->
		$curPhoto = $('.bg.show')
		$nextPhoto = $curPhoto.next()
		if !$nextPhoto.length || !$nextPhoto.is('.bg')
			$nextPhoto = $('.bg').first()	
		$curPhoto.removeClass('show')
		$nextPhoto.addClass('show')
		$('.thing.opened').each (i, thing) ->
			$(thing).removeClass('opened')
			unhoverThing($(thing))

	toggleThing = (e) ->
		e.preventDefault()
		$target = $(e.target)
		$thing = $target.parents('.thing')
		$more = $thing.find('.more')
		$inner = $more.find('.inner')
		if !$thing.is('.opened')
			hoverThing($thing)
			$thing.addClass('opened')
			# $more.css('height', $inner.innerHeight())
		else
			$thing.removeClass('opened')
			unhoverThing($thing)
			$more.css('height', '')

	hoverThing = (x) ->
		if($(x).is('.thing'))
			$thing = $(x)
		else
			$target = $(x.target)
			$thing = $target.parents('.thing')
		$siblings = $thing.parents('section').find('.thing')
		if $thing.is('.opened') || $siblings.filter('.opened').length
			return
		$thing.addClass('hover').removeClass('hidden')
		$('.hide').addClass('hidden')
		$siblings.each (i, elem) ->
			if(!$(elem).is($thing) && !$(elem).is('.hover'))
				setTimeout () ->
					$(elem).addClass('hidden')
				, i*10

	unhoverThing = (x) ->
		if($(x).is('.thing'))
			$thing = $(x)
		else
			$target = $(x.target)
			$thing = $target.parents('.thing')
		$siblings = $thing.parents('section').find('.thing')
		if $thing.is('.opened') || $siblings.filter('.opened').length
			return
		$thing.removeClass('hover')
		if(!$('.thing.hover').length)
			$('.hide').removeClass('hidden')
			$siblings.each (i, elem) ->
				setTimeout () ->
					$(elem).removeClass('hidden')
				, i*10

	$('.thing .hover').on 'mouseenter', hoverThing
	$('.thing .hover').on 'mouseleave', unhoverThing
	$('.thing a.open').on 'click', toggleThing
	$('#photos').on 'click', changePhoto

	return