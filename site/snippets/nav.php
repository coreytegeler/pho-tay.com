<?php
echo '<nav>';
	echo '<div class="inner">';
		echo '<div class="buttons hide">';
			echo '<div class="button"><a href="' . page( 'about' )->url() . '" data-slug="about"><h3>About</h3></a></div>';
			echo '<div class="button"><a href="' . page( 'videos' )->url() . '" data-slug="videos"><h3>Videos</h3></a></div>';
			echo '<div class="button"><a href="' . page( 'shows' )->url() . '" data-slug="shows"><h3>Shows</h3></a></div>';
			echo '<div class="button"><a href="' . page( 'music' )->url() . '" data-slug="music"><h3>Music</h3></a></div>';
		echo '</div>';
	echo '</div>';
echo '</nav>';
?>