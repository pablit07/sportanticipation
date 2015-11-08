<?php


require_once("../../models/db-settings.php");



//NO EDIT AFTER

//if(isset($_POST["sc"])){

$testsessionid =    $_POST["sc"]; 

$pid =  $_POST["pid"];  
$sdate =  $_POST["sdate"];
$test_id =  $_POST["test_id"];
$test_created = $_POST["test_created"]; 
$test_description = $_POST["test_description"];
$test_focus = $_POST["test_focus"];
$test_question_count =   $_POST["test_question_count"];  
$test_question_order =   $_POST["test_question_order"];  
$test_team =   $_POST["test_team"];
$test_title =   $_POST["test_title"];
$correct =   $_POST["correct"];
$incorrect =   $_POST["incorrect"];



if (!$mysqli) {
    die("Connection failed: " . mysqli_connect_error());
}

$sql = "INSERT INTO st_test_summaries (`ts_test_id`,`ts_total_answered`, `ts_total_correct`,`ts_user_id`,`ts_started`,`ts_team`,`ts_title`,`ts_session_id` )
VALUES ('$test_id', '$test_question_count', '$correct', '$pid', '$test_created', '$test_team', '$test_title', '$testsessionid')";

if (mysqli_query($mysqli, $sql)) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($mysqli);
}//}

//mysqli_close($mysqli);

//header ('Location:../../account.php');



?>
