<?php 
ob_start();

require_once("models/config.php");
if (!securePage($_SERVER['PHP_SELF'])){die();}
require_once('models/db-settings.php');

//---INSERT IN ARRAY
function insert_in_array_pos($array, $pos, $value)
{
$result = array_merge(array_slice($array, 0 , $pos), array($value), array_slice($array,  $pos));
return $result;
}




function is_online()
{
    return (checkdnsrr('google.com', 'ANY') && checkdnsrr('yahoo.com', 'ANY') && checkdnsrr('microsoft.com', 'ANY'));
}









//--------------PRE TEST
function Pretest(){


global $qcount;
global $uid;


  
//chk onlne
    
if (!is_online()) {    
echo ': APPLICATION OFFLINE';
}
    

    
//TestEnd();
    
$loggedInUser = $_SESSION["userCakeUser"]; 
 $_SESSION['mode']='train';


$uid = $loggedInUser->user_id;    
$_SESSION['uid'] = $uid;         

GetUserInfo();
GetMyBattingside();
ChkStarted();  
ChkConnect();

if (!isset($_SESSION['curquest'])){$_SESSION['curquest'] =1;}

echo '<a href="op/views/index.html" class="btn btn-primary"> START</a>';

}








function GetUserInfo(){
global $uid;
global $battingside; 
global $mysqli;

$sql = "SELECT * FROM st_userinfo WHERE ui_uid='$uid' LIMIT 1 " ;
$result = mysqli_query($mysqli, $sql);

if (mysqli_num_rows($result) > 0) {

// output data of each row
while($row = mysqli_fetch_object($result)) {

$battingside = $row->ui_battingside;

GetBattingSide($battingside);


}}}











//---------------
function ChkStarted(){

global $loggedInUser, $testid,$battingside,$crntest,$uid,$question_alt_video,$videourl,$question_alt_video ;


     /*--PHP 5.5--*/if (session_status() == PHP_SESSION_NONE) {
            if (version_compare(PHP_VERSION, '5.4.0') >= 0) {
                if (session_status()==PHP_SESSION_NONE) { session_start(); }
            } else {
                if(session_id()=='') { session_start(); }
            }}

if (isset($_SESSION['started'])){

echo 'Testing Session Already Started<br/>'; 
$curquest = $_SESSION['curquest'];  
$crntest = $_SESSION['crntest']; 
$battingside = $_SESSION['battingside'];  
$mybattingside = $_SESSION['mybattingside'];  

return;
}    

if (!isset($_SESSION['started'])){

echo 'Starting a New Testing Session<br/>';       
$testid = 1;
$_SESSION['testid'] = $testid ;
$_SESSION['totalanswered']=0;  
$_SESSION['crntest'] = 1; 

$_SESSION['curquest'] = 1  ;  
$_SESSION['started'] = true;
$_SESSION['question_alt_video'] = $question_alt_video;
$_SESSION['videourl'] = $videourl;
$_SESSION['correctcount'] = 0;

return;
}
}











//-----------------
function TestEnd(){
 echo'OK';

header('Location:test_results.php');
//ResetAll();
}





function ResetAll(){
unset($_SESSION['started'], $_SESSION['battingside'], $_SESSION['curquest'], $_SESSION['mybattingside'], $_SESSION['curtest'], $_SESSION['qcount'], $_SESSION['questionid'], $_SESSION['curquestarray'], $_SESSION['curquest'],$_SESSION['totalanswered'],$_SESSION['totalanswered'],$_SESSION["question_alt_video"] );

$_SESSION['saved']=0;
}











function LoadATest(){
    
global $mysqli;

$crntest = $_SESSION['crntest'];  
//$curquest = $_SESSION['curquest']; 

$qids = array();   
$question_array = array();      
$temparray = array();      

   

$sql = "SELECT * FROM st_tests INNER JOIN ST_questions ON st_tests.test_id = st_questions.question_test  WHERE test_id ='$crntest'   LIMIT 1" ;
//get query
if($result = mysqli_query($mysqli, $sql)){
//if result not empty

 echo $crntest;
 $uid = $_SESSION['uid']; 

$curtest = $_SESSION['crntest']; 
$pos=0;    

$temparray = array();  
$question_array=array();  

while($row = mysqli_fetch_object($result)) {

echo $_SESSION['qcount']= $row->test_question_count; 


echo $question_alt_video =$row->question_alt_video;

$question =  $row->question_question;
$_SESSION['question'] = $question;   
$answer = $row->question_answer;

$videourl = $row->question_video;
$_SESSION['videourl'] = $videourl;
    
    $_SESSION["altvideourl"] = $row->question_alt_video;
    $_SESSION["question_alt_video"] = $row->question_alt_video;
    
$weight = $row->question_weight;
$occ = $row->question_occ;
$test = $row->question_test;
$quest_num = $row->question_test_num;
$quest_correct = $row->question_correct;
$_SESSION['question_correct'] =$quest_correct;
$battingsidenum = $row->question_battingside;    
$quest_correct = $row->question_correct; 
$question_order = $row->test_question_order;   
}

    

echo 'Batting Side: '. $_SESSION['mybattingside'].'<br/>'; 

$question =    $_SESSION['question'];
$videourl =    $_SESSION['videourl'];

ShowAnswers();

echo' <h2>'.$question.'</h2> ';   

echo'<div class="responsive">';


echo'
<video width="600" height="400" id="video" style="max-width:100%; position:absolute; top:0px;left:0px;" autoplay >
<source src="'.$videourl.'" type="video/mp4">
</video></div><div id="answers" style="visibility:visible;"></div>';  



if(isset($_SESSION['curquestarray'] )  ){   
$question_array = $_SESSION['curquestarray'];
if(empty($question_array)){TestEnd();}
$_SESSION['questionid']  = $question_array[0]; 
$_SESSION['curquest']  = $question_array[0];     
$_SESSION['curquestarray'] =   substr( $_SESSION['curquestarray'], 1 );

}else if(!isset($_SESSION['curquestarray'] )  ){   

$question_array = ($question_order);
$_SESSION['questionid']  = $question_array[0]; 
$_SESSION['curquest']  = $question_array[0]; 
$_SESSION['curquestarray'] =   substr( $question_array, 1 );


}



 echo"     
    <script>
$(function(){

var video = $('video')[0];
var answers = $('answers')[0];

video.addEventListener('playing', function(){
$('PLAY').fadeOut();


})
video.addEventListener('pause', function(){
$('STOP').fadeOut();
video.style.visibility='hidden';    


})

})
</script>  ";  



}



} 





