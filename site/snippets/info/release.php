<?php
$about = $release->about()->kirbytext();
$links = $release->links();
$tracks = $release->tracks();
echo '<div class="more">';
	echo '<div class="inner">';
		if( !$links->empty() ) {
			echo '<ul class="links">';
				foreach ($links->toStructure() as $i => $link) {
					echo '<li>';
						echo '<a href="' . $link->_url() . '" target="_blank">' . $link->_title() . '</a>';
					echo '</li>';
				}
			echo '</ul>';
		}
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