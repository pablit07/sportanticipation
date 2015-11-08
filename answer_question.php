<?php
/*Bootcaked by @ENOXH*/

require_once("models/config.php");
if (!securePage($_SERVER['PHP_SELF'])){die();}
require_once("models/header.php");

global $mysqli;
global $uid;
global $videourl;
global $altvideourl;

?>


 


<?php 

// define variables and set to empty values
$answerid = $correctanswer = $video = $title  = $occ  =$userid = $testid = $questionid = $mybattingside =  $videobattingside = $question_alt_video =$videourl= "";

$answerid = htmlspecialchars($_GET["id"]);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
$question_alt_video = $_SESSION["question_alt_video"];
$correctanswer = test_input($_POST["correctanswer"]);
$videourl = $_SESSION['videourl'];  
$title = test_input($_POST["title"]);
$occ = test_input($_POST["occlusion"]);
$userid = test_input($_POST["userid"]);
$testid = $_SESSION["crntest"];
$questionid = test_input($_POST["questionid"]);
$mybattingside = $_SESSION["mybattingside"];
$videobattingside = test_input($_POST["videobattingside"]);
$answered =     test_input($_POST["answered"]);
$txtanswer =     test_input($_POST["txtanswer"]);   
  
$t = $_SESSION['totalanswered'];
$t++;
$_SESSION['totalanswered'] = $t ;    

$sql = "INSERT INTO st_results ( result_user, result_test, result_question, result_answered,  result_correct_answer)
VALUES ('$id', '$testid', '$questionid', '$answered', '$correctanswer')";

if ($mysqli->query($sql) === TRUE) {

//$_SESSION['curquest']++;

if ($_SESSION['mode'] == 'test' ){ 
    
header('location:test_start.php'); 
}


if ($_SESSION['mode'] == 'train' ){   

}    
}
}

?>

<body>

<div class="container">    
<div class="row">
<?php include_once('top_nav.php');?>

</div>  <!--row-->   


<div class="row">   
  
    
<?php 
$altvideourl =  $_SESSION["question_alt_video"];
if ($correctanswer==$answerid){

//echo 'alt'. $altvideourl.'<br/> ';
    
//echo 'vid'. $videourl.' ';    
    
} 
else{

echo '<h2 style="color:red;">SORRY THAT IS INCORRECT!</h2><br/>You Answered: '. $txtanswer.' The correct answer is:'. $_SESSION['realanswer'];
}
   
?> 
    
    

</div> <!--row-->       


</div><!--container-->  


<?php

function test_input($data) {
$data = trim($data);
$data = stripslashes($data);
$data = htmlspecialchars($data);
return $data;
}

ShowTrainResult();


function ShowTrainResult(){
global $videourl;
global $altvideourl;

echo'
<div id="replace">
<video width="800" height="600" id="video"  controls >
<source src="'.$videourl.'" type="video/mp4">
</video>
<hr/>


</div>';  

echo'<a href="#" class="btn btn-primary" onclick="insertVideo();">Replay Test Clip</a>
<a href="#" class="btn btn-primary" onclick="insertAltVideo();">Full Clip</a>
<a href="test_start.php" class="btn btn-primary">CONTINUE</a>';    
    
}

?>


  <script>

function insertVideo(){var elem = document.getElementById('replace'); elem.innerHTML = '<video width="800" height="600" id="video"  controls ><source src="<?php echo $videourl; ?>" type="video/mp4"></video>';}
</script> 
    
    <script>
 function insertAltVideo(){var elem = document.getElementById('replace');elem.innerHTML = '<video width="800" height="600" id="video"  controls ><source src="<?php echo $altvideourl; ?>" type="video/mp4"></video>';
}  
  </script>     
</body>
</html>
