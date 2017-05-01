<?php
if(!r::ajax()) go(url('error'));
header('Content-type: application/json; charset=utf-8');
$page = $_GET['page'];
$slug = $_GET['slug'];
if( $slug ) {
	$embed = page( $page . '/' . $slug )->embed();
	if( !$embed->empty() ) {
		echo $embed->kirbytext();
	}
} else {
	snippet( $page );
}
?>