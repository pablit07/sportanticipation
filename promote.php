<?php
/*Bootcaked by @ENOXH*/

require_once("models/config.php");
if (!securePage($_SERVER['PHP_SELF'])){die();}
require_once("models/header.php");
?>

<body>
<div class="container">    
<div class="row">
<?php include_once('top_nav.php');     ?>
</div>  <!--row-->   
<div class="row">   

<div class="col-md-6">
<div class="panel-group" id="accordion">
<div class="panel panel-default">
<div class="panel-heading">
<h4 class="panel-title">
<a data-toggle="collapse" data-parent="#accordion" href="#collapse1">
List Promotion</a>
</h4>
</div>
<div id="collapse1" class="panel-collapse collapse in">
<div class="panel-body">
  Send a message to our fan list.  
    
    <textarea rows="4" cols="50">
Hey everyone here's a personal message from The Almighty Open Mind!
</textarea>
    <hr/>
    
    <input type="submit" value="Send">
    
    </div>
</div>
</div>
<div class="panel panel-default">
<div class="panel-heading">
<h4 class="panel-title">
<a data-toggle="collapse" data-parent="#accordion" href="#collapse2">
Twitter</a>
</h4>
</div>
<div id="collapse2" class="panel-collapse collapse">
<div class="panel-body">

<div class="well">
<a href="http://twiends.com" target="_blank" class="btn btn-primary">Add Followers</a>
<a href="http://tweepi.com" target="_blank" class="btn btn-primary">Manage</a>
<a href="https://copromote.com/" target="_blank" class="btn btn-primary">Cross Promote</a>

    
    
    
    
</div>    
    
    
    
    
    
    </div>
</div>
</div>
<div class="panel panel-default">
<div class="panel-heading">
<h4 class="panel-title">
<a data-toggle="collapse" data-parent="#accordion" href="#collapse3">
Facebook</a>
</h4>
</div>
<div id="collapse3" class="panel-collapse collapse">
<div class="panel-body"><a name="fb_share" type="button_count" href="http://www.facebook.com/sharer.php">Share</a><script src="http://static.ak.fbcdn.net/connect.php/js/FB.Share" type="text/javascript"></script></div>
</div>
</div>
</div>   
</div><!--col-->  




<div class="col-md-6">
<div class="panel-group" id="accordion1">
<div class="panel panel-default">
<div class="panel-heading">
<h4 class="panel-title">
<a data-toggle="collapse" data-parent="#accordion1" href="#collapse4">
Google+</a>
</h4>
</div>
<div id="collapse4" class="panel-collapse collapse ">
<div class="panel-body">




</div>
</div>
</div>
<div class="panel panel-default">
<div class="panel-heading">
<h4 class="panel-title">
<a data-toggle="collapse" data-parent="#accordion1" href="#collapse5">
Snapchat</a>
</h4>
</div>
<div id="collapse5" class="panel-collapse collapse">
<div class="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat.</div>
</div>
</div>
<div class="panel panel-default">
<div class="panel-heading">
<h4 class="panel-title">
<a data-toggle="collapse" data-parent="#accordion1" href="#collapse6">
Instagram</a>
</h4>
</div>
<div id="collapse6" class="panel-collapse collapse">
<div class="panel-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
commodo consequat.</div>
</div>
</div>
</div>   
</div><!--col-->    










</div> <!--row-->       









<div class="footer"><?php echo $bandbase->header15; ?></div>
</div><!--container-->   
</body>
</html>


