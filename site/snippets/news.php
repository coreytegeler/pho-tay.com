<?php
$page = page('news');
$index = 0;
$news = $page->children()->filterBy( 'featured', '!=', 'true' )->sortBy( 'date', 'desc' );
if( sizeof( $news ) ) {
	echo '<div class="group">';
		foreach( $news as $post ) {
			$index++;
			snippet( 'thing/post', array( 'post' => $post, 'page' => $page, 'index' => $index ) );
		}
	echo '</div>';
}
?>