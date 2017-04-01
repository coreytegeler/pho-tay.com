<?php 
snippet( 'header' );
	snippet( 'home' );
	snippet( 'featured' );
	echo '<main>';
		snippet( 'nav' );
		$pages = array( 'music', 'shows', 'videos', 'posts' );
		foreach( $pages as $index => $page ) {
			echo '<section class="things" id="' . $page . '">';
				if( $index == 0 ) {
					snippet( $page );
				}
			echo '</section>';
		}
  echo '</main>';
snippet( 'footer' )
?>