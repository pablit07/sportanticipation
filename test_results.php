<?php
/*SportAnticipation~ @ENOXH 2015*/

require_once("models/config.php");
if (!securePage($_SERVER['PHP_SELF'])){die();}
require_once("models/header.php");

include_once('test_funcs.php');
$loggedInUser = $_SESSION["userCakeUser"]; 
$uid = $loggedInUser->user_id;  


global $uid;
?>

<body>
<div class="container">    
<div class="row">
<?php include_once('top_nav.php');     ?>
</div>  <!--row-->   


<div class="row">   

    
    <h2>TEST RESULTS</h2><br/><h3>
<?php     
  
$tid = $_SESSION['crntest'];
$ta = $_SESSION['totalanswered'];
$cc = $_SESSION['correctcount'];

echo 'Total Number of Questions Answered: '.$ta;  
echo'<br/>';
echo 'Total Number of Correct Answers: '.$cc;
echo'<br/>';

 $percent = $cc/$ta*100;

echo $percent .'% Correct!';



if ($_SESSION['saved']==0){
SaveResultSummary($tid, $ta, $cc, $uid);   
$_SESSION['saved']=1;

    
}

ResetAll();    
    ?>
    
  </h3>  
    
    
    
    
    
    
    
</div> <!--row-->       

</div><!--container-->   
</body>
</html>


