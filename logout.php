<?php

/*SportAnticipation~ @ENOXH 2015*/


require_once("models/config.php");
if (!securePage($_SERVER['PHP_SELF'])){die();}

//Log the user out
if(isUserLoggedIn())
{
	$loggedInUser->userLogOut();
    session_destroy();
}

if(!empty($websiteUrl)) 
{
	$add_http = "";
	
	if(strpos($websiteUrl,"http://") === false)
	{
		$add_http = "http://";
	}
	
	header("Location: ".$add_http.$websiteUrl);
	die();
}
else
{
	header("Location: http://".$_SERVER['HTTP_HOST']);
	die();
}	

?>

