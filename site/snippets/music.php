<?php
$page = page('music');
echo '<section id="releases">';
	
	$releases = $page->things()->toStructure()->filterBy( '_type', 'release' );
	// echo '<div class="label">';
	// 	echo '<h1>Relea&shy;ses</h1>';
	// echo '</div>';
	foreach( $releases as $index => $release ) {
		snippet( 'thing/release', array( 'release' => $release, 'page' => $page ) );
	}

	$mixes = $page->things()->toStructure()->filterBy( '_type', 'mix' );
	// echo '<div class="label">';
	// 	echo '<h1>Mix&shy;es</h1>';
	// echo '</div>';
	foreach( $mixes as $index => $mix ) {
		snippet( 'thing/release', array( 'release' => $mix, 'page' => $page ) );
	}

	// echo '<div class="label">';
	// 	echo '<h1>Re&shy;mix&shy;es</h1>';
	// echo '</div>';
	$remixes = $page->things()->toStructure()->filterBy( '_type', 'remix' );
	foreach( $remixes as $index => $remix ) {
		snippet( 'thing/release', array( 'release' => $remix, 'page' => $page ) );
	}

echo '</section>';
?>