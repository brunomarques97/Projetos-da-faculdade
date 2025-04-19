<?php
    header("Access-Control-Allow-Origin: *"); 
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "pets";

    $conn = null; 

    try {
        $conn = new mysqli($servername, $username, $password, $dbname);

        $conn->set_charset("utf8");

        if ($conn->connect_error) {
            die("Erro na conexão com o banco de dados: " . $conn->connect_error);
        }
        } catch (Exception $e) {
        die("Erro ao conectar com o banco de dados: " . $e->getMessage());
}   
?>
