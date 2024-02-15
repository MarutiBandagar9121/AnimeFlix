<?php


header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if($_SERVER['REQUEST_METHOD']=='POST'){
    $json_input=file_get_contents("php://input");
    $input=json_decode($json_input,true);
    if($input!=null){
        $username=$input['uname'];
        $pass=$input['hashpass'];
        //echo $username;
        $host = "localhost";
        $port = "5432";
        $user = "postgres";
        $dbname = "ottwebapp";
        $password = "maruti9121";
        try{
            $pdo=new PDO("pgsql:host=$host port=$port user=$user dbname=$dbname password=$password");
            $query="select username,password_hash,salt from user_data";
            $results=$pdo->query($query);
            foreach($results as $result){
                //print_r($result);
                $existingUsername=$result['username'];
                //$dbsalt=$result['salt'];
                $existingPassword=$result['password_hash'];
                if($existingUsername==$username && $existingPassword==$pass){
                    
                    
                    $msg=array('success'=>'Success Login!');
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