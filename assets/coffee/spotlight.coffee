mousePoint = view.center
logoTop = view.center.y

slWidth = 100

# spotlight = new Raster('spotlightRaster')
# spotlight.position = view.center
# spotlight.scale 0.5

spotlight = new Path.Circle(mousePoint, slWidth)
spotlight.name = 'spotlight'
spotlight.center = mousePoint
spotlight.fillColor = 'white'
root = $('body').data('root')
project.importSVG root+'/assets/img/logo.svg', (logo) ->
	logo.name = 'logo'
	logo.position = view.center
	logo.fillColor = 'white'
	logo.scale 0.5
	$(window).scroll (e) ->
		scrollTop = $(window).scrollTop()
		winHeight = $(window).innerHeight()
		logoTop = (winHeight/2) - scrollTop
	.scroll()
		# logo.position.y = logoTop
	
view.onMouseMove = (event) ->
	mousePoint = event.point

view.onFrame = (event) ->
	spotlightDelta = (mousePoint - spotlight.position)/5
	if spotlightDelta.length > 0.1
		spotlight.position += spotlightDelta
	logo = project.getItem({name:'logo'})
	if logo
		logoDelta = (logoTop - logo.position.y)/3
		logo.position.y += logoDelta

view.onResize = (event) ->
	if logo = project.getItem({name:'logo'})
		logo.position.x = view.center.x