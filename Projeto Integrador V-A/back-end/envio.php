<?php
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

require_once 'conexao.php';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Método não permitido. Use POST.']);
    exit();
}

// Ler o corpo da requisição JSON
$json_data = file_get_contents('php://input');
$data = json_decode($json_data, true);

if ($data === null) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Dados JSON inválidos.']);
    exit();
}

// Função para limpar e validar strings
function sanitizeString($str) {
    return htmlspecialchars(strip_tags(trim($str)));
}
// Coleta e sanitiza os dados do JSON
$type = sanitizeString($data['type'] ?? '');
$name = sanitizeString($data['name'] ?? '');
$age = sanitizeString($data['age'] ?? '');
$gender = sanitizeString($data['gender'] ?? '');
$size = sanitizeString($data['size'] ?? '');
$coat = sanitizeString($data['coat'] ?? '');
$racaPrimaria = sanitizeString($data['Raca_primaria'] ?? '');
$ong = sanitizeString($data['Ong'] ?? '');
$photo = sanitizeString($data['photo'] ?? '');

// Validação mínima
if (empty($type) || empty($name) || empty($ong)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Os campos "type", "name" e "ong" são obrigatórios.']);
    exit();
}

// Inserção no banco de dados
try {
    $stmt = $conn->prepare("
        INSERT INTO dados (
            type,
            name,
            photo,
            age,
            gender,
            size,
            coat,
            Raca_primaria,
            Ong
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->bind_param("sssssssss", $type, $name, $photo, $age, $gender, $size, $coat, $racaPrimaria, $ong);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        http_response_code(201);
        echo json_encode(['status' => 'success', 'message' => 'Pet registrado com sucesso.']);
    } else {
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Erro ao registrar o pet.']);
    }

    $stmt->close();
} catch (Exception $e) {
    error_log("Erro no banco: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Erro interno.']);
    exit();
}
?>