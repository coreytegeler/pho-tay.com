<?php
echo '<nav>';
	echo '<div class="inner">';
		echo '<div class="buttons hide">';
			echo '<div class="button"><a href="' . page( 'about' )->url() . '" class="about" data-slug="about"><h3>About</h3></a></div>';
			echo '<div class="button"><a href="' . page( 'videos' )->url() . '" class="videos" data-slug="videos"><h3>Videos</h3></a></div>';
			echo '<div class="button"><a href="' . page( 'shows' )->url() . '" class="shows" data-slug="shows"><h3>Shows</h3></a></div>';
			echo '<div class="button"><a href="' . page( 'music' )->url() . '" class="music" data-slug="music"><h3>Music</h3></a></div>';
		echo '</div>';
	echo '</div>';
echo '</nav>';
?>