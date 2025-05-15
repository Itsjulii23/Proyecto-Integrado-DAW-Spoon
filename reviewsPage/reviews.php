<?php

ini_set("error_reporting", E_ALL);
ini_set("display_errors", "on");

include_once 'SPOONREVIEWS.php';

session_start();
if (!isset($_SESSION['usuario'])) {
    header("Location: ../loginPage/loginPage.php");
    exit();
}

$request = json_decode(file_get_contents('php://input'), true);

if ($request) $request = $request['data'];

if ($request && $request['accion'] == 'selectRestauranteId') {
    $dataRestauranteId = SPOONREVIEWS::selectRestauranteId($request['idRestaurante']);
    echo json_encode($dataRestauranteId);
    die();
}

if ($request && $request['accion'] == 'insertarReview') {
    $dataReviewId = SPOONREVIEWS::insertReview($request['idRestaurante'], $request['puntuacion'], $request['comentario'], $request['idUser']);
    echo json_encode($dataReviewId);
    die();
}