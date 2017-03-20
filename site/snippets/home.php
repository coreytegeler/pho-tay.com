<?php
echo '<section id="home">';
	echo '<div id="scenes">';
	  $scenes = array( 'seasonal', 'gazing' );
	  foreach( $scenes as $index => $scene ) {
	  	echo '<div class="scene" id="' . $scene . '"/>';
		  	echo '<div class="logo">' . file_get_contents( 'assets/img/logo.svg' ) . '</div>';
		  	snippet( 'scenes/' . $scene );
		  echo '</div>';
	  }
	echo '</div>';
echo '</section>';
?>