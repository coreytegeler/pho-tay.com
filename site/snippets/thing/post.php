<?php
$parity = ( $index % 2 == 0 ? 'even' : 'odd' );
$title = $post->title();
$type = $post->type();
$about = $post->about();
echo '<div class="thing post ' . $parity . '" data-type="post">';
	echo '<div class="display text">';
		echo '<a href="#" class="hover post open">';
			echo '<h3>' . $title . '</h3>';
			echo '<div class="border">';
				if( $date = $post->date( 'm.d.y' ) ) {
					echo '<h4>' . $date . '</h4>';
				}
			echo '</div>';
		echo '</a>';
	echo '</div>';
	echo '<div class="info">';
		echo '<div class="center">';
			snippet( 'info/post', array( 'post' => $post ) );
		echo '</div>';
	echo '</div>';
echo '</div>';
?>