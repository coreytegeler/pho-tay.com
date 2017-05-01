<?php
echo '<!doctype html>';
echo '<html lang="' . ( site()->language() ? site()->language()->code() : 'en' ) . '">';
echo '<head>';

  echo '<meta charset="utf-8">';
  echo '<meta name="viewport" content="width=device-width,initial-scale=1.0">';

  echo '<title>' . $site->title()->html() . '</title>';
  echo '<meta name="description" content="' . $site->description()->html() . '">';

  echo css( 'assets/css/styles.css?version=1.0' );
  echo js( 'assets/js/jquery.js' );
  echo js( 'assets/js/jquery.transit.js' );
  echo js( 'assets/js/imagesloaded.pkgd.min.js' );
  echo js( 'assets/js/paper-full.min.js' );
  echo js( 'assets/js/masonry.pkgd.min.js' );
  echo js( 'assets/js/scripts.js?version=' . date('mdYhis' ) );
  echo '<script type="text/paperscript" src="' . kirby()->urls()->assets() . '/js/canvas.js?version=' . date('mdYhis' ) . '" canvas="canvas"></script>';

echo '</head>';
echo '<body data-root="' . url('/') . '" data-page="' . $page->slug() . '">';
echo '<div id="wrapper">';