<?php 
snippet( 'header' );
	snippet( 'home' );
	snippet( 'nav' );
	echo '<main>';
		echo '<section id="top"></section>';
		snippet( 'featured' );
		echo '<section id="pages">';
			$pages = array( 'music', 'shows', 'videos', 'news' );
			foreach( $pages as $index => $page ) {
				echo '<div class="page" id="' . $page . '">';
				echo '</div>';
			}
		echo '</section>';
		snippet( 'footer' );
  echo '</main>';
?>