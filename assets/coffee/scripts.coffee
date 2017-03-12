$ ->
	$window = $(window)
	$main = $('main')

	lastY = 0
	$window.on 'mousewheel', (e) ->
		thisY = lastY - e.deltaY
		opacity = thisY/10000
		console.log 1-opacity, opacity
		$('#fog').css('opacity', 1-opacity)
		$('#sun').css('opacity', opacity)
		lastY = thisY