<?php
// echo '<section id="home">';
	// snippet( 'nav' );
echo '<div id="fixings">';
	$home = page( 'home' );
	$photos = $home->backgrounds()->split(',');
  shuffle( $photos );
	foreach( $photos as $index => $photo ) {
		$photoUrl = $home->image( $photo )->resize( 1500 )->url();
  	echo '<div class="bg animate" data-image="' . $photoUrl . '"></div>';
  }
	echo '<div class="mask">';
		snippet( 'about' );
		echo '<div id="black"></div>';
		echo '<canvas id="canvas" resize></canvas>';
	echo '</div>';
echo '</div>';
$logo = kirby()->urls()->assets() . '/img/logo.svg';
// echo '</section>';
?>