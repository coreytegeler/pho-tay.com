<?php
$parity = ( $index % 2 == 0 ? 'even' : 'odd' );
if( $image = $release->art() ) {
	if( $image = $release->image( $image ) ) {
		$image = $image->resize(800, 800, 100);
	}
}
$title = $release->title();
$type = $release->type();
$links = $release->links();
if( $image ) {
	$width = $image->width();
	$height = $image->height();
} else {
	$width = null;
	$height = null;
}
echo '<article class="thing ' . $parity . ( $type == 'release' ? ' large' : '' ) . '" data-type="release">';
	echo '<div class="display ' . ( $image ? 'image' : 'text' ) . '" data-width="' . $width . '" data-height="' . $height . '">';
		echo '<a href="#" class="hover release open">';
			if( $image ) {
				echo '<img src="' . $image->url() .  '"/>';
			}
		echo '</a>';
		echo '<div class="more">';
			echo '<div class="inner">';
				if( !$links->empty() ) {
					echo '<div class="links">';
						foreach ($links->toStructure() as $i => $link) {
							echo '<a href="' . $link->_url() . '" target="_blank">' . $link->_title() . '</a>';
						}
					echo '</div>';
				}
			echo '</div>';
		echo '</div>';
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
					if( $label = $release->label() ) {
						echo '<span class="label">' . $label . '</span>';
					}
				echo '</div>';
			echo '</div>';
			snippet( 'info/release', array( 'release' => $release ) );
		echo '</div>';
	echo '</div>';
echo '</article>';
?>