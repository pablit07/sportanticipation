<?php
header('Content-Type: application/json');
global $mysqli;
include_once('../../models/db-settings.php');

global $uid;
$testid = 1;


$linklist = array();
$link = array();
$link1 = array();
$link2 = array();


//GET TEST INFO

$qr = mysqli_query($mysqli, "SELECT * FROM `st_tests` WHERE `test_id` = '$testid' LIMIT 1 ") or die(mysqli_error());


while ($res = $qr->fetch_assoc()) {

    $link['test_id'] = $res['test_id'];
    $link['test_title'] = $res['test_title'];
    $link['test_description'] = $res['test_description'];
    $link['test_team'] = $res['test_team'];
    $link['test_focus'] = $res['test_focus'];
    $link['test_active'] = $res['test_author'];
    $link['test_created'] = $res['test_created'];
    $link['test_question_count'] = $res['test_question_count'];
    $link['test_question_order'] = $res['test_question_order'];
    array_push($linklist, $link);
}


//GET ANSWERS

$qan = mysqli_query($mysqli, "SELECT * FROM `st_answers` WHERE `answer_testid` = '$testid' ") or die(mysqli_error());


while ($res1 = $qan->fetch_assoc()) {

    if (!empty($link1['answer_answer'])) {
        $link1['answer_answer'] = $link1['answer_answer'] . ',' . $res1['answer_answer'];
    } else {
        $link1['answer_answer'] = $res1['answer_answer'];
    }

}
array_push($linklist, $link1);


//GET QUESTIONS


$qa = mysqli_query($mysqli, "SELECT * FROM `st_questions`  ") or die(mysqli_error());

while ($res2 = $qa->fetch_assoc()) {


    $link2['question_id'] = $res2['question_id'];
    $link2['question_question'] = $res2['question_question'];
    $link2['question_answer'] = $res2['question_answer'];
    $link2['question_video'] = $res2['question_video'];
    $link2['question_weight'] = $res2['question_weight'];
    $link2['question_occ'] = $res2['question_occ'];
    $link2['question_test_correct'] = $res2['question_correct'];
    $link2['question_battingside'] = $res2['question_battingside'];
    $link2['question_alt_video'] = $res2['question_alt_video'];


    array_push($linklist, $link2);


}


//print_R($linklist);
echo json_encode($linklist);
//WRITE TO RESULTS.JSON
$fp = fopen('results.json', 'w');
fwrite($fp, json_encode($linklist));
fclose($fp);

?>