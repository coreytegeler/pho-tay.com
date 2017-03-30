<?php
echo '<section id="home">';
	echo '<div id="logo" class="animate">' . file_get_contents( 'assets/img/logo.svg' ) . '</div>';
	$photoUrl = '/assets/photos/snowing.jpg';
	echo '<div id="photos">';
		$home = page( 'home' );
  	$photos = $home->backgrounds()->split(',');
	  // shuffle( $photos );
  	foreach( $photos as $index => $photo ) {
  		$photoUrl = $home->image( $photo )->resize( 1500 )->url();
	  	echo '<div class="bg animate" data-image="' . $photoUrl . '"></div>';
	  }
		echo '<div class="mask">';
			echo '<canvas id="canvas" resize></canvas>';
			echo '<img src="/assets/img/spotlight.png" id="spotlightRaster"/>';
		echo '</div>';
  echo '</div>';
echo '</section>';
?>