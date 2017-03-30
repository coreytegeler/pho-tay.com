<?php
$page = page('videos');
$index = 0;
$releases = $page->children()->filterBy( 'featured', 'false' );
echo '<section class="things" id="releases">';
	$music_videos = $releases->filterBy( 'type', 'music_video' )->sortBy( 'date', 'desc' );
	if( sizeof( $music_videos ) ) {
		echo '<div class="group">';
			echo '<div class="label hide">';
					echo '<h3>Music Videos</h3>';
				echo '</div>';
			foreach( $music_videos as $music_video ) {
				$index++;
				snippet( 'thing/video', array( 'video' => $music_video, 'page' => $page, 'index' => $index ) );
			}
		echo '</div>';
	}

	$lives = $releases->filterBy( 'type', 'live' )->sortBy( 'date', 'desc' );
	if( sizeof( $lives ) ) {
		echo '<div class="group">';
			echo '<div class="label hide">';
				echo '<h3>Live</h3>';
			echo '</div>';
			foreach( $lives as $live ) {
				$index++;
				snippet( 'thing/video', array( 'video' => $live, 'page' => $page, 'index' => $index ) );
			}
		echo '</div>';
	}

echo '</section>';
?>