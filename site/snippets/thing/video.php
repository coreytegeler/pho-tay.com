<?php
if( $image = $video->still() ) {
	if( $image = $video->image( $image ) ) {
		$image = $image->resize(800, 800, 100);
	}
}
$title = $video->title();
$slug = $video->slug();
$type = $video->type();
$date = $video->date( 'm.d.y' );
$about = $video->about();
$embed = $video->embed();
if( $image ) {
	$width = $image->width();
	$height = $image->height();
} else {
	$width = null;
	$height = null;
}

echo '<div class="thing large full video" data-type="video" data-slug="' . $slug . '">';
	echo '<div class="display ' . ( $image ? 'image' : 'text' ) . '" data-width="' . $width . '" data-height="' . $height . '">';
		echo '<a href="#" class="hover show open">';
			if( $image ) {
				echo '<img src="' . $image->url() .  '"/>';
			} else {
				echo '<h3>' . $title . '</h3>';
				if( $date ) {
					echo '<h4>' . $date . '</h4>';
				}
				if( !$type->empty() ) {
					echo '<h4 class="type">' . str_replace( '_', ' ', $type ) . '</h4>';
				}
			}
		echo '</a>';
		if( !$embed->empty() ) {
			echo '<div class="embed video"></div>';
		}
	echo '</div>';
	echo '<div class="info">';
		echo '<div class="center">';
			echo '<div class="title">';
				echo '<h2 class="hover">' . $title . '</h2>';
			echo '</div>';
			echo '<div class="meta">';
				echo '<div class="row">';
					if( $date ) {
						echo '<span class="date">' . $date . '</span>';
					}
					if( !$type->empty() ) {
						echo '<span class="type">' . str_replace( '_', ' ', $type ) . '</span>';
					}
				echo '</div>';
			echo '</div>';
			echo '<div class="more">';
				echo '<div class="inner">';
					//credits
				echo '</div>';
			echo '</div>';		
		echo '</div>';
	echo '</div>';
echo '</div>';
?>