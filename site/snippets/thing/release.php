<?php
$parity = ( $index % 2 == 0 ? 'even' : 'odd' );
if( $image = $release->art() ) {
	if( $image = $release->image( $image ) ) {
		$image = $image->resize(800, 800, 100);
	}
}
$title = $release->title();
$type = $release->type();
$about = $release->about();
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
			snippet( 'info/release', array( 'release' => $release ) );
		echo '</div>';
	echo '</div>';
echo '</article>';
?>