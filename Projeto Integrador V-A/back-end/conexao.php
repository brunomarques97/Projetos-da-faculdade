<?php
    header('Content-Type: application/json'); 

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "pets";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die(json_encode(['error' => 'Falha na conexão: ' . $conn->connect_error]));
    }

    $sql = "SELECT * FROM sua_tabela";
    $result = $conn->query($sql);

    $data = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    echo json_encode($data);

    $conn->close();
    ?>