<?php
header('Content-Type: application/json');
global $mysqli;
include_once('models/db-settings.php');

global $uid ;
$testid=1;


$linklist=array();
$link=array();
$link1=array();
$link2=array();
$questions=array();




//GET TEST INFO

$qr=mysqli_query($mysqli, "SELECT * FROM `st_tests` WHERE `test_id` = '$testid' ") or die(mysqli_error());



while($res = $qr->fetch_assoc()){

$link1['test_id']=$res['test_id'];
$link1['test_title']=$res['test_title'];
$link1['test_description']=$res['test_description'];  
$link1['test_team']=$res['test_team'];  
$link1['test_focus']=$res['test_focus'];  
$link1['test_active']=$res['test_author'];  
$link1['test_created']=$res['test_created'];   
$link1['test_question_count']=$res['test_question_count'];   
$link1['test_question_order']=$res['test_question_order'];     

} 
array_push($linklist,$link1);  

//GET ANSWERS


$qan=mysqli_query($mysqli, "SELECT * FROM `st_answers` WHERE `answer_testid` = '$testid' ") or die(mysqli_error());



while($res = $qan->fetch_assoc()){

$link2['answer_answer']=$res['answer_answer'];
array_push($linklist,$link2);  

} 






//GET QUESTIONS
array_push($linklist,$link1);   

$qa=mysqli_query($mysqli, "SELECT * FROM `st_questions`  ") or die(mysqli_error());

while($res = $qa->fetch_assoc()){


$link['question_id']=$res['question_id'];   
$link['question_question']=$res['question_question'];  
$link['question_answer']=$res['question_answer'];      
$link['question_video']=$res['question_video'];      
$link['question_weight']=$res['question_weight'];   
$link['question_occ']=$res['question_occ'];   
$link['question_test_correct']=$res['question_correct'];    
$link['question_battingside']=$res['question_battingside'];   
$link['question_alt_video']=$res['question_alt_video'];  




array_push($linklist,$link);    


}  





//print_R($linklist);
echo json_encode($linklist);
//WRITE TO RESULTS.JSON
$fp = fopen('results.json', 'w');
fwrite($fp, json_encode($linklist));
fclose($fp);

?>