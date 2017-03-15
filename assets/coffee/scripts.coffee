$ ->
	$window = $(window)
	$main = $('main')

	Marquee3k
		selector: '.marquee'

	$main.on 'mousemove', (e) ->
		mouseY = e.offsetY
		winH = $(window).innerHeight()/4
		opacity = mouseY/winH
		if opacity <= 0
			opacity = 0
		else if opacity >= 1
			opacity = 1
		$('#fog').css('opacity', opacity)
		$('#sun').css('opacity', 1-opacity)