<?php
/*Bootcaked by @ENOXH*/
require_once("models/config.php");
if (!securePage($_SERVER['PHP_SELF'])){die();}
require_once("models/header.php");


//include_once('test_funcs.php');



?>

<body>
<div class="container">  

<div class="row">
<?php include_once('top_nav.php');  ?>
</div>  <!--row-->




<div class="row" > 

<?php 

if (is_online()){echo'Application is :ONLINE <br/>';}
 
    
PreTest(); 


?>



</div><!--toprow-->   



</div><!--container-->  
    
   
</body>
</html>