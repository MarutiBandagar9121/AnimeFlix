<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require "vendor/phpmailer/phpmailer/src/PHPMailer.php";
require "vendor/phpmailer/phpmailer/src/Exception.php";
require "vendor/phpmailer/phpmailer/src/SMTP.php";
use PHPMailer\PHPMailer\PHPMailer;


require __DIR__ . "/vendor/autoload.php";
Dotenv\Dotenv::createUnsafeImmutable(__DIR__ . '/')->load();

$firstname;
$lastname;
$username;
$pass;
$pass2;
$email;
$salt;



if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $json_input = file_get_contents("php://input");
    $input = json_decode($json_input, true);
    if ($input != null) {
        $firstname = $input['fname'];
        $lastname = $input['lname'];
        $username = $input['uname'];
        $pass = $input['encrypass'];
        $pass2 = $input['encrypass2'];
        $email = $input['email'];
        $salt = $input['salt'];
        if (strlen($username) > 20) {
            $response = array("error" => "Username Length Exceeds.(Max 20 char)");
            echo json_encode($response);
            exit();

        }
        $pass = trim($pass);
        $pass2 = trim($pass2);
        if (strcmp($pass, $pass2) != 0) {

            $response = array(
                "error" => "Passwords Dont Match!"
            );
            echo json_encode($response);
            exit();

        }

        $host = $_ENV['DB_HOST'];
        $port = $_ENV['DB_PORT'];
        $user = $_ENV['DB_USER'];
        $dbname = $_ENV['DB_NAME'];
        $password = $_ENV['DB_PASSWORD'];

        

        try {

            $pdo = new PDO("pgsql:host=$host port=$port dbname=$dbname user=$user password=$password");


            $query = "select username,email from user_data";
            $results = $pdo->query($query);
            foreach ($results as $result) {
                //print_r($result);
                $existingUname = $result['username'];
                $existingEmail = $result['email'];
                if ($existingUname == $username) {
                    $response = array('error' => 'Username Already Taken.');
                    echo json_encode($response);
                    exit();
                }
                if ($existingEmail == $email) {
                    $response = array('error' => 'Email Already Used.');
                    echo json_encode($response);
                    exit();
                }

            }



        } catch (PDOException $e) {
            $msg = $e->getMessage();
            var_dump($msg);
            $response = array(
                "error" => "Connection failed!",
                "message" => $msg

            );
            echo json_encode($response);
            exit();

        }



        $otp = rand(100000, 999999);
        $subject = "Signup For AFLIX!!";
        $message = 'Hii' . $firstname . 'Welcome to AFLIX. A one stop solution to all your Anime needs.One Time password is ' . $otp . 'Please proceed with your signup.';
        // mail($email, $subject, $message);

        $mail = new PHPMailer(true);
        $mail->isSMTP();
        $mail->SMTPAuth = true;

        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
        $mail->CharSet = 'UTF-8';

        $mail->Username = "maruti.bandagar9121@gmail.com";
        $mail->Password = "tuxrxqgekvceptmb";

        $mail->setFrom("maruti.bandagar9121@gmail.com");
        $mail->addAddress($email);

        $mail->Subject = $subject;
        $mail->Body = $message;
        try {
            $mail->send();
        } catch (Exception $e) {
            $response = array('error' => $mail->ErrorInfo);
            echo json_encode($response);
            exit();
        }



        try {

            $pdo = new PDO("pgsql:host=$host port=$port dbname=$dbname user=$user password=$password");
            $query = "INSERT INTO user_data_temp (username, firstname, lastname, password_hash, email,salt,otp) VALUES (:uname, :fname, :lname, :pass ,:email,:salt,:otp)";
            $stmt = $pdo->prepare($query);
            $stmt->bindParam(':uname', $username);
            $stmt->bindParam(':fname', $firstname);
            $stmt->bindParam(':lname', $lastname);
            $stmt->bindParam(':pass', $pass);
            $stmt->bindParam(':email', $email);
            $stmt->bindParam(':salt', $salt);
            $stmt->bindParam(':otp', $otp);
            $stmt->execute();
            //setcookie("username", $username, time() + 300, "/","localhost",false,false);
            $successMsg = array('success' => "Record inserted Successfully.");
            echo json_encode($successMsg);
            exit();
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