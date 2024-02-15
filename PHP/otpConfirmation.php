<?php
// session_set_cookie_params([
//     'secure' => false,  // For local development without HTTPS
//     'domain' => null,   // Allow the session cookie on any subdomain
// ]);
// session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
//$username = $_COOKIE['username'];
// if (isset($_COOKIE['username'])) {
//     $username = $_COOKIE['username'];
//     // Rest of your code
// } else {
//     echo "Cookie 'username' not set.";
// }
$username;
$firstname;
$lastname;
$email;
$pass_hash;
$salt;
$dbotp;
$otp;

// $username = $_SESSION['username'];
// $firstname = $_SESSION['firstname'];
// $lastname = $_SESSION['lastname'];
// $email = $_SESSION['email'];
// $pass_hash = $_SESSION['password'];
// $salt = $_SESSION['salt'];
// $firstname = isset($_SESSION['firstname']) ? $_SESSION['firstname'] : null;
// $lastname = isset($_SESSION['lastname']) ? $_SESSION['lastname'] : null;
// $email = isset($_SESSION['email']) ? $_SESSION['email'] : null;
// $pass_hash = isset($_SESSION['password']) ? $_SESSION['password'] : null;
// $salt = isset($_SESSION['salt']) ? $_SESSION['salt'] : null;

// if (
//     isset($_SESSION['firstname'], $_SESSION['lastname'], $_SESSION['email'], $_SESSION['password'], $_SESSION['salt'])
// ) {
//     $username = $_SESSION['username'];
//     $firstname = $_SESSION['firstname'];
//     $lastname = $_SESSION['lastname'];
//     $email = $_SESSION['email'];
//     $pass_hash = $_SESSION['password'];
//     $salt = $_SESSION['salt'];


// } else {

//     echo "Error: One or more session variables are missing.  " . session_id() . "  " . print_r($_SESSION, true);
// }



$host = "localhost";
$port = "5432";
$user = "postgres";
$dbname = "ottwebapp";
$password = "maruti9121";

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








// if ($_SERVER['REQUEST_METHOD'] == 'POST') {
//     $json_input = file_get_contents("php://input");
//     $input = json_decode($json_input, true);
//     if ($input != null) {
//         $otp = $input['otp'];
//         $pdo = new PDO("pgsql:host=$host port=$port dbname=$dbname user=$user password=$password");

//         $query = "select username,otp from user_otp";
//         $results = $pdo->query($query);
//         foreach ($results as $result) {
//             //print_r($result);
//             $existingUname = $result['username'];
//             $dbotp = $result['otp'];
//             if ($existingUname == $username) {
//                 if ($dbotp == $otp) {
//                     //adding to database start
//                     try {

//                         $pdo = new PDO("pgsql:host=$host port=$port dbname=$dbname user=$user password=$password");
//                         $query = "INSERT INTO user_data (username, firstname, lastname, password_hash, email,salt) VALUES (:uname, :fname, :lname, :pass ,:email,:salt)";
//                         $stmt = $pdo->prepare($query);
//                         $stmt->bindParam(':uname', $username);
//                         $stmt->bindParam(':fname', $firstname);
//                         $stmt->bindParam(':lname', $lastname);
//                         $stmt->bindParam(':pass', $pass_hash);
//                         $stmt->bindParam(':email', $email);
//                         $stmt->bindParam(':salt', $salt);
//                         $stmt->execute();
//                         $successMsg = array('success' => "Record inserted Successfully.");
//                         echo json_encode($successMsg);
//                         exit();
//                     } catch (PDOException $e) {
//                         $msg = $e->getMessage();
//                         var_dump($msg);
//                         $response = array(
//                             "error" => "Connection failed",
//                             "message" => $msg
//                             //.$e->getMessage()
//                             // "pass1" => $pass,
//                             // "pass2" => $pass2

//                         );
//                         echo json_encode($response);
//                         exit();
//                     }
//                     //adding to database end
//                     // $response = array('success' => 'OTP Match.');
//                     // echo json_encode($response);
//                     // exit();
//                 } else {
//                     $response = array('error' => 'OTP Mismatch.');
//                     echo json_encode($response);
//                     exit();
//                 }
//             }



//         }
//     }
// }
?>