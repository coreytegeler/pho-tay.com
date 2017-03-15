<?php
if( $image = $release->_image() ) {
	$image_url = $page->image( $image )->resize(800, 800, 100)->url();
}
$title = $release->_title();
echo '<a href="' . $release->_link() . '" target="_blank" class="tile release">';
	echo '<div class="inner">';
		if( $image_url ) {
			echo '<img src="' . $image_url .  '"/>';
			echo '<div class="enlarge image" style="background-image:url(' . $image_url .  ')"></div>';
		}
		echo '<div class="enlarge title"><h1>' . $title . '</h1></div>';
		// echo '<h2>' . $title . '</h2>';
	echo '</div>';
echo '</a>';
?>