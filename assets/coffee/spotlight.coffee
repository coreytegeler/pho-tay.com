cursorPoint = new Point(view.center.x*1.5, view.center.y)
cursor = new Path.Circle(cursorPoint, 100)
cursor.name = 'cursor'
cursor.center = cursorPoint
cursor.fillColor = 'white'

root = $('body').data('root')
project.importSVG root+'/assets/img/logo.svg', (logo) ->
	logoPoint = new Point(view.center.x/2, view.center.y)
	logo.name = 'logo'
	logo.position = logoPoint
	logo.fillColor = 'white'
	logo.scale 0.5
	$('body').scroll (e) ->
		scrollTop = $('body').scrollTop()
		winHeight = $('body').innerHeight()
	.scroll()
	
view.onMouseMove = (event) ->
	cursorPoint = event.point

view.onFrame = (event) ->
	cursorDelta = (cursorPoint - cursor.position)/5
	if cursorDelta.length > 0.1 && logo = project.getItem({name:'logo'})
		cursor.position += cursorDelta
		logoDelta = {
			x: (Math.abs(cursor.position.x) - $(window).innerWidth())*-1,
			y: (Math.abs(cursor.position.y) - $(window).innerHeight())*-1
		}
		logo.rotate (cursorDelta.x+cursorDelta.y)/8
		logo.position = logoDelta

# view.onResize = (event) ->