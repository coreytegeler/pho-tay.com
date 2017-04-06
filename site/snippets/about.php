<?php
$about = page( 'about' );
$links = $about->links();
echo '<section id="about">';
	echo '<div class="left half">';
		echo '<div class="inner">';
			if( $text = $about->about() ) {
				echo '<h4>' . $text->kirbytext() . '</h4>';
			}
		echo '</div>';
	echo '</div>';
	echo '<div class="right half">';
		echo '<div class="inner">';
			if( !$links->empty() ) {
				echo '<div class="links">';
					foreach ($links->toStructure() as $i => $link) {
						echo '<a href="' . $link->_url() . '" target="_blank"><h3>';
							echo $link->_title();
						echo '</h3></a>';
					}
				echo '</div>';
			}
		echo '</div>';
	echo '</div>';
echo '</section>';
?>