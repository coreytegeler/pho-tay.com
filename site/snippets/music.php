<?php
$page = page('music');
$index = 0;
$releases = $page->children()->filterBy( 'featured', '!=', 'true' )->sortBy( 'date', 'desc' );

$albums = $releases->filterBy( 'type', 'album' );
if( sizeof( $albums ) ) {
	echo '<div class="group">';
		echo '<div class="label hide">';
			echo '<h4>Albums</h4>';
		echo '</div>';
		foreach( $albums as $album ) {
			$index++;
			snippet( 'thing/release', array( 'release' => $album, 'page' => $page, 'index' => $index ) );
		}
	echo '</div>';
}

$mixes = $releases->filterBy( 'type', 'mix' );
if( sizeof( $mixes ) ) {
	echo '<div class="group">';
		echo '<div class="label hide">';
			echo '<h4>Mix&shy;es</h4>';
		echo '</div>';
		foreach( $mixes as $mix ) {
			$index++;
			snippet( 'thing/release', array( 'release' => $mix, 'page' => $page, 'index' => $index ) );
		}
	echo '</div>';
}

$remixes = $releases->filterBy( 'type', 'remix' );
if( sizeof( $remixes ) ) {
	echo '<div class="group">';
		echo '<div class="label hide">';
			echo '<h4>Re&shy;mix&shy;es</h4>';
		echo '</div>';
		foreach( $remixes as $remix ) {
			$index++;
			snippet( 'thing/release', array( 'release' => $remix, 'page' => $page, 'index' => $index ) );
		}
	echo '</div>';
}
?>