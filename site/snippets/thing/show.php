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
echo '<article class="thing hide ' . $parity . '">';
	echo '<div class="image ' . ( $image ? '' : 'no' ) . '">';
		echo '<a href="' . $show->link() . '" target="_blank" class="show open">';
			if( $image ) {
				echo '<img class="hover" src="' . $image->url() .  '"/>';
			} else {
				echo '<h3 class="hover">' . $title . '</h3>';
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