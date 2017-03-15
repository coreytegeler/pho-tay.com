<?php
$image = $data->_image();
echo '<div style="display:table;">';
	if ( !$image->empty() && $image = $page->image( $image ) ) {
		echo '<img style="height:5em;display:inline;margin-bottom:-1em;" src="' . $image->url() . '"/>';
	}
	echo '<h1 style="display:inline;font-size:5em;line-height:1.2em;">' . $data->_title() . '</h1>';
echo '</div>';
?>