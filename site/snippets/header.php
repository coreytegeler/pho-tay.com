<!doctype html>
<html lang="<?= site()->language() ? site()->language()->code() : 'en' ?>">
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <title><?= $site->title()->html() ?></title>
  <meta name="description" content="<?= $site->description()->html() ?>">

  <?php
  echo css('assets/css/styles.css');
  echo js('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js');
  echo js('https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js');
  echo js('assets/js/marquee3k.min.js');
  echo js('assets/js/scripts.js');
  ?>

</head>
<body>