<?php
$featured = $release->featured();
$parity = ( $index % 2 == 0 ? 'even' : 'odd' );
if( $featured != 'true' ) {
	if( $image = $release->art() ) {
		if( $image = $release->image( $image ) ) {
			$image = $image->resize(800, 800, 100);
		}
	}
	$title = $release->title();
	$type = $release->type();
	$about = $featured->about()->kirbytext();
	echo '<article class="thing ' . $parity . ( $type == 'release' ? ' large' : '' ) . '">';
		echo '<div class="image">';
			echo '<a href="' . $release->link() . '" target="_blank" class="release open">';
				if( $image ) {
					echo '<img class="hover" src="' . $image->url() .  '"/>';
				}
			echo '</a>';
		echo '</div>';
		echo '<div class="info">';
			echo '<div class="center">';
				echo '<div class="title">';
					echo '<h2 class="hover">' . $title . '</h2>';
				echo '</div>';
				echo '<div class="meta">';
					echo '<div class="row">';
						if( $date = $release->date( 'm.d.y' ) ) {
							echo '<span class="date">' . $date . '</span>';
						}
					echo '</div>';
				echo '</div>';
				echo '<div class="more">';
					echo '<div class="inner">';
						echo $about;
					echo '</div>';
				echo '</div>';
			echo '</div>';
		echo '</div>';
	echo '</article>';
}
?>