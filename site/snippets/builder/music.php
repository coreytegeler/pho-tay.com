<?php
$image = $data->_image();
if ( !$image->empty() ) {
	$image = $page->image( $image );
	if( $image ) {
		echo '<img style="max-width:25%;display:table;margin:auto;" src="' . $image->url() . '"/>';
	}
}
?>