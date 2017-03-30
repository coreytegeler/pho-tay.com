<?php
$features = page( 'music' )->children()->filterBy( 'featured', 'true' );
if( sizeof( $features ) ){
	$featured = $features->first();
	echo '<section id="featured">';
		echo '<div class="thing release">';
			if( $image = $featured->art() ) {
				if( $image = $featured->image( $image ) ) {
					$image = $image->resize(800, 800, 100);
				}
			}
			$title = $featured->title();
			echo '<div class="image">';
				echo '<a href="' . $featured->link() . '" class="release open">';
					if( $image ) {
						echo '<img src="' . $image->url() . '"/>';
					}
				echo '</a>';
				echo '<div class="meta">';
					echo '<div class="row">';
						if( $featured_label = $featured->featured_label() ) {
							echo '<span class="featured_label">' . $featured_label . '</span>';
						}
						if( $date = $featured->date( 'm.d.y' ) ) {
							echo '<span class="date">' . $date . '</span>';
						}
					echo '</div>';
				echo '</div>';
			echo '</div>';
			echo '<div class="info">';
				echo '<div class="center">';
					echo '<h1>' . $title . '</h1>';
					snippet( 'release_info', array( 'release' => $featured ) );
				echo '</div>';
			echo '</div>';
		echo '</div>';
	echo '</section>';
}
?>