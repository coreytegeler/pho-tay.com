<?php
$page = page('videos');
$index = 0;
$videos = $page->children()->filterBy( 'featured', '!=', 'true' );
$music_videos = $videos->filterBy( 'type', 'music_video' )->sortBy( 'date', 'desc' );
echo '<div class="group grid">';
	if( sizeof( $music_videos ) ) {
		foreach( $music_videos as $music_video ) {
			$index++;
			snippet( 'thing/video', array( 'video' => $music_video, 'page' => $page, 'index' => $index ) );
		}
	}
	$lives = $videos->filterBy( 'type', 'live' )->sortBy( 'date', 'desc' );
	if( sizeof( $lives ) ) {
		foreach( $lives as $live ) {
			$index++;
			snippet( 'thing/video', array( 'video' => $live, 'page' => $page, 'index' => $index ) );
		}
	}
echo '</div>';
?>