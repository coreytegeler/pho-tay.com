<?php
echo '<nav>';
	echo '<div class="inner">';
		echo '<div class="buttons hide">';
			echo '<div class="button"><a href="' . page( 'home' )->url() . '" class="home" data-slug="home"><h4>Home</h4></a></div>';
			echo '<div class="button"><a href="' . page( 'news' )->url() . '" class="news" data-slug="news"><h4>News</h4></a></div>';
			echo '<div class="button"><a href="' . page( 'videos' )->url() . '" class="videos" data-slug="videos"><h4>Videos</h4></a></div>';
			echo '<div class="button"><a href="' . page( 'shows' )->url() . '" class="shows" data-slug="shows"><h4>Shows</h4></a></div>';
			echo '<div class="button"><a href="' . page( 'music' )->url() . '" class="music" data-slug="music"><h4>Music</h4></a></div>';
		echo '</div>';
	echo '</div>';
echo '</nav>';
echo '<a href="' . page( 'about' )->url() . '" id="aboutToggle"><h4>?</h4></a>';
?>