$ ->
	$window = $(window)
	$body = $('body')
	$wrapper = $('#wrapper')
	$main = $('main')
	$footer = $('footer')
	$about = $('#about')
	$featured = $('#featured')
	$pages = $('#pages')
	$nav = $('nav')
	$home = $('#home')
	$fixings = $('#fixings')
	$black = $('#black')
	$canvas = $('#canvas')
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

	changePhoto = (e) ->
		$curPhoto = $('#fixings .bg.show')
		$nextPhoto = $curPhoto.next()
		if !$nextPhoto.length || !$nextPhoto.is('.bg')
			$nextPhoto = $('#fixings .bg').first()	
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
		page = $thing.parents('.page').attr('id')
		slug = $thing.attr('data-slug')
		$group = $thing.parents('.group')
		$mores = $thing.find('.more')
		$embeds = $thing.find('.embed')
		if !$thing.is('.opened')
			hoverThing($thing)
			$thing.addClass('opened')
			if !$group.is('.half')
				thingTop = $thing.offset().top + $wrapper.scrollTop() - 25
				$wrapper.animate
					scrollTop: thingTop
				, 500
			savedHeight = 0
			$embeds.each (i, embed) ->
				$embed = $(embed)
				$.ajax
					url: root+'/api?page='+page+'&slug='+slug
					dataType: 'html'
					error: (jqXHR, status, err) ->
						console.log(jqXHR, status, err)
					success: (embed, status, jqXHR) ->
						if !$embed.html().length
							$embed.append(embed)
						if $thing.is('.video')
							$parent = $embed.parents('.display')
							$parent.addClass('play')
						else
							$parent = $embed.parents('.more .inner')
							$embed.addClass('show')
						newHeight = $embed.innerHeight()
						$parent.css
							height: newHeight
						resizeVideo()
						$group.masonry('layout')

						$mores.each () ->
							$more = $(this)
							$inner = $more.find('.inner')
							if $inner.html().length
								height = $inner.innerHeight()
								if height > savedHeight
									savedHeight = height
								$more.css
									height: height
								$group.masonry('layout')
		else
			$group = $thing.parents('.group')
			$siblings = $group.find('.thing')
			$thing.removeClass('opened')
			$mores.each () ->
				$more = $(this)
				$embed = $more.find('.embed')
				setTimeout () ->
					$more.css
						height: 0
				, 400
				$group.masonry('layout')
				if $embed.length && !$thing.is('.opened')
					$embed.removeClass('show')
					setTimeout () ->
						if !$thing.is('.opened')
							$embed.html('')
					, 400

			$embeds.each (i, embed) ->
				$embed = $(embed)
				$display = $embed.parents('.display')
				$display.removeClass('play')
				$display.css
					height: 'auto'

	hoverThing = (x) ->
		if($(x).is('.thing'))
			$thing = $(x)
		else
			$target = $(x.target)
			$thing = $target.parents('.thing')
		$group = $thing.parents('.group')
		$siblings = $group.find('.thing')
		if $thing.is('.opened') || $siblings.filter('.opened').length
			return
		$thing.addClass('hover')

		$thing.removeClass('hidden')
		if $siblings.length && !$group.is('.half')
			$siblings.filter(':not(.hover)').addClass('hidden')
			if $thing.find('.display').is('.image')
				$('.hide').addClass('hidden')

	unhoverThing = (x) ->
		if($(x).is('.thing'))
			$thing = $(x)
		else
			$target = $(x.target)
			$thing = $target.parents('.thing')
		$group = $thing.parents('.group')
		$siblings = $group.find('.thing')
		if $thing.is('.opened') || $siblings.filter('.opened').length
			return
		$thing.removeClass('hover')
		if !$('.page .thing.hover').length && !$group.is('.half')
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
		history.pushState({slug:slug}, slug, url)
		handlePage(slug)

	scrollNavLink = (e) ->
		delta = e.originalEvent.deltaY
		$wrapper.scrollTop($wrapper.scrollTop() + delta)

	handlePage = (slug) ->
		$curPage = $main.find('.page.show')
		$curThings = $curPage.find('.thing')
		$nextPage = $('#'+slug)
		abouting = $about.is('.show')
		$('nav .button a.selected').removeClass('selected')
		$nav.find('a.'+slug).addClass('selected')
		pageTop = $pages.offset().top
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
		$fixings.addClass('navigating')

	unhoverNavLink = () ->
		$fixings.removeClass('navigating')

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
		holdPlace(slug)

		$page.find('.grid').masonry
		  itemSelector: '.thing',
		  percentPosition: true,
		  transitionDuration: 0

		$page.find('.thing').each (i, thing) ->
			$(thing).addClass('show')
			$(thing).imagesLoaded () ->
				$(thing).addClass('loaded')
				$(thing).find('.display.image').css
					height: 'auto'
				$page.find('.grid').masonry('layout')
				defineSide(thing)

	holdPlace = () ->
		$displays = $('.page.show .thing .display.image:not(.play)')
		$displays.each (i, display) ->
			imgHeight = $(display).data('height')
			imgWidth = $(display).data('width')
			ratio = imgHeight/imgWidth
			newHeight = $(display).innerWidth()*ratio
			$(display).css
				'height': newHeight

	defineSide = (thing) ->
		$(thing).removeClass('left').removeClass('right')
		if parseInt($(thing).css('left')) == 0
			$(thing).addClass('left')
		else 
			$(thing).addClass('right')


	clickAboutToggle = (e) ->
		e.preventDefault()
		$('nav .button a.selected').removeClass('selected')
		if $about.attr('data-show') == 'true'
			toggleAbout(false)
		else
			toggleAbout(true)

	toggleAbout = (show) ->
		if show
			$canvas.addClass('hidden')
			$wrapper.addClass('no-scroll')
			$main.addClass('hidden')
			$black.data('y', $black.css('y'))
			$about.attr('data-show', 'true')
			$('#aboutToggle h3').text('X')
			$nav.transition
				top: 0
			, 300
			$black.transition
				y: 0
			, 500, () ->
				if $about.attr('data-show') == 'true'
					$about.addClass('show')
		else
			curPage = $main.find('.page.show').attr('id')
			$nav.find('a.'+curPage).addClass('selected')
			$wrapper.removeClass('no-scroll')
			$main.removeClass('hidden')
			$about.removeClass('show')
			$about.attr('data-show', 'false')
			$('#aboutToggle h3').text('?')
			onScroll(null, 300)
			if y = $black.data('y')
				$black.transition
					y: y
				, 500 , () ->
					if $about.attr('data-show') == 'false'
						$canvas.removeClass('hidden')

	clickWrapper = (e) ->
		$target = $(e.target)
		if $target.is('#top')
			$wrapper.animate
				scrollTop: $window.innerHeight()
			, 500
		else if !$target.is('a') && !$target.parents('a').length
			changePhoto()

	resizeVideo = () ->
		$('.embed iframe').each (i, iframe) ->
			$iframe = $(iframe)
			$embed = $iframe.parents('.embed')
			width = $iframe.attr('width')
			height = $iframe.attr('height')
			ratio = width/height
			embedWidth = $embed.innerWidth()
			newHeight = embedWidth/ratio
			$iframe.css
				height: newHeight

	onLoad = (page) ->
		if ['music', 'shows', 'videos', 'news'].indexOf(page) >= 0
			$nav.find('a.'+page).addClass('selected')
			openPage(page)
		else if page == 'about'
			$nav.find('a.about').addClass('selected')
			openPage('home')
			toggleAbout(true)
		else
			$nav.find('a.home').addClass('selected')
			openPage('home')

	onScroll = (e, dur) ->
		if !dur
			dur = 0
		scrollTop = $wrapper.scrollTop()
		featuredBottom = $main.position().top + $featured.innerHeight() + $window.innerHeight()
		pagesEnd = $pages.offset().top + $pages.innerHeight()
		if pagesEnd <= $window.innerHeight()
			top = pagesEnd - $window.innerHeight()
			$nav.transition
				top: top
			, dur
		else if featuredBottom <= 0 || $about.is('.show') 
			$nav.transition
				top: 0
			, dur
		else
			$nav.removeClass('fixed')
			$nav.transition
				top: featuredBottom
			, dur

		blackY = $(window).innerHeight() - scrollTop
		if blackY <= 0
			blackY = 0
		$black.css
			y: blackY
	
	resize = () ->
		$canvas.css
			width: $window.innerWidth(),
			height: $window.innerHeight()
		holdPlace()
		resizeVideo()
		$('.page.show .thing').each (i, thing) ->
			defineSide(thing)


	onBrowserNav = (e) ->
		e.preventDefault()
		state = history.state
		if state
			slug = state.slug
			handlePage(slug)

	$main.on 'mouseenter', '.thing .hover', hoverThing
	$main.on 'mouseleave', '.thing .hover', unhoverThing
	$main.on 'click', '.thing a.open', clickThing
	$wrapper.on 'click', clickWrapper
	$('nav .button a').on 'click', clickNavLink
	$('nav .button a').on 'mouseenter', hoverNavLink
	$('nav .button a').on 'mouseleave', unhoverNavLink
	$('nav .button a').on 'mousewheel', scrollNavLink
	$('#aboutToggle').on 'click', clickAboutToggle
	$wrapper.scroll(onScroll).scroll()
	$window.resize(resize).resize()
	$(window).on 'popstate', onBrowserNav

	onLoad(page)
	return