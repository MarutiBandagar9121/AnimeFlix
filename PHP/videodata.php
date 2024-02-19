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
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json_input = file_get_contents("php://input");
    $input = json_decode($json_input, true);
    if ($input != null){
        $aid=$input['animeid'];
        try {
            $pdo = new PDO("pgsql:host=$host port=$port user=$user dbname=$dbname password=$password");
            $query = "select * from video_data where animeid='$aid'";
            $results = $pdo->query($query);
            $data = $results->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($data);
            exit();
        
        } catch (PDOException $e) {
            $msg = array('error' => 'Database Connection Failed');
            echo $msg . $e->getMessage();
        }
    }
    else{
        $response="Empty input request";
        echo json_encode($response);
    }
}

?>