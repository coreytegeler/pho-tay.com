<?php
$text = $post->text()->kirbytext();
echo '<div class="more">';
	echo '<div class="inner">';
		echo $text;
	echo '</div>';
echo '</div>';
?>