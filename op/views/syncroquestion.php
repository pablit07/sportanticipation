<?php

require_once("../../models/db-settings.php");

global $mysqli;

function clean($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

$testsessionid = clean($_POST["sc"]); 
$pid = clean( $_POST["pid"]);  
$sdate =  clean($_POST["sdate"]);
$test_id =  clean($_POST["test_id"]);
$test_created = clean($_POST["test_created"]); 
$test_description = clean($_POST["test_description"]);
$test_focus = clean($_POST["test_focus"]);
$test_question_count =   clean($_POST["test_question_count"]);  
$test_question_order =   clean($_POST["test_question_order"]);  
$test_team =   clean($_POST["test_team"]);
$test_title =   clean($_POST["test_title"]);
$correct =   clean($_POST["correct"]);
$test_question_id =  clean( $_POST["test_question_id"]);
$test_question_answered =  clean( $_POST["test_question_answered"]);
$test_question_answer_correct =   clean($_POST["test_question_answer_correct"]);
$is_test_mode = clean($_POST["is_test_mode"]);


$sql = "INSERT INTO st_question_summaries (`ts_test_id`,`ts_total_answered`,`ts_total_correct`,`ts_user_id`,`ts_started`,`ts_team`,`ts_title`,`ts_session_id`,`test_question_id`,`st_question_answered`,`test_question_answer_correct`,`is_test_mode`)VALUES ('$test_id', '$test_question_count', '$correct', '$pid', '$sdate', '$test_team', '$test_title', '$testsessionid','$test_question_id','$test_question_answered ', '$test_question_answer_correct', '$is_test_mode')";

if(mysqli_query($mysqli, $sql)){}


$test_id=$test_question_count=$correct=$pid=$test_created=$test_team=$test_title=$testsessionid=$test_question_id=$test_question_answered =$test_question_answer_correct='';


?>
