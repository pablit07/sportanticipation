<?php
require_once("models/config.php");
if (!securePage($_SERVER['PHP_SELF'])){die();}
require_once("models/header.php");


require_once('test_funcs.php');


     /*--PHP 5.5--*/if (session_status() == PHP_SESSION_NONE) {
            if (version_compare(PHP_VERSION, '5.4.0') >= 0) {
                if (session_status()==PHP_SESSION_NONE) { session_start(); }
            } else {
                if(session_id()=='') { session_start(); }
            }}

?>


<body>
<div class="container">  

<div class="row">
<?php include_once('top_nav.php');  ?>
</div>  <!--row-->




<div class="row" > 

<?php 


LoadATest(); 

?>



</div><!--toprow-->   



</div><!--container-->  
    
    


    

    


</body>
</html>