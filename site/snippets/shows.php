<?php
$page = page('shows');
$index = 0;
$shows = $page->children()->sortBy( 'date', 'desc' );
if( sizeof( $shows ) ) {
	echo '<div class="group">';
		foreach( $shows as $show ) {
			$index++;
			snippet( 'thing/show', array( 'show' => $show, 'page' => $page, 'index' => $index ) );
		}
	echo '</div>';
}
?>