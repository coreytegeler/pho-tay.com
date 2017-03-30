<?php
$links = $show->links();
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
	echo '</div>';
echo '</div>';
?>