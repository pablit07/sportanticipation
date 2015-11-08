<?php ob_start();
require_once("db-settings.php");



//main class for SportsTest
class MainClass {



//----------CONST
public function __construct(){

 

}//const




public function ChkConnect(){
    global $mysqli;  
if (mysqli_connect_errno()) {
printf("Connect failed: %s\n", mysqli_connect_error());
//exit();
}
}

    
    
    
    
    
public function LoadATest(){

global $mysqli;   

ChkConnect();

$sql = "SELECT * FROM st_tests" ;
$result = mysqli_query($mysqli, $sql);

if (mysqli_num_rows($result) > 0) {

$row_cnt = mysqli_num_rows($result);


// output data of each row
while($row = mysqli_fetch_object($result)) {

echo $title = $row->test_title;
$description =  $row->test_description;
$team =  $row->test_team;
$focus =  $row->test_focus;
$active =  $row->test_active;
$author =  $row->test_author;
$created =  $row->test_created;
    


}
} else {
echo "0 results";
}

//mysqli_close($mysqli);   


}    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    





//----------MAIN FUNCTIONS--------->>    






//---------- BatSelectList
public function BatSelectList(){

echo'<option value="1">Right</option>';
echo'<option value="2">Left</option>';
echo'<option value="3">Switch</option>';

}



//---------- UserSelectList

public function   UserSelectList(){
global $mysqli;

$sql = " SELECT * FROM st_users ";

if(!$result = $mysqli->query($sql)){
die('There was an error running the query [' . $mysqli->error . ']');
}

echo'<select class="form-control" type="select" name="pid">';

while( $row = mysqli_fetch_object($result )){

echo'<option value="'.$row->id.'">'. $row->display_name .'</option>';

}echo'</select>';
}//




//---------- TEAMS--------->>


//---------- TeamSelectList

public function   TeamSelectList(){
global $mysqli;

$sql = " SELECT * FROM st_teams ";

if(!$result = $mysqli->query($sql)){
die('There was an error running the query [' . $mysqli->error . ']');
}

while( $row = mysqli_fetch_object($result )){

echo'<option value="'.$row->tm_id.'">'.$row->tm_teamname.'</option>';

}
}

//----------CREATE TEAM
public function CreateTeam($teamname,$active,$tmaccount){ 
GLOBAL $mysqli;
GLOBAL $db_table_prefix;    

$stmt = $mysqli->prepare("INSERT INTO st_teams (tm_teamname,tm_active,tm_account)
VALUES (?,?,?) " );

$stmt->bind_param("sis", $teamname, $active, $tmaccount);
$stmt->execute();
$inserted_id = $mysqli->insert_id;
$stmt->close();    

}//



//----------DELETE TEAM

public function DeleteTeam ($delid){
GLOBAL $mysqli;    

$stmt = $mysqli->query ("DELETE FROM st_teams WHERE tm_id='$delid'");


}//


//----------EDIT TEAM

public function EditTeam($editid, $teamname, $status, $accountid){

GLOBAL $mysqli;

$stmt = $mysqli->query("UPDATE st_teams SET tm_teamname='$teamname', tm_active='$active', tm_account='$accountid' WHERE tm_id ='$editid'");
$inserted_id = $mysqli->insert_id;


}//  



//----------MASTERTEAMLIST

public function MasterTeamList(){
GLOBAL $mysqli;

$sql = " SELECT * FROM st_teams ";

if(!$result = $mysqli->query($sql)){
die('There was an error running the query [' . $mysqli->error . ']');
}

while( $row = mysqli_fetch_object($result )){

echo '<tr> <td> Team Name: '.$row->tm_teamname.'</td><td> Status: '; 

if ($row->tm_active == 0){
echo 'Inactive';
}else{echo 'Active';}

echo '</td><td> Account ID '.$row-> tm_account .'</td>
<td><form role="form" action="edit_team.php" method="post" id="" class="" style="">
<input type="hidden" name="editid" value="'.$row->tm_id.'"/>
<input type="submit"  value="EDIT"></form></td>

<td><form role="" action="delete_team.php" method="post" id="" class="" style="">
<input type="hidden" name="delid" value="'.$row->tm_id.'"/>
<input type="submit" value="DELETE"></form></td>
</tr>' ;

}
} 

public function TeamFromID($tm){

global $mysqli;

$sql = " SELECT * FROM st_teams WHERE tm_id ='$tm' LIMIT 1 ";

if(!$result = $mysqli->query($sql)){
die('There was an error running the query [' . $mysqli->error . ']');
}

while( $row = mysqli_fetch_object($result )){

echo''.$row->tm_teamname.'';

}  
}    

    
    
    
    
    
    
    
    
    

//----------PLAYERS--------->>


//-----------PlayerListFiltered

public function PlayerListFiltered (){
GLOBAL $mysqli;

$sql = ("SELECT *
FROM st_players, st_teams  
WHERE st_players.pl_team = st_teams.tm_id");    
if(!$result = $mysqli->query($sql)){
die('There was an error running the query [' . $mysqli->error . ']');
}   

echo'<table class="table">';

while( $row = mysqli_fetch_object($result )){

$batside = $row->pl_batside; 

if($batside == 1 ){$bats='Right';}
if($batside == 2 ){$bats='Left';}
if($batside == 3 ){$bats='Switch';}

echo '

<tr>
<td>

<a class="list-group-item" href="#"><span>'.$row->pl_firstname.' '.$row->pl_lastname.'<br>Team: '.$row->tm_teamname.'<br> Batting Side: '.$bats.'</a></span>


<div class="pull-right" style="position:relative; top:-80px; margin:5px; padding:5px;" >
<form role="form" action="edit_player.php" method="post" id="edit" class="form" style="">
<input type="hidden" name="editid" value="'.$row->pl_id.'">
<input type="submit" class="btn btn-success"  value="EDIT">
</form>
</div>


<div class="pull-right" style="position:relative; top:-80px; margin:5px; padding:5px;">

<form role="form" action="delete_player.php" method="post" id="del" class="form" style="">
<input type="hidden" name="delid" value="'.$row->pl_id.'"/>
<input type="submit" class="btn btn-danger" value="DELETE">
</form>
</div>

</td>
</tr>' ;

}echo'</table>';
}



//----------DELETE PLAYER

public function DeletePlayer ($delid){
GLOBAL $mysqli;    

$stmt = $mysqli->query ("DELETE FROM st_players WHERE pl_id='$delid'");

} 



//----------CREATE PLAYER

public function CreatePlayerProfile($firstname , $lastname , $dob, $batside, $team, $pid){
GLOBAL $mysqli;
GLOBAL $db_table_prefix;    

$stmt = $mysqli->prepare("INSERT INTO st_players (pl_firstname,pl_lastname,pl_dob,pl_batside,pl_team,pl_user)
VALUES (?,?,?,?,?,?) " );

$stmt->bind_param("sssiii", $firstname, $lastname, $dob, $batside,$team, $pid);
$stmt->execute();
$inserted_id = $mysqli->insert_id;
$stmt->close();    


} 



//----------EDIT PLAYER

public function EditPlayer($editid, $firstname, $lastname, $dob, $batside, $team, $user){
GLOBAL $mysqli;

$stmt = $mysqli->query("UPDATE st_players SET pl_firstname='$firstname', pl_lastname='$lastname', pl_dob='$dob', pl_batside='$batside', pl_team='$team', pl_user='$user' WHERE pl_id ='$editid'");
$inserted_id = $mysqli->insert_id;

}     





//----------EDIT TEST   

public function EditTest($questionset, $answerset, $feedbackset, $testtitle, $folderpath, $team, $timestodisplay, $displaymethod,$editid){
GLOBAL $mysqli;
$stmt = $mysqli->query("UPDATE st_quizzes SET qz_questionset='$questionset', qz_videofolder='$folderpath', qz_team='$team', qz_title='$testtitle', qz_answerset='$answerset', qz_feedbackset=' $feedbackset' qz_type='  $displaymethod' WHERE pl_id ='$editid'");
$inserted_id = $mysqli->insert_id;    



}    




//----------SHOW PLAYERS

public function ShowPlayers (){}      



    
    
    
    
    
    
    
    



//---------- COACHES--------->>


//----------DELETE COACH

public function DeleteCoach (){} 



//----------CREATE COACH

public function CreateCoach (){} 



//----------EDIT COACH

public function EditCoach (){}     



//----------SHOW COACH

public function ShowCoach (){} 




    
    
    
    
    
    
    
    



//----------TESTS---------->>   

public function  TrainingSessionSelect(){
GLOBAL $mysqli;
GLOBAL $team;    
GLOBAL $quiztitle;    


$sql = ("SELECT * FROM st_quizzes WHERE qz_team = $team "); 

if(!$result = $mysqli->query($sql)){
die('There was an error running the query [' . $mysqli->error . ']');
}   

while( $row = mysqli_fetch_object($result )){

$quiztitle = $row->qz_title;
echo ' 

<option value="'.$row->qz_id.'">'.$row->qz_title.'</option>

<input type="hidden" value="'.$quiztitle.'" name="quiztitle";
';

}
}    


//----------TESTLISTFILTERED  

public function   TestListFiltered(){
GLOBAL $mysqli;
GLOBAL $tm;

$sql = ("SELECT *
FROM st_quizzes");    
if(!$result = $mysqli->query($sql)){
die('There was an error running the query [' . $mysqli->error . ']');
}   

echo'<div class="container">
<div class="col-md-12"> ';

while( $row = mysqli_fetch_object($result )){

$team = $row->qz_team;
$videofolder = $row->qz_videofolder;
$questionset = $row->qz_questionset;
$answerset = $row->qz_answerset;
$feedbackset = $row->qz_feedbackset ;
$type=$row->qz_type;
$testtitle=$row->qz_title;
$timestodisplay=1;
$editid=$row->qz_id;

echo '


<div class="row">
<div class="well" style="min-height:300px">
<div class="col-md-4">

<h3> ' .$row->qz_title.' </h3>';



echo $this->TeamFromID($tm).'
<br> Video Folder: '. $row->qz_videofolder.'
<br>Question Set: '. $row->qz_questionset.'
<br> Answer Set: '. $row->qz_answerset .'
<br> Feedback Set:  '. $row->qz_feedbackset.'
<br> Quiz Type:  '. $this->ConvertQuizType ($row->qz_type).'


</div>


<div class="col-md-4">
<br><br>
<form role="form" action="preview_quiz.php" method="post" id="" class="" style="">

<input type="hidden" name="quizid" value="'.$editid.'"/>
<input type="hidden" name="team" value="'.$team.'"/>

<input type="submit" class="btn btn-warning"  value="PREVIEW"></form>



<form role="form" action="edit_test.php" method="post" id="" class="" style="">
<input type="hidden" name="folderpath" value="'.$videofolder.'"/>
<input type="hidden" name="questionset" value="'.$questionset.'"/>
<input type="hidden" name="answerset" value="'.$answerset.'"/>
<input type="hidden" name="feedbackset" value="'.$feedbackset.'"/>
<input type="hidden" name="displaymethod" value="'.$type.'"/>
<input type="hidden" name="team" value="'.$team.'"/>
<input type="hidden" name="testtitle" value="'.$testtitle.'"/>
<input type="hidden" name="editid" value="'.$row->qz_id.'"/>
<input type="hidden" name="timestodisplay" value="'.$timestodisplay.'"/>
<input type="hidden" name="editid" value="'.$editid.'"/>
<input type="submit" class="btn btn-success"  value="EDIT"></form>



<form role="" action="delete_quiz.php" method="post" id="" class="" style="">
<input type="hidden" name="delid" value="'.$row->qz_id.'"/>
<input type="submit" class="btn btn-danger" value="DELETE"></form>
</div>
</div>
</div>
</div>


' ;

}echo'</div></div>';

}  






//----------LoadTESTQuestions

public function LoadQuizQuestions($questionset){

GLOBAL $mysqli;

$sql= " SELECT * FROM st_questions WHERE qe_questionset = '$questionset'";

if(!$result = $mysqli->query($sql)){
die('There was an error running the query [' . $mysqli->error . ']');
}    

while( $row = mysqli_fetch_object($result)){

$question = $row->qe_question;
$videolink = $row->qe_videolink;
$answerset = $row->qe_answerset;
$correctanswer = $row->qe_correctanswer;

}
}   




//----------CreateAQUIZ

public function    CreateAQuiz($team, $quizid){

GLOBAL $mysqli;
GLOBAL $qcount;
GLOBAL $answer;
GLOBAL $correctanswer;
GLOBAL $team;
GLOBAL $quizid;

    if(!$quizid){
    
    $quizid = $_SESSION{'quizid'};
    }
    
$tries = 1;
    
$sql = " SELECT * FROM st_quizzes,
st_questionsets, st_answersets, st_questions, st_answers
WHERE st_quizzes.qz_team = '$team' AND st_quizzes.qz_id = '$quizid'
AND st_quizzes.qz_questionset = st_questionsets.qs_questionset 
AND st_quizzes.qz_answerset = st_answersets.as_answerset
AND st_questionsets.qs_question  = st_questions.qe_id
AND  st_answersets.as_answer = st_answers.an_id 
ORDER BY RAND() LIMIT 1
";


if(!$result = $mysqli->query($sql)){
die('There was an error running the query [' . $mysqli->error . ']');
}

$qcount = 1;

while( $row = mysqli_fetch_object($result)){

$rcount = mysqli_num_rows($result);    
$qztitle = $row->qz_title;
$questionset = $row->qz_questionset;
$answerset = $row->qz_answerset;
$videofolder = $row->qz_videofolder;
$feedbackset= $row->qz_feedbackset;
$qzteam= $row->qz_team ;
$question = $row->qe_question;
$correctanswer =  $row->qe_answer;
$quid=$row->qe_id;
$_SESSION{'quizid'}= $quizid;


echo 'Quiz: '.$qztitle.'<br>'. $question.'<br>  '.$quid;

    
$this->AnswerSet($answerset, $answer, $quizid);     
    
$_SESSION['videolink'] = $row->qe_videolink;
    
  echo" 
<hr>
<script>
$(function(){

    var video = $('#video')[0];
     var answers = $('#answers')[0];

    video.addEventListener('playing', function(){
           $('PLAY').fadeOut();
    })
     video.addEventListener('pause', function(){
           $('STOP').fadeOut();
       video.style.visibility='hidden';    
       answers.style.visibility='visible';     
    })

})
</script>";  
    
        echo'
        
<video width="800" height="600" id="video"  autoplay >
<source src="videos/'.$row->qe_videolink.'" type="video/mp4">
</video>




';
   


}
}   







//----------PreviewAQUIZ

public function    PreviewAQuiz($team, $quizid){

GLOBAL $mysqli;
GLOBAL $qcount;
GLOBAL $answer;
GLOBAL $correctanswer;
GLOBAL $team;
GLOBAL $quizid;

    if(!$quizid){
    
    $quizid = $_SESSION{'quizid'};
    }
    
$tries = 1;
    
$sql = " SELECT * FROM st_quizzes,
st_questionsets, st_answersets, st_questions, st_answers
WHERE st_quizzes.qz_team = '$team' AND st_quizzes.qz_id = '$quizid'
AND st_quizzes.qz_questionset = st_questionsets.qs_questionset 
AND st_quizzes.qz_answerset = st_answersets.as_answerset
AND st_questionsets.qs_question  = st_questions.qe_id
AND  st_answersets.as_answer = st_answers.an_id 
ORDER BY RAND() LIMIT 1
";


if(!$result = $mysqli->query($sql)){
die('There was an error running the query [' . $mysqli->error . ']');
}

$qcount = 1;

while( $row = mysqli_fetch_object($result)){

$rcount = mysqli_num_rows($result);    
$qztitle = $row->qz_title;
$questionset = $row->qz_questionset;
$answerset = $row->qz_answerset;
$videofolder = $row->qz_videofolder;
$feedbackset= $row->qz_feedbackset;
$qzteam= $row->qz_team ;
$question = $row->qe_question;
$correctanswer =  $row->qe_answer;
$quid=$row->qe_id;
$_SESSION{'quizid'}= $quizid;


echo 'Quiz: '.$qztitle.'<br>'. $question.'<br>  '.$quid;

    
$this->AnswerSet($answerset, $answer, $quizid);     
    
$_SESSION['videolink'] = $row->qe_videolink;
    
  echo" 
<hr>
<script>
$(function(){

    var video = $('#video')[0];
     var answers = $('#answers')[0];

    video.addEventListener('playing', function(){
           $('PLAY').fadeOut();
    })
     video.addEventListener('pause', function(){
           $('STOP').fadeOut();
       video.style.visibility='hidden';    
       answers.style.visibility='visible';     
    })

})
</script>";  
    
        echo'
        
<video width="800" height="600" id="video"  autoplay >
<source src="videos/'.$row->qe_videolink.'" type="video/mp4">
</video>




';
   


}
}


    
    
    
//----------TAKEATEST

public function    TakeATest($team, $quizid){

GLOBAL $mysqli;
GLOBAL $qcount;
GLOBAL $answer;
GLOBAL $correctanswer;
GLOBAL $team;
GLOBAL $quizid;

    if(!$quizid){
    
    $quizid = $_SESSION{'quizid'};
    }
    
$tries = 1;
    
$sql = " SELECT * FROM st_quizzes,
st_questionsets, st_answersets, st_questions, st_answers
WHERE st_quizzes.qz_team = '$team' AND st_quizzes.qz_id = '$quizid'
AND st_quizzes.qz_questionset = st_questionsets.qs_questionset 
AND st_quizzes.qz_answerset = st_answersets.as_answerset
AND st_questionsets.qs_question  = st_questions.qe_id
AND  st_answersets.as_answer = st_answers.an_id 
ORDER BY RAND() LIMIT 1
";


if(!$result = $mysqli->query($sql)){
die('There was an error running the query [' . $mysqli->error . ']');
}

$qcount = 1;

while( $row = mysqli_fetch_object($result)){

$rcount = mysqli_num_rows($result);    
$qztitle = $row->qz_title;
$questionset = $row->qz_questionset;
$answerset = $row->qz_answerset;
$videofolder = $row->qz_videofolder;
$feedbackset= $row->qz_feedbackset;
$qzteam= $row->qz_team ;
$question = $row->qe_question;
$correctanswer =  $row->qe_answer;
$quid=$row->qe_id;
$_SESSION{'quizid'}= $quizid;


echo 'Quiz: '.$qztitle.'<br>'. $question.'<br>  '.$quid;

    
$this->AnswerSet($answerset, $answer, $quizid);     
    
$_SESSION['videolink'] = $row->qe_videolink;
    
  echo" 
<hr>
<script>
$(function(){

    var video = $('#video')[0];
     var answers = $('#answers')[0];

    video.addEventListener('playing', function(){
           $('PLAY').fadeOut();
    })
     video.addEventListener('pause', function(){
           $('STOP').fadeOut();
       video.style.visibility='hidden';    
       answers.style.visibility='visible';     
    })

})
</script>";  
    
        echo'
        
<video width="800" height="600" id="video"  autoplay >
<source src="videos/'.$row->qe_videolink.'" type="video/mp4">
</video>




';
   


}
}    
    
    

//---------- AnswerSet

public function   AnswerSet($answerset, $answer, $quizid)  {
$_SESSION['answerset'] = $answerset;   
GLOBAL $mysqli;
GLOBAL $answer; //what they answer
GLOBAL $correctanswer; //the correct answer
GLOBAL $answerid; //id of answer   
GLOBAL $team; //team name
GLOBAL $quizid; //quizid
    
    
$sql = "SELECT * FROM st_answers, st_answersets

WHERE as_answerset ='$answerset'
AND as_answer =  an_id
"; 
    
if(!$result = $mysqli->query($sql)){
die('There was an error running the query [' . $mysqli->error . ']');
}

    
echo'<div id="answers" style="visibility:hidden;">';   
while( $row = mysqli_fetch_object($result)){

echo '

<form role="form" class="form well" name="newUser" action="process_answer.php" method="post">

<input type="hidden" value="'.$correctanswer.'" name="correctanswer"/>

<input type="hidden" value="'.$row->an_id.'" name="answerid"/>

<input type="hidden" value="'.$quizid.'" name="quizid"/>





<button type="submit" name="answer" class="btn btn-success" style="width:150px; height:150px;" value="'.$row->an_id.'">'.$row->an_answer.'</button>


<form>

' ;   

}  
echo'</div>'; 
}    
    
    
    
    
 //INSERT TEST
    
public function InsertNewTest($questionset,$videofolder,$team,$title,$answerset,$feedbackset,$displaynum,$displaymethod)
{
        

 GLOBAL $mysqli;


$stmt = $mysqli->prepare("INSERT INTO st_quizzes (qz_questionset,qz_videofolder,qz_team,qz_title,qz_answerset,qz_feedbackset,qz_displaynum,qz_displaymethod)
VALUES (?,?,?,?,?,?,?,?) " );

$stmt->bind_param("isisiiis", $questionset,$videofolder,$team,$title,$answerset,$feedbackset,$displaynum,$displaymethod);
$stmt->execute();
$inserted_id = $mysqli->insert_id;
$stmt->close();    
   
    
    
        
        
}
    
    
    
    
    
    
//EDIT TEST
    
    
    
    
    
    
    
    
  public function  
  DeleteQuiz($delid){
      
  GLOBAL $mysqli;    

$stmt = $mysqli->query ("DELETE FROM st_quizzes WHERE qz_id='$delid'");    
      
      
  }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    


public function ConvertQuizType ($quizid){
GLOBAL $mysqli;

$quiztypename = 'Random';   

return $quiztypename;

}





//----------QUESTIONLIST

public function QuestionList(){
global $mysqli;

$qcount =0;

$sql = " SELECT * FROM st_questions ";

if(!$result = $mysqli->query($sql)){
die('There was an error running the query [' . $mysqli->error . ']');
}

while( $row = mysqli_fetch_object($result )){

$qcount++;

echo '
<div class="col-md-12">
<div class="col-md-8">
<h3>'.$qcount.'. '.$row->qe_question.'  Video File:  '.$row->qe_videolink.'</h3>
</div>


<div class="col-md-1" >
<form role="form" action="edit_question.php" method="post" id="" class="" style="">
<input type="hidden" name="editid" value="'.$row->qe_id.'"/>
<input type="submit" class="btn btn-success"  value="EDIT"></form>
</div>

<div class="col-md-1" >
<form role="" action="delete_question.php" method="post" id="" class="" style="">
<input type="hidden" name="delid" value="'.$row->qe_id.'"/>
<input type="submit" class="btn btn-danger" value="DELETE"></form>
</div>
</div>

';   

}
}



//----------EDIT QUESTION

public function EditQuestion($editid, $question, $videolink){


GLOBAL $mysqli;

$stmt = $mysqli->query("UPDATE st_questions SET qe_question='$question', qe_videolink='$videolink' WHERE qe_id ='$editid'");
$inserted_id = $mysqli->insert_id;



}



//---------CreateQuestion

public function  CreateQuestion($question,$videolink){


GLOBAL $mysqli;


$stmt = $mysqli->prepare("INSERT INTO st_questions (qe_question,qe_videolink)
VALUES (?,?) " );

$stmt->bind_param("ss", $question,$videolink);
$stmt->execute();
$inserted_id = $mysqli->insert_id;
$stmt->close();    

} 




//----------QUESTIONSETS--------->>  

//---------AddToQuestionSet

public function AddToQuestionSet($question,$questionset){

GLOBAL $mysqli;


$stmt = $mysqli->prepare("INSERT INTO st_questionsets (qs_question,qs_questionset)
VALUES (?,?) " );

$stmt->bind_param("ss", $question,$questionset);
$stmt->execute();
$inserted_id = $mysqli->insert_id;
$stmt->close();       





}







//----------QuestionSetSelectList

public function  QuestionSetSelectList(){
GLOBAL $mysqli;

$sql = " SELECT * FROM st_questionsets GROUP BY qs_questionset   ";

if(!$result = $mysqli->query($sql)){
die('There was an error running the query [' . $mysqli->error . ']');
}

echo'<label>Question Set</label><select class="form-control" type="select" name="questionset">';

while( $row = mysqli_fetch_object($result )){

echo'<option value="'.$row->qs_id.'">'. $row->qs_id .'</option>';


}echo'</select>';

}   






//----------QuestionSelectList

public function  QuestionSelectList(){
GLOBAL $mysqli;

$sql = " SELECT * FROM st_questions   ";

if(!$result = $mysqli->query($sql)){
die('There was an error running the query [' . $mysqli->error . ']');
}

echo'<label>Question </label><select class="form-control" type="select" name="question">';

while( $row = mysqli_fetch_object($result )){

echo'<option value="'.$row->qe_id.'">'. $row->qe_id.' - '.$row->qe_question.' '.$row->qe_videolink.'</option>';


}echo'</select>';

} 





//----------QuestionSet

public function   QuestionSet($questionset)  {

global $mysqli;

$sql = " 

SELECT * FROM st_questionsets, st_quizzes, st_questions
WHERE st_questionsets.qs_questionset =  '$questionset'
AND  st_questionsets.qs_questionset =  st_quizzes.qz_questionset

";

if(!$result = $mysqli->query($sql)){
die('There was an error running the query [' . $mysqli->error . ']');
}



while( $row = mysqli_fetch_object($result )){   


var_dump($row);   

 
    
    

    
    


}
} 






//---------FEEDBACK--------->>


    
    
    
//----------FeedbackList

public function FeedbackList(){

global $mysqli;
$acount =0;
$sql = " SELECT * FROM st_feedback ";

if(!$result = $mysqli->query($sql)){
die('There was an error running the query [' . $mysqli->error . ']');
}

while( $row = mysqli_fetch_object($result )){

$acount++;

echo '
<div class="col-md-12">

<div class="col-md-8">
<h3>'.$acount.'. '.$row->fb_feedback.'  </h3>
</div>



<div class="col-md-1" >
<form role="form" action="edit_answer.php" method="post" id="" class="" style="">
<input type="hidden" name="editid" value="'.$row->fb_id.'"/>
<input type="submit" class="btn btn-success"  value="EDIT"></form>
</div>

<div class="col-md-1" >
<form role="" action="delete_answer.php" method="post" id="" class="" style="">
<input type="hidden" name="delid" value="'.$row->fb_id.'"/>
<input type="submit" class="btn btn-danger" value="DELETE"></form>
</div>

</div>

';   

}
}     
    
    
    
    
    
    
    

//----------FeedbackSetSelectList

public function  FeedbackSetSelectList(){

global $mysqli;

$sql = " SELECT * FROM st_feedbacksets GROUP BY fs_feedback";

if(!$result = $mysqli->query($sql)){
die('There was an error running the query [' . $mysqli->error . ']');
}

echo'<label>Feedback Set</label><select class="form-control" type="select" name="feedbackset">';

while( $row = mysqli_fetch_object($result )){

echo'<option value="'.$row->fs_feedback.'">'. $row->fs_id .'</option>';

}
echo'</select>';
} 


//----------FeedbackSet

public function   FeedbackSet($feedbackset)  {

global $mysqli;


}





    
   
//---------CreateFeedback

public function  Createfeedback($feedback){


GLOBAL $mysqli;


$stmt = $mysqli->prepare("INSERT INTO st_feedback (fb_feedback)
VALUES (?) " );

$stmt->bind_param("s", $feedback);
$stmt->execute();
$inserted_id = $mysqli->insert_id;
$stmt->close();    

}  
    
    
    
    
//----------DELETE FEEDBACK

public function DeleteFeedback ($delid){
GLOBAL $mysqli;    

$stmt = $mysqli->query ("DELETE FROM st_feedback WHERE fb_id='$delid'");

}  
    
    
    



//----------ANSWERS--------->>

//---------edit answer

public function    EditAnswer($answer, $editid){

GLOBAL $mysqli;

$stmt = $mysqli->query("UPDATE st_answers SET an_answer='$answer' WHERE an_id ='$editid'");
$inserted_id = $mysqli->insert_id;   

}









//----------AnswerList

public function AnswerList(){

global $mysqli;
$acount =0;
$sql = " SELECT * FROM st_answers ";

if(!$result = $mysqli->query($sql)){
die('There was an error running the query [' . $mysqli->error . ']');
}

while( $row = mysqli_fetch_object($result )){

$acount++;

echo '
<div class="col-md-12">

<div class="col-md-8">
<h3>'.$acount.'. '.$row->an_answer.'  </h3>
</div>



<div class="col-md-1" >
<form role="form" action="edit_answer.php" method="post" id="" class="" style="">
<input type="hidden" name="editid" value="'.$row->an_id.'"/>
<input type="submit" class="btn btn-success"  value="EDIT"></form>
</div>

<div class="col-md-1" >
<form role="" action="delete_answer.php" method="post" id="" class="" style="">
<input type="hidden" name="delid" value="'.$row->an_id.'"/>
<input type="submit" class="btn btn-danger" value="DELETE"></form>
</div>

</div>

';   

}
} 

//---------- AnswerSetSelectList

public function   AnswerSetSelectList(){
GLOBAL $mysqli;

$sql = " SELECT *  FROM st_answersets GROUP BY as_answerset";

if(!$result = $mysqli->query($sql)){
die('There was an error running the query [' . $mysqli->error . ']');
}

echo'<label>Answer Set</label><select class="form-control" type="select" name="answerset">';

while( $row = mysqli_fetch_object($result )){

echo'<option value="'.$row->as_id.'">'. $row->as_id .'</option>';

}
echo'</select>';
}



    
    
    
    
    
//---------- AnsweSelectList

public function   AnswerSelectList(){
GLOBAL $mysqli;

$sql = " SELECT *  FROM st_answers ";

if(!$result = $mysqli->query($sql)){
die('There was an error running the query [' . $mysqli->error . ']');
}

echo'<label>Answer </label><select class="form-control" type="select" name="answerset">';

while( $row = mysqli_fetch_object($result )){

echo'<option value="'.$row->an_id.'">'. $row->an_id .'</option>';

}
echo'</select>';
}
    
    
    
    
    
    
//----------CreateAnswer

public function  CreateAnswer($answer){


GLOBAL $mysqli;


$stmt = $mysqli->prepare("INSERT INTO st_answers (an_answer)
VALUES (?) " );

$stmt->bind_param("s", $answer);
$stmt->execute();
$inserted_id = $mysqli->insert_id;
$stmt->close();    

}    


//----------DELETE ANSWER

public function DeleteAnswer ($delid){
GLOBAL $mysqli;    

$stmt = $mysqli->query ("DELETE FROM st_answers WHERE an_id='$delid'");

} 










//----------HOUSEKEEPING--------->>



public function QuestionCounter (){}



















}//class

?>
