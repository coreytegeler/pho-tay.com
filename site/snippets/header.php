<!doctype html>
<html lang="<?= site()->language() ? site()->language()->code() : 'en' ?>">
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?= $site->title()->html() ?></title>
  <meta name="description" content="<?= $site->description()->html() ?>">

  <?php
  echo css('assets/css/styles.css?version=1.0');
  echo js('assets/js/jquery.js');
  echo js('assets/js/jquery.transit.js');
  echo js('assets/js/imagesloaded.pkgd.min.js');
  echo js('assets/js/marquee3k.min.js');
  echo js('assets/js/scripts.js?version=1.0');
  ?>

</head>
<body>