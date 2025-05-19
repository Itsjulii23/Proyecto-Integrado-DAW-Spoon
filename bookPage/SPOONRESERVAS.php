<?php

//Archivo que recibe los datos de nuestro archivo php y hace las consultas en la base de datos
//en el apartado de la reserva del restaurante elegido

ini_set("error_reporting", E_ALL);
ini_set("display_errors", "on");

include_once '../ConexionPdo.php';

class SPOONRESERVAS
{
    static public $pdo = null;

    static function init(string $base)
    {
        $conexion = new ConexionPdo();
        self::$pdo = ConexionPdo::conectar($base);
    }

    static public function selectRestauranteId(int $idRestaurante): ?array
    {
        $stmt = self::$pdo->prepare("SELECT * FROM restaurante WHERE restaurante.id = :idRestaurante");
        $stmt->bindParam(':idRestaurante', $idRestaurante, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetchAll();
    }

    static public function insertReservaId(int $idRestaurante, string $fechaReserva, string $horaReserva, int $numPersonas, int $userId): bool
    {
        $stmt = self::$pdo->prepare("
        INSERT INTO reserva (fecha_reserva, hora_reserva, num_personas, restaurante_id,usuario_id)
        VALUES (:fechaReserva, :horaReserva, :numPersonas, :idRestaurante, :userId)
    ");
        $stmt->bindParam(':idRestaurante', $idRestaurante, PDO::PARAM_INT);
        $stmt->bindParam(':fechaReserva', $fechaReserva, PDO::PARAM_STR);
        $stmt->bindParam(':horaReserva', $horaReserva, PDO::PARAM_STR);
        $stmt->bindParam(':numPersonas', $numPersonas, PDO::PARAM_INT);
        $stmt->bindParam(':userId', $userId, PDO::PARAM_INT);
        return $stmt->execute();
    }
}

SPOONRESERVAS::init('scoop');