<?php

include_once 'SPOONFAVPAGE.php';

session_start();
$request = json_decode(file_get_contents('php://input'), true);

if ($request) $request = $request['data'];

if ($request && $request['accion'] == 'selectRestaurantesFav') {
    $restaurantesFav = SPOONFAVPAGE::selectRestaurantesFav($request['userId']);
    echo json_encode($restaurantesFav);
    die();
}

if ($request && $request['accion'] == 'deleteRestaurantesFav') {
    SPOONFAVPAGE::deleteRestauranteFav($request['idGuardado']);
    echo json_encode(["status" => "ok"]);
    die();
}