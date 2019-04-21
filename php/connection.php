<?php
    $server = "127.0.0.1";
    $user = "root";
    $pass = "";
    $database = "agustermo";

    $link = new mysqli($server, $user, $pass, $database);
    if($link->connect_errno) {
        printf("Connect failed: %s\n", mysqli_connect_error());
        exit();
    }

    // For warnings, '0' <=> '1'
    error_reporting(E_ALL);
    ini_set('display_errors', '1');
    // Define charset
    $charset = "utf8";
    mysqli_set_charset($link, $charset);
?>
