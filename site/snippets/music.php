<?php
$page = page('music');
$index = 0;
$releases = $page->children()->filterBy( 'featured', 'false' );

$albums = $releases->filterBy( 'type', 'album' )->sortBy( 'date', 'desc' );
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

$mixes = $releases->filterBy( 'type', 'mix' )->sortBy( 'date', 'desc' );
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

$remixes = $releases->filterBy( 'type', 'remix' )->sortBy( 'date', 'desc' );
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