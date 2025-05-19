<?php

//Se encarga de recibir los datos necesarios o de mandar las peticiones a un archivo que se encarga
//de hacer las peticiones a nuestra base de datos.

ini_set("error_reporting", E_ALL);
ini_set("display_errors", "on");

include_once 'Spoon.php';

session_start();
$request = json_decode(file_get_contents('php://input'), true);

if ($request) $request = $request['data'];

if ($request && $request['accion'] == 'cargarRestaurantesMap') {
    $restaurantes = SPOON::selectRestaurantesMap();
    echo json_encode($restaurantes);
    die();
}

if ($request && $request['accion'] == 'cargarRestaurantes') {
    $restaurantes = SPOON::selectRestaurantes();
    echo json_encode($restaurantes);
    die();
}

if ($request && $request['accion'] == 'cargarCategorias') {
    $categorias = SPOON::selectCategorias();
    echo json_encode($categorias);
    die();
}

if ($request && $request['accion'] == 'changeRestaurant') {
    $categorias = SPOON::changeRestaurant($request['idCategoria']);
    echo json_encode($categorias);
    die();
}

if ($request && $request['accion'] == 'loadModalReview') {
    $reviewsdata = SPOON::loadModalReview($request['idRestaurante']);
    echo json_encode($reviewsdata);
    die();
}

if ($request && $request['accion'] == 'guardarRestaurante') {
    $isFav = SPOON::isRestaurantFav($request['idUser'], $request['idRestaurante']);
    if ($isFav) {
        echo json_encode(['status' => 'exists']);
    } else {
        SPOON::insertRestaurantFav($request['idUser'], $request['idRestaurante']);
        echo json_encode(['status' => 'ok']);
    }
    die();
}
