<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$port = "5432";
$user = "postgres";
$dbname = "ottwebapp";
$password = "maruti9121";

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json_input = file_get_contents("php://input");
    $input = json_decode($json_input, true);
    if ($input != null) {
        $animeid = $input['animeid'];
        try {
            $pdo = new PDO("pgsql:host=$host port=$port user=$user dbname=$dbname password=$password");
            $query = "select * from anime_data where animeid='$animeid'";
            $results = $pdo->query($query);
            $data = $results->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($data);
            exit();

        } catch (PDOException $e) {
            $msg = array('error' => 'Database Connection Failed');
            echo $msg . $e->getMessage();
        }

    } else {
        $response = "Empty input request";
        echo json_encode($response);
    }
}
?>