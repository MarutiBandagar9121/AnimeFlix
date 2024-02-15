<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

//echo "hii";

// $username = $input['uname'];
// $pass = $input['pass'];
//echo $username;
$host = "localhost";
$port = "5432";
$user = "postgres";
$dbname = "ottwebapp";
$password = "maruti9121";
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