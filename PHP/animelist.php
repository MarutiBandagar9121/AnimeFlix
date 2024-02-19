<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require __DIR__ . "/vendor/autoload.php";
Dotenv\Dotenv::createUnsafeImmutable(__DIR__ . '/')->load();
$host = $_ENV['DB_HOST'];
$port = $_ENV['DB_PORT'];
$user = $_ENV['DB_USER'];
$dbname = $_ENV['DB_NAME'];
$password = $_ENV['DB_PASSWORD'];
try {
    $pdo = new PDO("pgsql:host=$host port=$port user=$user dbname=$dbname password=$password");
    $query = "select * from anime_data";
    $results = $pdo->query($query);
    $data = $results->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($data);
    exit();

} catch (PDOException $e) {
    $msg = array('error' => 'Database Connection Failed');
    echo $msg . $e->getMessage();
}
?>