<?php
$parity = ( $index % 2 == 0 ? 'even' : 'odd' );
if( $image = $video->still() ) {
	if( $image = $video->image( $image ) ) {
		$image = $image->resize(800, 800, 100);
	}
}
$title = $video->title();
$type = $video->type();
$about = $video->about();
if( $image ) {
	$width = $image->width();
	$height = $image->height();
} else {
	$width = null;
	$height = null;
}
echo '<article class="thing ' . $parity . ( $type == 'video' ? ' large' : '' ) . '" data-type="video">';
	echo '<div class="display ' . ( $image ? 'image' : 'text' ) . '" data-width="' . $width . '" data-height="' . $height . '">';
		echo '<a href="#" class="hover show open">';
			if( $image ) {
				echo '<img src="' . $image->url() .  '"/>';
			} else {
				echo '<h3>' . $title . '</h3>';
				if( $date = $video->date( 'm.d.y' ) ) {
					echo '<h4>' . $date . '</h4>';
				}
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
					if( $date = $video->date( 'm.d.y' ) ) {
						echo '<span class="date">' . $date . '</span>';
					}
				echo '</div>';
			echo '</div>';
			snippet( 'info/video', array( 'video' => $video ) );
		echo '</div>';
	echo '</div>';
echo '</article>';
?>