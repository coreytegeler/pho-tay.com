<?php
if(!r::ajax()) go(url('error'));
header('Content-type: application/json; charset=utf-8');
$page = $_GET['page'];
snippet( $page );
?>