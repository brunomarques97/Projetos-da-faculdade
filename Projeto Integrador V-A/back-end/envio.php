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

// Função para limpar e validar strings
function sanitizeString($str) {
    return htmlspecialchars(strip_tags(trim($str)));
}

// Função para validar extensões permitidas
function isValidImageExtension($ext) {
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
    return in_array(strtolower($ext), $allowedExtensions);
}

// Coleta e sanitiza os dados
$type = sanitizeString($_POST['type'] ?? '');
$name = sanitizeString($_POST['name'] ?? '');
$age = sanitizeString($_POST['age'] ?? '');
$gender = sanitizeString($_POST['gender'] ?? '');
$size = sanitizeString($_POST['size'] ?? '');
$coat = sanitizeString($_POST['coat'] ?? '');
$racaPrimaria = sanitizeString($_POST['Raca_primaria'] ?? '');
$ong = sanitizeString($_POST['Ong'] ?? '');

// Validação mínima
if (empty($type) || empty($name)) || empty($ong) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Os campos "type" , "name" , "ong são obrigatórios.']);
    exit();
}

// Upload de imagem
$photoUrl = null;

if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
    $tmpPath = $_FILES['photo']['tmp_name'];
    $originalName = basename($_FILES['photo']['name']);
    $fileExtension = pathinfo($originalName, PATHINFO_EXTENSION);

    if (!isValidImageExtension($fileExtension)) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Extensão de imagem inválida.']);
        exit();
    }

    $uploadDir = 'uploads';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    $newFileName = uniqid('img_', true) . '.' . $fileExtension;
    $destination = $uploadDir . $newFileName;

    if (move_uploaded_file($tmpPath, $destination)) {
        $scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https" : "http";
        $photoUrl = "$scheme://{$_SERVER['HTTP_HOST']}/$destination";
    } else {
        error_log('Erro ao mover o arquivo de upload.');
    }
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
    $stmt->bind_param("sssssssss", $type, $name, $photoUrl, $age, $gender, $size, $coat, $racaPrimaria, $ong);
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

