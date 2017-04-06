<?php 
snippet( 'header' );
	snippet( 'home' );
	snippet( 'nav' );
	echo '<main>';
		snippet( 'featured' );
		echo '<section id="pages">';
			$pages = array( 'music', 'shows', 'videos', 'posts' );
			foreach( $pages as $index => $page ) {
				echo '<div class="page" id="' . $page . '">';
				echo '</div>';
			}
		echo '</section>';
  echo '</main>';
snippet( 'footer' )
?>