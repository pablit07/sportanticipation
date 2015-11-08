<?php

require_once("../../models/db-settings.php");

global $mysqli;

function clean($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}


$test_id =  clean($_POST["test_id"]);
$total_answered = clean($_POST["total_answered"]);
$test_created = clean($_POST["test_created"]); 
$correct =   clean($_POST["correct"]);
$pid = clean( $_POST["pid"]);  
$test_team =   clean($_POST["test_team"]);
$test_title =   clean($_POST["test_title"]);
$sdate =  clean($_POST["sdate"]);




$sql = "INSERT INTO st_test_summaries ( `ts_test_id`, `ts_total_answered`,`ts_total_correct`, `ts_user_id`,`ts_started`,`ts_team`,`ts_title`,`ts_date`) VALUES ('$test_id','$total_answered','$correct','$pid','$test_created','$test_team','$test_title','$sdate')";

if(mysqli_query($mysqli, $sql)){$test_id=$test_created=$correct=$pid=$test_created=$test_team=$test_title=$sdate='';}


/*

$sql = "INSERT INTO st_test_summaries ( `ts_test_id`, `ts_total_correct`,`ts_user_id`, `ts_started`,`ts_team`,`ts_title`,`ts_session_id`)VALUES('$test_id','$test_created','$correct','$pid','$test_created','$test_team','$test_title','$sdate')";



*/


?>



