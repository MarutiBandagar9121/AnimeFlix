<?php
// session_set_cookie_params([
//     'secure' => false,  // For local development without HTTPS
//     'domain' => null,   // Allow the session cookie on any subdomain
// ]);
// session_start();
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

require "vendor/phpmailer/phpmailer/src/PHPMailer.php";
require "vendor/phpmailer/phpmailer/src/Exception.php";
require "vendor/phpmailer/phpmailer/src/SMTP.php";
use PHPMailer\PHPMailer\PHPMailer;

// use PHPMailer\PHPMailer\Exception;
// use PHPMailer\PHPMailer\SMTP;





// $data = array(
//     'name' => 'John Doe',
//     'age' => 25,
//     'city' => 'Example City'
// );
// $jsonData = json_encode($data);
// header('Content-Type: application/json');
// echo $jsonData;
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

        //session varibale
        // $_SESSION['username'] = $username;
        // $_SESSION['firstname'] = $firstname;
        // $_SESSION['lastname'] = $lastname;
        // $_SESSION['email'] = $email;
        // $_SESSION['password'] = $pass;
        // $_SESSION['salt'] = $salt;

        // // Check if session variables are set
        // if (isset($_SESSION['username'], $_SESSION['firstname'], $_SESSION['lastname'], $_SESSION['email'], $_SESSION['password'], $_SESSION['salt'])) {
        //     $response = array("msg" => "Session variables are set and accessible.");
        //     echo json_encode($response);
        //     //echo "Session variables are set and accessible.";
        // } else {
        //     $response = array("msg" => "Some or all of the session variables are not set.");
        //     echo json_encode($response);
        //     //echo "Some or all of the session variables are not set.";
        // }



        if (strlen($username) > 20) {
            $response = array("error" => "Username Length Exceeds.(Max 20 char)");
            echo json_encode($response);
            exit();

        }
        // if(strlen($pass)<6){
        //     $response=array("error"=>"Password Length Short.(Min 6 char)");
        //     echo json_encode($response);
        //     exit();

        // }
        // if(strlen($pass)>20){
        //     $response=array("error"=>"Passwords Length Exceeds.(Max 20 char)");
        //     echo json_encode($response);
        //     exit();

        // }
        $pass = trim($pass);
        $pass2 = trim($pass2);
        if (strcmp($pass, $pass2) != 0) {

            $response = array(
                "error" => "Passwords Dont Match!"
                // "pass1" => $pass,
                // "pass2" => $pass2

            );
            echo json_encode($response);
            exit();

        }
        // $output=array(
        //     "name"=>$firstname,
        //     'email'=>$email

        // );
        // $outputdata=json_encode($output);
        // echo $outputdata;




        $host = "localhost";
        $port = "5432";
        $user = "postgres";
        $dbname = "ottwebapp";
        $password = "maruti9121";

        // $con=pg_connect("host=$host port=$port user=$user dbname=$dbname password=$password");
        // if($con==false){
        //     echo "connection failed";
        // }

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
                "error" => "Connection failed",
                "message" => $msg
                //.$e->getMessage()
                // "pass1" => $pass,
                // "pass2" => $pass2

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
        $mail->CharSet='UTF-8';

        $mail->Username = "maruti.bandagar9121@gmail.com";
        $mail->Password = "tuxrxqgekvceptmb";

        $mail->setFrom("maruti.bandagar9121@gmail.com");
        $mail->addAddress($email);

        $mail->Subject = $subject;
        $mail->Body = $message;
        try {
            $mail->send();
        } catch (Exception $e) {
            $response = array('error' =>$mail->ErrorInfo);
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
                //.$e->getMessage()
                // "pass1" => $pass,
                // "pass2" => $pass2

            );
            echo json_encode($response);
            exit();
        }






    }

}
?>