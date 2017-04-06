<?php
$about = $release->about()->kirbytext();
$tracks = $release->tracks();
echo '<div class="more">';
	echo '<div class="inner">';
		if( !$about->empty() ) {
			echo '<div class="about">';
				echo $about->kirbytext();
			echo '</div>';
		}
		if( !$tracks->empty() ) {
			echo '<ol class="tracks">';
				foreach ($tracks->toStructure() as $i => $track) {
					echo '<li>';
						echo '<span class="title">' . $track->_title() . '</span>';
						echo '<span class="length">' . $track->_length() . '</span>';
					echo '</li>';
				}
			echo '</ol>';
		}
	echo '</div>';
echo '</div>';
?>