$ ->
	$window = $(window)
	$body = $('body')
	$wrapper = $('#wrapper')
	$main = $('main')
	$about = $('#about')
	$featured = $('#featured')
	$nav = $('nav')
	$home = $('#home')
	$photos = $('#photos')
	$spotlight = $('.spotlight')
	root = $body.data('root')
	page = $body.data('page')
	transEnd = 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd'
	ease = 'cubic-bezier(0.645, 0.045, 0.355, 1.000)'

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

	maskPaper = new (paper.PaperScope)
	canvas = document.getElementById('canvas')
	$canvas = $(canvas)

	changePhoto = (e) ->
		$curPhoto = $('#photos .bg.show')
		$nextPhoto = $curPhoto.next()
		if !$nextPhoto.length || !$nextPhoto.is('.bg')
			$nextPhoto = $('#photos .bg').first()	
		$curPhoto.removeClass('show')
		$nextPhoto.addClass('show')
		closeThings()

	clickThing = (e) ->
		if $(e.currentTarget).attr('target')
			return
		$thing = $(e.currentTarget).parents('.thing')
		e.preventDefault()
		if !$thing.is('.hidden')
			toggleThing($thing)
		else
			closeThings()

	toggleThing = (thing) ->
		$thing = $(thing)
		$mores = $thing.find('.more')
		if !$thing.is('.opened')
			hoverThing($thing)
			$thing.addClass('opened')
			savedHeight = 0
			$mores.each () ->
				$more = $(this)
				$inner = $more.find('.inner')
				if $inner.html().length
					height = $inner.innerHeight()
					if height > savedHeight
						savedHeight = height
					$more.transition
						height: height
					, 400, ease
			top = $thing.innerHeight() + $thing.offset().top + savedHeight
		else
			$siblings = $thing.parents('.page').find('.thing').not($thing)
			$thing.removeClass('opened')
			$mores.each () ->
				$more = $(this)
				$more.transition
					height: 0
				, 600, ease
			setTimeout () ->
				$siblings.removeClass('hidden')
			, 600
				
	hoverThing = (x) ->
		if($(x).is('.thing'))
			$thing = $(x)
		else
			$target = $(x.target)
			$thing = $target.parents('.thing')
		$page = $thing.parents('.page')
		$siblings = $page.find('.thing')
		if $thing.is('.opened') || $siblings.filter('.opened').length
			return
		$thing.addClass('hover').removeClass('hidden')
		if $siblings.length
			$siblings.filter(':not(.hover)').addClass('hidden')
			$('.hide').addClass('hidden')

	unhoverThing = (x) ->
		if($(x).is('.thing'))
			$thing = $(x)
		else
			$target = $(x.target)
			$thing = $target.parents('.thing')
		$siblings = $thing.parents('.page').find('.thing')
		if $thing.is('.opened') || $siblings.filter('.opened').length
			return
		$thing.removeClass('hover')
		if(!$('.page .thing.hover').length)
			$('.hide').removeClass('hidden')
			$siblings.removeClass('hidden')

	closeThings = () ->
		$('.thing.opened').each (i, thing) ->
			toggleThing(thing)
			unhoverThing(thing)

	clickNavLink = (e) ->
		e.preventDefault()
		slug = $(this).data('slug')
		url = $(this).attr('href')
		$('nav .button a.selected').removeClass('selected')
		$curPage = $main.find('.page.show')
		$curThings = $curPage.find('article.thing')
		$nextPage = $('#'+slug)
		abouting = $about.is('.show')
		history.pushState(null, slug, url)
		if slug == 'about'
			if abouting
				$nav.find('a.'+$curPage.attr('id')).addClass('selected')
				toggleAbout(false)
			else
				$nav.find('a.about').addClass('selected')
				toggleAbout(true)
		else
			$nav.find('a.'+slug).addClass('selected')
			pageTop = $featured.offset().top + $featured.innerHeight() - 25
			$wrapper.animate
				scrollTop: pageTop + $wrapper.scrollTop()
			, 500
			if $nextPage.is('.show')
				return
			if abouting
				toggleAbout(false)
				openPage(slug)
			else
				$curThings.removeClass('show')
				$curThings.eq(0).on transEnd, () ->
					openPage(slug)
					$curThings.eq(0).off(transEnd)

	hoverNavLink = () ->
		$photos.addClass('navigating')

	unhoverNavLink = () ->
		$photos.removeClass('navigating')

	openPage = (slug) ->
		if !$('#'+slug).is('.loaded')
			loadPage(slug)
		else
			showPage(slug)

	loadPage = (slug) ->
		$page = $('#'+slug)
		$page.addClass 'loaded'
		$.ajax
			url: root+'/api?page='+slug
			dataType: 'html'
			error: (jqXHR, status, err) ->
				console.log(jqXHR, status, err)
			success: (response, status, jqXHR) ->
				$page.append response
				showPage(slug)

	showPage = (slug) ->
		$page = $('#'+slug)
		$('.page.show').removeClass('show')
		$page.addClass('show')
		$page.addClass('loaded')
		$page.find('article.thing').each (i, thing) ->
			$(thing).imagesLoaded () ->
				$(thing).addClass('show')

	toggleAbout = (show) ->
		if show
			$wrapper.addClass('no-scroll')
			$main.addClass('hidden')
			$about.addClass('show')
		else
			$wrapper.removeClass('no-scroll')
			$main.removeClass('hidden')
			$about.removeClass('show')

	onLoad = (page) ->
		if ['music', 'shows', 'videos'].indexOf(page) >= 0
			$nav.find('a.'+page).addClass('selected')
			openPage(page)
		else if page == 'about'
			$nav.find('a.about').addClass('selected')
			openPage('music')
			toggleAbout(true)
		else
			$nav.find('a.music').addClass('selected')
			openPage('music')

	onScroll = (e) ->
		featuredBottom = $main.position().top + $featured.innerHeight()
		mainBottom = $main.position().top + $main.innerHeight() - $window.innerHeight()
		if mainBottom <= 0
			$nav.css
				top: mainBottom
		else if featuredBottom <= 0 || $about.is('.show') 
			$nav.css
				top: 0
		else
			$nav.removeClass('fixed')
			$nav.css
				top: featuredBottom
	
	resize = () ->
		$canvas.css
			width: $window.innerWidth(),
			height: $window.innerHeight()

	$main.on 'mouseenter', '.thing .hover', hoverThing
	$main.on 'mouseleave', '.thing .hover', unhoverThing
	$main.on 'click', '.thing a.open', clickThing
	$('#photos').on 'click', changePhoto
	$('nav .button a').on 'click', clickNavLink
	$('nav .button a').on 'mouseenter', hoverNavLink
	$('nav .button a').on 'mouseleave', unhoverNavLink
	$wrapper.scroll(onScroll).scroll()
	$window.resize(resize).resize()
	onLoad(page)
	return