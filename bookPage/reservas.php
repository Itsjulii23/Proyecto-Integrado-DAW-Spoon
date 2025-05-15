<?php

ini_set("error_reporting", E_ALL);
ini_set("display_errors", "on");

include_once 'SPOONRESERVAS.php';

session_start();
if (!isset($_SESSION['usuario'])) {
    header("Location: ../loginPage/loginPage.php");
    exit();
}

$request = json_decode(file_get_contents('php://input'), true);

if ($request) $request = $request['data'];

if ($request && $request['accion'] == 'selectRestauranteId') {
    $dataRestauranteId = SPOONRESERVAS::selectRestauranteId($request['restauranteId']);
    echo json_encode($dataRestauranteId);
    die();
}

if ($request && $request['accion'] == 'insertReservaId') {
    $dataReservaId = SPOONRESERVAS::insertReservaId($request['restauranteId'], $request['fechaReserva'], $request['horaReserva'], $request['numPersonas'], $request['userId']);
    echo json_decode($dataReservaId);
    die();
}