//-----------------------------
function ShowAnswers(){
global
$mysqli,
$uid,
$tid,
$quest_correct , $answerarray,
$question,
$answer,
$videourl,
$title,
$description,
$team,
$focus,
$active,
$created,
$occ,
$quest_correct,
$battingsidenum,
$question_alt_video;
$questionid = $_SESSION['questionid'];
    $qcorrect =$_SESSION['question_correct'] ;
  $_SESSION['realanswer'] = array_values(mysqli_fetch_array($mysqli->query("SELECT answer_answer FROM st_answers WHERE answer_id='$qcorrect' ")))[0];  
    
    
    
    
    
    
$sql = "SELECT * FROM st_answers" ;
$result = mysqli_query($mysqli, $sql);

if (mysqli_num_rows($result) > 0) { 

echo'<div id="answers" style="visibility:visible;">';   
while($row = mysqli_fetch_object($result)) {

echo'<div class="col-md-2">';

echo '
<div id="button" >
<form action="answer_question.php?id='.$row->answer_id.'" method="post"> 
<input type="hidden" value="'.$row->answer_id.'" name="answered"> 
<input type="hidden" value="'.$_SESSION['question_correct'].'" name="correctanswer">  
<input type="hidden" value="'.$videourl.'" name="video">  
<input type="hidden" value="'.$title.'" name="title">  
<input type="hidden" value="'.$occ.'" name="occlusion">  
<input type="hidden" value="'.$uid.'" name="userid">  
<input type="hidden" value="'.$tid.'" name="testid"> 
<input type="hidden" value="'.$questionid.'" name="questionid"> 
<input type="hidden" value="'.$battingsidenum.'" name="videobattingside"> 
<input type="hidden" value="'.$question_alt_video.'" name="question_alt_video"> 
<input type="hidden" value="'.$row->answer_answer.'" name="txtanswer"> 

<input style="font-size:11px;" class="btn btn-primary raised round" type="submit" value="'. $row->answer_answer.'"/>
</form></div>';

echo'</div>';

}
echo'</div>';  

echo"

";   

}    
}





function SaveResultSummary($stestid, $ta, $tc, $tuid){

global $mysqli;

 $sql = "INSERT INTO st_test_summaries (ts_test_id, ts_total_answered, ts_total_correct, ts_user_id)
 
VALUES ('$stestid', '$ta', '$tc', '$tuid')";

if ($mysqli->query($sql) === TRUE) {   

echo 'Session Saved.';

}}










//---------------
function ChkConnect(){

if (mysqli_connect_errno()) {
printf("Connect failed: %s\n", mysqli_connect_error());

}
}



//---------- BatSelectList
function BatSelectList(){

echo'<option value="1">Right</option>';
echo'<option value="2">Left</option>';
echo'<option value="3">Switch</option>';

}

//------------------------------
function GetBattingSide($battingsidenum){
global $mybattingside;

if ($battingsidenum == 0) {$mybattingside='Right'; $_SESSION["mybattingside"]=$mybattingside ;}
if ($battingsidenum == 1) {$mybattingside='Left'; $_SESSION["mybattingside"]=$mybattingside ;}   

}








//-------------------------
function GetMyBattingside(){
global $uid;
global $mysqli;

$sql = "SELECT batting_side FROM st_users WHERE id='$uid' LIMIT 1 " ;
$result = mysqli_query($mysqli, $sql);

if (mysqli_num_rows($result) > 0) {

// output data of each row
while($row = mysqli_fetch_object($result)) {

$battingside = $row->batting_side;   


if ($battingside == 0) {$mybattingside='Right'; $_SESSION['mybattingside'] = $mybattingside; }
if ($battingside == 1) {$mybattingside='Left'; $_SESSION['mybattingside'] = $mybattingside; }   

$_SESSION['battingside']=$battingside;

}}}










function KillSesh(){

if (ini_get("session.use_cookies")) {
$params = session_get_cookie_params();
setcookie(session_name(), '', time() - 42000,
$params["path"], $params["domain"],
$params["secure"], $params["httponly"]
);
}

}





?>

