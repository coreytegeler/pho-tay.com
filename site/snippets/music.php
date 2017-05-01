<?php
$page = page('music');
$index = 0;
$releases = $page->children()->filterBy( 'featured', '!=', 'true' )->sortBy( 'date', 'desc' );

$albums = $releases->filterBy( 'type', 'album' );
if( sizeof( $albums ) ) {
	echo '<div class="group grid">';
		foreach( $albums as $album ) {
			$index++;
			snippet( 'thing/release', array( 'release' => $album, 'page' => $page, 'index' => $index ) );
		}
	echo '</div>';
}

$mixes = $releases->filterBy( 'type', 'mix' );
if( sizeof( $mixes ) ) {
	echo '<div class="group half list">';
		echo '<div class="label"><h4>Mixes</h4></div>';
		foreach( $mixes as $mix ) {
			$index++;
			snippet( 'thing/release', array( 'release' => $mix, 'page' => $page, 'index' => $index ) );
		}
	echo '</div>';
}

$remixes = $releases->filterBy( 'type', 'remix' );
if( sizeof( $remixes ) ) {
	echo '<div class="group half list">';
		echo '<div class="label"><h4>Remixes</h4></div>';
		foreach( $remixes as $remix ) {
			$index++;
			snippet( 'thing/release', array( 'release' => $remix, 'page' => $page, 'index' => $index ) );
		}
	echo '</div>';
}
?>