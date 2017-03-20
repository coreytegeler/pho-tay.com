<?php
if( $image = $release->_image() ) {
	$image_url = $page->image( $image )->resize(800, 800, 100)->url();
}
$title = $release->_title();
echo '<div class="thing">';
	echo '<div class="image">';
		echo '<a href="' . $release->_link() . '" target="_blank" class="tile release">';
			if( $image_url ) {
				echo '<img src="' . $image_url .  '"/>';
			}
		echo '</a>';
	echo '</div>';
	echo '<div class="info">';
		echo '<h2>' . $title . '</h2>';
	echo '</div>';
echo '</div>';
?>