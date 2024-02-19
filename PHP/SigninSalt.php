<?php


header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
require __DIR__ . "/vendor/autoload.php";
Dotenv\Dotenv::createUnsafeImmutable(__DIR__ . '/')->load();

if($_SERVER['REQUEST_METHOD']=='POST'){
    $json_input=file_get_contents("php://input");
    $input=json_decode($json_input,true);
    if($input!=null){
        $username=$input['uname'];
        
        //echo $username;
        $username=$input['uname'];
        $pass=$input['hashpass'];
        $host = $_ENV['DB_HOST'];
        $port = $_ENV['DB_PORT'];
        $user = $_ENV['DB_USER'];
        $dbname = $_ENV['DB_NAME'];
        $password = $_ENV['DB_PASSWORD'];
        try{
            $pdo=new PDO("pgsql:host=$host port=$port user=$user dbname=$dbname password=$password");
            $query="select username,salt from user_data";
            $results=$pdo->query($query);
            foreach($results as $result){
                //print_r($result);
                $existingUsername=$result['username'];
                $dbsalt=$result['salt'];
                
                if($existingUsername==$username){
                    //echo"successfull login";
                    
                    $msg=array('success'=>'User Found!','salt'=>$dbsalt);
                    echo json_encode($msg);
                    exit();
                }
                
            }
                $msg=array('error'=>'Invalid Credentials!');
                echo json_encode($msg);
                //echo"failed login";
                exit();

        }catch (PDOException $e) {
            $msg=array('error'=>'Connection Failed');
            echo $msg . $e->getMessage();
        }
        
    }
    else{
        $err=array('error'=>'Invalid credentials');
        echo json_encode($err);

    }

}


?>