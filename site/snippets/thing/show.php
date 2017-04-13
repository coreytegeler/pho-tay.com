<?php
$parity = ( $index % 2 == 0 ? 'even' : 'odd' );
if( $image = $show->flier() ) {
	if( $image = $show->image( $image ) ) {
		$image = $image->resize(800, 800, 100);
	}
}
$title = $show->title();
$type = $show->type();
$about = $show->about();
if( $image ) {
	$width = $image->width();
	$height = $image->height();
} else {
	$width = null;
	$height = null;
}
echo '<article class="thing ' . $parity . '" data-type="show">';
	echo '<div class="display ' . ( $image ? 'image' : 'text' ) . '" data-width="' . $width . '" data-height="' . $height . '">';
		echo '<a href="#" class="hover show open">';
			if( $image ) {
				echo '<img src="' . $image->url() .  '"/>';
				echo '<div class="border"></div>';
			} else {
				echo '<h3>' . $title . '</h3>';
				if( $date = $show->date( 'm.d.y' ) ) {
					echo '<h4>' . $date . '</h4>';
				}
			}
		echo '</a>';
	echo '</div>';
	echo '<div class="info">';
		echo '<div class="center">';
			if( $image ) {
				echo '<div class="title">';
					echo '<h3 class="hover">' . $title . '</h3>';
					if( $date = $show->date( 'm.d.y' ) ) {
						echo '<h4>' . $date . '</h4>';
					}
				echo '</div>';
			}
			snippet( 'info/show', array( 'show' => $show ) );
		echo '</div>';
	echo '</div>';
echo '</article>';
?>