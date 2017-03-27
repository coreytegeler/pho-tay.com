<?php
echo '<section id="home">';
	echo '<div id="photos">';
		echo '<div id="logo" class="hide">' . file_get_contents( 'assets/img/logo.svg' ) . '</div>';
		$home = page( 'home' );
  	$photos = $home->backgrounds()->split(',');
	  // shuffle( $photos );
  	foreach( $photos as $index => $photo ) {
  		$photoUrl = $home->image( $photo )->resize( 1200 )->url();
	  	echo '<div class="bg" data-image="' . $photoUrl . '"></div>';
	  }
		echo '<div class="scope follow"></div>';
  echo '</div>';
echo '</section>';
?>