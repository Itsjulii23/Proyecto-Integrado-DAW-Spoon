<?php
//Archivo php en donde se recogen los datos y envian a un archivo que hace las consultas
//a nuestra base de datos

ini_set("error_reporting", E_ALL);
ini_set("display_errors", "on");

include_once 'SPOONBOOKING.php';

session_start();
if (!isset($_SESSION['usuario'])) {
    header("Location: loginPage.php");
    exit();
}

$request = json_decode(file_get_contents('php://input'), true);

if ($request) $request = $request['data'];

if ($request && $request['accion'] == 'selectReservas') {
    $reserva = SPOONBOOKING::selectReservas($request['userId']);
    echo json_encode($reserva);
    die();
}

if ($request && $request['accion'] == 'deleteReserva') {
    $reserva = SPOONBOOKING::deleteReserva($request['idReserva']);
    echo json_encode($reserva);
    die();
}