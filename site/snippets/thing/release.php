<?php
if( $image = $release->art() ) {
	if( $image = $release->image( $image ) ) {
		$image = $image->resize(800, 800, 100);
	}
}
$title = $release->title();
$slug = $release->slug();
$type = $release->type();
$about = $release->about()->kirbytext();
$tracks = $release->tracks();
$links = $release->links();
$embed = $release->embed();
if( $image ) {
	$width = $image->width();
	$height = $image->height();
} else {
	$width = null;
	$height = null;
}
if($type == 'album') {
	$classes = ' large full';
} else {
	$classes = 'half';
}
echo '<div class="thing release ' . $classes . '" data-type="release" data-slug="' . $slug . '">';
	echo '<div class="display ' . ( $type == 'album' && $image ? 'image' : 'text' ) . '" data-width="' . $width . '" data-height="' . $height . '">';
		echo '<a href="#" class="hover release open">';
			if( $image && $type == 'album' ) {
				echo '<img src="' . $image->url() .  '"/>';
			} else {
				echo '<h3>' . $title . '</h3>';
			}
		echo '</a>';
		echo '<div class="more">';
			echo '<div class="inner">';
				if( !$embed->empty() ) {
					echo '<div class="embed release"></div>';
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
					if( $release->date() ) {
						echo '<span class="date">' . $release->date( 'm.d.y' ) . '</span>';
					}
					if( !$release->label()->empty() ) {
						echo '<span class="label">' . $release->label() . '</span>';
					}
				echo '</div>';
			echo '</div>';
			echo '<div class="more">';
				echo '<div class="inner">';
					if( !$links->empty() ) {
						echo '<div class="links">';
							foreach ($links->toStructure() as $i => $link) {
								echo '<a href="' . $link->_url() . '" target="_blank">' . $link->_title() . '</a>';
							}
						echo '</div>';
					}
					if( !$about->empty() ) {
						echo '<div class="about">';
							echo $about->kirbytext();
						echo '</div>';
					}
				echo '</div>';
			echo '</div>';
		echo '</div>';
	echo '</div>';
echo '</div>';
?>