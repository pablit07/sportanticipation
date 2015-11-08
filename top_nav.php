<?php

if (!securePage($_SERVER['PHP_SELF'])){die();}

?>
<nav role="navigation" class="navbar navbar-inverse">
<!-- Brand and toggle get grouped for better mobile display -->
<div class="navbar-header">
<button type="button" data-target="#navbarCollapse" data-toggle="collapse" class="navbar-toggle">
<span class="sr-only">Toggle navigation</span>
<span class="icon-bar"></span>
<span class="icon-bar"></span>
<span class="icon-bar"></span>
</button>
<?php 



if(isset($loggedInUser->displayname)){


echo'<h3>'; 
echo $loggedInUser->displayname;
echo '</h3>'; 

}
    
    










    ?>
</div>
<!-- Collection of nav links and other content for toggling -->
<div id="navbarCollapse" class="collapse navbar-collapse">
<ul class="nav navbar-nav navbar-right">
<?php            
//Links for logged in user
if(isUserLoggedIn()) {
echo '
<ul class="nav navbar-nav navbar-right">
<li><a href="account.php"><i class="fa fa-dashboard fa-2x"></i></a></li>
<li><a href="user_settings.php"><i class="fa fa-gear fa-2x"></i></a></li>
<li><a href="logout.php"><i class="fa fa-sign-out fa-2x"></i></a></li>
</ul>';

//Links for permission level 2 (default admin)
if ($loggedInUser->checkPermission(array(2))){
echo '
<li><a href="admin_configuration.php"><i class="fa fa-sliders fa-2x"></i></a></li>
<li><a href="admin_pages.php"><i class="fa fa-file fa-2x"></i></a></li>
<li><a href="admin_permissions.php"><i class="fa fa-server fa-2x"></i></a></li>
<li><a href="admin_users.php"><i class="fa fa-users fa-2x"></i></a></li>
<li><a href="manage_tests.php"><i class="fa fa-star fa-2x"></i></a></li>
<li><a href="manage_questions.php"><i class="fa fa-question fa-2x"></i></a></li>
<li><a href="manage_answers.php"><i class="fa fa-info fa-2x"></i></a></li>


';
}
} 
//Links for users not logged in
else {
echo '
<li><a href="#"><i class="fa fa-sign-in fa-2x"></i></a></li>
';
}

?>
<ul class="nav navbar-nav navbar-right">

</ul>
</div>
</nav>




