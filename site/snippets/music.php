<?php
$page = page('music');
$index = 0;
echo '<section id="releases">';
	
	$releases = $page->children()->filterBy( 'type', 'release' )->sortBy( 'date', 'desc' );
	if( sizeof( $releases ) ) {
		echo '<div class="group">';
			echo '<div class="label hide">';
					echo '<h3>Releases</h3>';
				echo '</div>';
			foreach( $releases as $release ) {
				$index++;
				snippet( 'thing/release', array( 'release' => $release, 'page' => $page, 'index' => $index ) );
			}
		echo '</div>';
	}

	$mixes = $page->children()->filterBy( 'type', 'mix' )->sortBy( 'date', 'desc' );
	if( sizeof( $mixes ) ) {
		echo '<div class="group">';
			echo '<div class="label hide">';
				echo '<h3>Mix&shy;es</h3>';
			echo '</div>';
			foreach( $mixes as $mix ) {
				$index++;
				snippet( 'thing/release', array( 'release' => $mix, 'page' => $page, 'index' => $index ) );
			}
		echo '</div>';
	}

	$remixes = $page->children()->filterBy( 'type', 'remix' )->sortBy( 'date', 'desc' );
	if( sizeof( $remixes ) ) {
		echo '<div class="group">';
			echo '<div class="label hide">';
				echo '<h3>Re&shy;mix&shy;es</h3>';
			echo '</div>';
			foreach( $remixes as $remix ) {
				$index++;
				snippet( 'thing/release', array( 'release' => $remix, 'page' => $page, 'index' => $index ) );
			}
		echo '</div>';
	}

echo '</section>';
?>