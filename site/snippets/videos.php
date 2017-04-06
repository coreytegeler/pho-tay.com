<?php
$page = page('videos');
$index = 0;
$videos = $page->children()->filterBy( 'featured', '!=', 'true' );
$music_videos = $videos->filterBy( 'type', 'music_video' )->sortBy( 'date', 'desc' );
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

$lives = $videos->filterBy( 'type', 'live' )->sortBy( 'date', 'desc' );
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
?>