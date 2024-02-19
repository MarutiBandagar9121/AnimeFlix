<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require __DIR__ . "/vendor/autoload.php";
Dotenv\Dotenv::createUnsafeImmutable(__DIR__ . '/')->load();
$firstname;
$lastname;
$email;
$pass_hash;
$salt;
$dbotp;
$otp;
$host = $_ENV['DB_HOST'];
$port = $_ENV['DB_PORT'];
$user = $_ENV['DB_USER'];
$dbname = $_ENV['DB_NAME'];
$password = $_ENV['DB_PASSWORD'];

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json_input = file_get_contents("php://input");
    $input = json_decode($json_input, true);
    if ($input != null) {
        $username=$input['username'];
        $otp = $input['otp'];
        //getting values from user data temp
        try {
            $pdo = new PDO("pgsql:host=$host port=$port dbname=$dbname user=$user password=$password");

            // Adjust the query to retrieve data from user_data_temp
            $query = "SELECT username, firstname, lastname, password_hash, email, salt, otp FROM user_data_temp WHERE username = :uname";

            $stmt = $pdo->prepare($query);
            $stmt->bindParam(':uname', $username);
            $stmt->execute();

            // Fetch the data
            
            $userData = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($userData !== false){
            
            $username = $userData['username'];
            $firstname = $userData['firstname'];
            $lastname = $userData['lastname'];
            $email = $userData['email'];
            $pass_hash = $userData['password_hash'];
            $salt = $userData['salt'];
            $dbotp = $userData['otp'];
            }
            else {
                // Handle the case where fetch returned false
                $response = array('error' => 'User not found empty retrival',"username"=>$username);
                echo json_encode($response);
                exit();
            }

            if ($dbotp == $otp) {
                try {
                    $pdo = new PDO("pgsql:host=$host port=$port dbname=$dbname user=$user password=$password");
                    
                    // Insert data into user_data
                    $queryInsert = "INSERT INTO user_data (username, firstname, lastname, password_hash, email, salt) VALUES (:uname, :fname, :lname, :pass, :email, :salt)";
                    $stmtInsert = $pdo->prepare($queryInsert);
                    $stmtInsert->bindParam(':uname', $username);
                    $stmtInsert->bindParam(':fname', $firstname);
                    $stmtInsert->bindParam(':lname', $lastname);
                    $stmtInsert->bindParam(':pass', $pass_hash);
                    $stmtInsert->bindParam(':email', $email);
                    $stmtInsert->bindParam(':salt', $salt);
                    $stmtInsert->execute();
                
                    // Check if the insert was successful
                    if ($stmtInsert->rowCount() > 0) {
                        // Delete record from user_data_temp with the same username
                        $queryDelete = "DELETE FROM user_data_temp WHERE username = :uname";
                        $stmtDelete = $pdo->prepare($queryDelete);
                        $stmtDelete->bindParam(':uname', $username);
                        $stmtDelete->execute();
                
                        $response = array('success' => 'OTP match', 'msg' => 'Record inserted successfully and deleted from user_data_temp.');
                        echo json_encode($response);
                    } else {
                        $response = array('error' => 'Insert failed', 'msg' => 'Record not deleted from user_data_temp.');
                        echo json_encode($response);
                    }
                } catch (PDOException $e) {
                    $msg = $e->getMessage();
                    var_dump($msg);
                    $response = array(
                        'error' => 'Connection failed',
                        'message' => $msg
                    );
                    echo json_encode($response);
                    exit();
                }
                

            } else {
                // Data not found
                $response = array('error' => 'User not found',"dbotp"=>$dbotp,"otp"=>$otp);
                echo json_encode($response);
                exit();
            }

        } catch (PDOException $e) {
            $msg = $e->getMessage();
            var_dump($msg);
            $response = array(
                "error" => "Connection failed",
                "message" => $msg
            );
            echo json_encode($response);
            exit();
        }
    }
}
?>