<?php
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

$date = $show->date( 'Ymd' );
$today = date( 'Ymd' );
if( $date >= $today ) {
	$type = 'upcoming';
} else {
	$type = 'past';
}
$date = $show->date( 'm.d.y' );
$parity = ( $index % 2 == 0 ? 'even' : 'odd' );

echo '<div class="thing full large ' . $parity . '" data-type="show">';
	echo '<div class="display ' . ( $image ? 'image' : 'text' ) . '" data-width="' . $width . '" data-height="' . $height . '">';
		echo '<a href="#" class="hover show open">';
			if( $image ) {
				echo '<img src="' . $image->url() .  '"/>';
			} else {
				echo '<h3>' . $title . '</h3>';
				echo '<h4>';
					if( $date ) {
						echo '<span>' . $date . '</span>';
					}
					if( $type ) {
						echo '<span>' . $type . ' Event</span>';
					}
				echo '</h4>';
			}
		echo '</a>';
	echo '</div>';
	echo '<div class="info">';
		echo '<div class="center">';
			if( $image ) {
				echo '<div class="title">';
					echo '<h2 class="hover">' . $title . '</h2>';
				echo '</div>';
				echo '<div class="meta">';
					echo '<div class="row">';
						if( $date ) {
							echo '<span>' . $date . '</span>';
						}
						if( $type ) {
							echo '<span>' . $type . ' Event</span>';
						}
					echo '</div>';
				echo '</div>';
			}
			$links = $show->links();
			echo '<div class="more">';
				echo '<div class="inner">';
					if( !$links->empty() ) {
						echo '<ul class="links">';
							foreach ($links->toStructure() as $i => $link) {
								echo '<li>';
									echo '<a href="' . $link->_url() . '" target="_blank">' . $link->_title() . '</a>';
								echo '</li>';
							}
						echo '</ul>';
					}
				echo '</div>';
			echo '</div>';
		echo '</div>';
	echo '</div>';
echo '</div>';
?>