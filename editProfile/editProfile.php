<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 'on');
ini_set('max_execution_time', 10);

require '../ConexionPdo.php';
require '../Cifrado.php';

session_start();
$conexion = new ConexionPdo();
$pdo = $conexion::conectar('scoop');

if (!isset($_POST['user'], $_POST['password'], $_POST['birthdate'])) {
    echo json_encode(["error" => "Faltan datos"]);
    exit;
}

$email = $_SESSION['usuario']['email'];
$user = $_POST['user'];
$password = Cifrado::encriptar($_POST['password']);
$birthdate = $_POST['birthdate'];

$profileImageBase64 = null;
$bannerImageBase64 = null;

if (isset($_FILES['profileImage']) && $_FILES['profileImage']['error'] === 0) {
    $profileImagePath = $_FILES['profileImage']['tmp_name'];
    $profileImageBase64 = base64_encode(file_get_contents($profileImagePath));
}

if (isset($_FILES['bannerImage']) && $_FILES['bannerImage']['error'] === 0) {
    $bannerImagePath = $_FILES['bannerImage']['tmp_name'];
    $bannerImageBase64 = base64_encode(file_get_contents($bannerImagePath));
}

$sql = 'UPDATE usuario SET user = :user, password = :password, birthdate = :birthdate';

$params = [
    ':user' => $user,
    ':password' => $password,
    ':birthdate' => $birthdate,
    ':email' => $email,
];

if ($profileImageBase64) {
    $sql .= ', profile_image = :profileImage';
    $params[':profileImage'] = $profileImageBase64;
}

if ($bannerImageBase64) {
    $sql .= ', banner_image = :bannerImage';
    $params[':bannerImage'] = $bannerImageBase64;
}

$sql .= ' WHERE email = :email';

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $_SESSION['usuario']['user'] = $user;
    $_SESSION['usuario']['birthdate'] = $birthdate;
    if ($profileImageBase64) $_SESSION['usuario']['profile_image'] = $profileImageBase64;
    if ($bannerImageBase64) $_SESSION['usuario']['banner_image'] = $bannerImageBase64;

    echo json_encode(["bien" => "Perfil actualizado correctamente"]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Error al actualizar perfil: " . $e->getMessage()]);
}