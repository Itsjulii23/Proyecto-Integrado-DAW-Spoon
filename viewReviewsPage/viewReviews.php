<?php

//Archivo que se encarga de recibir los datos de nuestro frontend en donde se hacen peticiones
//a una rchivo que se erealizar de hacer las consultas a la base de datos.

ini_set("error_reporting", E_ALL);
ini_set("display_errors", "on");

include_once 'SPOONVIEWREVIEWS.php';

session_start();
if (!isset($_SESSION['usuario'])) {
    header("Location: loginPage.php");
    exit();
}

$request = json_decode(file_get_contents('php://input'), true);

if ($request) $request = $request['data'];

if ($request && $request['accion'] == 'cargarValoraciones') {
    $reserva = SPOONVIEWREVIEWS::cargarValoraciones($request['userId']);
    echo json_encode($reserva);
    die();
}

if ($request && $request['accion'] == 'eliminarValoracion') {
    $reserva = SPOONVIEWREVIEWS::eliminarValoracion($request['idValoracion']);
    echo json_encode($reserva);
    die();
}