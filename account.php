<?php
/*SportAnticipation~ @ENOXH 2015*/



require_once("models/config.php");
if (!securePage($_SERVER['PHP_SELF'])){die();}
require_once("models/header.php");

if(isset($loggedInUser->user_id)){
$uid = $loggedInUser->user_id;
$_SESSION['uid']=$uid;

}

?>


<script>
localStorage.uid = <?php echo $uid; ?>;
localStorage.pid = <?php echo $uid; ?>;
localStorage.mypid = <?php echo $uid; ?>;
localStorage.batside = 'left';

</script>

<body>
    
<div class="container">    
<div class="row">
<?php include_once('top_nav.php');     ?>
</div>  <!--row-->   
<div class="container">  

<div class="row">   
<div class="col-md-4">
<div class="well">

<h1><a href="op/views/index1.html" style="display:none" id="activeTest"></a></h1>

</div>  
</div>  



</div> <!--row-->       

</div><!--container-->  

<script type="text/javascript">
	$.ajax('op/views/results.json').done(function(data) {

		$('#activeTest')
			.text(data[0].test_title)
			.show();
	});
</script>
    
</body>
</html>


