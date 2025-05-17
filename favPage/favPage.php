<?php

ini_set("error_reporting", E_ALL);
ini_set("display_errors", "on");

include_once 'SPOONFAVPAGE.php';

session_start();
$request = json_decode(file_get_contents('php://input'), true);

if ($request) $request = $request['data'];

if ($request && $request['accion'] == 'selectRestaurantesFav') {
    $restaurantesFav = SPOONFAVPAGE::selectRestaurantesFav($request['userId']);
    echo json_encode($restaurantesFav);
    die();
}

if ($request && $request['accion'] == 'deleteRestauranteFav') {
    $restauranteFav = SPOONFAVPAGE::deleteRestauranteFav($request['idRestauranteFav']);
    echo json_encode($restauranteFav);
    die();
}