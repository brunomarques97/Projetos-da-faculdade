<?php
ob_clean(); 
ini_set('display_errors', 0);
error_reporting(0);

require_once 'conexao.php';

function buscarComRelacionamento($tabela_principal, $tabela_relacionada, $coluna_fk, $colunas_selecionadas = '*') {
    global $conn;
    $sql = "SELECT $colunas_selecionadas
            FROM $tabela_principal
            INNER JOIN $tabela_relacionada ON $tabela_principal.$coluna_fk = $tabela_relacionada.id";
    $result = $conn->query($sql);

    header('Content-Type: application/json; charset=utf-8');

    if ($result) {
        $dados = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($dados);
    } else {
        echo json_encode(['error' => 'Erro ao buscar dados com relacionamento: ' . $conn->error]);
    }

    exit; 
}

function buscarOngs($colunas_selecionadas = '*') {
    global $conn;
    $sql = "SELECT $colunas_selecionadas FROM ongs";
    $result = $conn->query($sql);

    header('Content-Type: application/json; charset=utf-8');

    if ($result) {
        $ongs = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($ongs);
    } else {
        echo json_encode(['error' => 'Erro ao buscar ONGs: ' . $conn->error]);
    }

    exit;
}

$acao = $_GET['acao'] ?? null;
$tabela = $_GET['tabela'] ?? null;
$tabela_relacionada = $_GET['tabela_relacionada'] ?? null;
$coluna_fk = $_GET['coluna_fk'] ?? null;

if ($acao === 'listar' && $tabela === 'ongs') {
    buscarOngs();
} elseif ($acao === 'listar' && $tabela && $tabela_relacionada && $coluna_fk) {
    buscarComRelacionamento($tabela, $tabela_relacionada, $coluna_fk);
} else {
    header('HTTP/1.1 400 Bad Request');
    echo json_encode(['error' => 'Parâmetros inválidos.']);
    exit;
}

?>