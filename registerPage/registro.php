<?php

//Archivo que se encarga de procesar los datos recibidos del registro y hacer consultas ala base de datos
//para la insercion de nuestro nuevo usuario.

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 'on');
ini_set('max_execution_time', 10);

require '../ConexionPdo.php';
require '../Cifrado.php';

session_start();
$conexion = new ConexionPdo();
$pdo = $conexion::conectar('scoop');

$request = json_decode(trim(file_get_contents("php://input")), true);

if (!isset($request['data'])) {
    echo json_encode(["error" => "Datos no recibidos"]);
    exit;
}
$request = $request["data"];

if (!isset($request['user']) || !isset($request['email']) || !isset($request['password']) || !isset($request['birthdate']) ||
    empty($request['user']) || empty($request['email']) || empty($request['password']) || empty($request['birthdate'])) {
    echo json_encode(["error" => "Faltan datos"]);
    exit;
}

$sql = 'SELECT email FROM usuario WHERE email = :email';
$stmt = $pdo->prepare($sql);
$stmt->execute([':email' => $request['email']]);
$usuarioExistente = $stmt->fetchColumn();

if ($usuarioExistente) {
    echo json_encode(["error" => "El email ya está registrado"]);
    exit;
}

$passwordEncriptada = Cifrado::encriptar($request['password']);

try {
    $sql = 'INSERT INTO usuario (email, password, user, birthdate) VALUES (:email, :password, :user, :birthdate)';
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        ":email" => $request['email'],
        ":password" => $passwordEncriptada,
        ":user" => $request['user'],
        ":birthdate" => $request['birthdate'],
    ]);

    $idUsuario = $pdo->lastInsertId();

    $_SESSION['usuario'] = [
        'id' => $idUsuario,
        'email' => $request['email'],
        'user' => $request['user'],
        'birthdate' => $request['birthdate']
    ];

    echo json_encode(["bien" => "Usuario Creado"]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Error al registrar usuario: " . $e->getMessage()]);
}