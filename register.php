<?php

/*SportAnticipation~ @ENOXH 2015*/


require_once("models/config.php");
if (!securePage($_SERVER['PHP_SELF'])){die();}

//Prevent the user visiting the logged in page if he/she is already logged in
if(isUserLoggedIn()) { header("Location: account.php"); die(); }

//Forms posted
if(!empty($_POST))
{
	$errors = array();
	$email = trim($_POST["email"]);
	$username = trim($_POST["username"]);
	$displayname = trim($_POST["displayname"]);
	$password = trim($_POST["password"]);
	$confirm_pass = trim($_POST["passwordc"]);
	$captcha = md5($_POST["captcha"]);
	
	
	if ($captcha != $_SESSION['captcha'])
	{
		$errors[] = lang("CAPTCHA_FAIL");
	}
	if(minMaxRange(5,25,$username))
	{
		$errors[] = lang("ACCOUNT_USER_CHAR_LIMIT",array(5,25));
	}
	if(!ctype_alnum($username)){
		$errors[] = lang("ACCOUNT_USER_INVALID_CHARACTERS");
	}
	if(minMaxRange(5,25,$displayname))
	{
		$errors[] = lang("ACCOUNT_DISPLAY_CHAR_LIMIT",array(5,25));
	}
	if(!ctype_alnum($displayname)){
		$errors[] = lang("ACCOUNT_DISPLAY_INVALID_CHARACTERS");
	}
	if(minMaxRange(8,50,$password) && minMaxRange(8,50,$confirm_pass))
	{
		$errors[] = lang("ACCOUNT_PASS_CHAR_LIMIT",array(8,50));
	}
	else if($password != $confirm_pass)
	{
		$errors[] = lang("ACCOUNT_PASS_MISMATCH");
	}
	if(!isValidEmail($email))
	{
		$errors[] = lang("ACCOUNT_INVALID_EMAIL");
	}
	//End data validation
	if(count($errors) == 0)
	{	
		//Construct a user object
		$user = new User($username,$displayname,$password,$email);
		
		//Checking this flag tells us whether there were any errors such as possible data duplication occured
		if(!$user->status)
		{
			if($user->username_taken) $errors[] = lang("ACCOUNT_USERNAME_IN_USE",array($username));
			if($user->displayname_taken) $errors[] = lang("ACCOUNT_DISPLAYNAME_IN_USE",array($displayname));
			if($user->email_taken) 	  $errors[] = lang("ACCOUNT_EMAIL_IN_USE",array($email));		
		}
		else
		{
			//Attempt to add the user to the database, carry out finishing  tasks like emailing the user (if required)
			if(!$user->userCakeAddUser())
			{
				if($user->mail_failure) $errors[] = lang("MAIL_ERROR");
				if($user->sql_failure)  $errors[] = lang("SQL_ERROR");
			}
		}
	}
	if(count($errors) == 0) {
		$successes[] = $user->success;
	}
}

require_once("models/header.php");
echo "
<body>
<div class='container'>
<div class='row'>
";

include("top_nav.php");

echo "


<div class='form-well'>";

echo resultBlock($errors,$successes);

echo "
<div class='col-md-4'>
<form name='newUser' class='form' role='form' action='".$_SERVER['PHP_SELF']."' method='post' style='color:white;'>

<div class='form-group'>
<label>User Name:</label>
<input type='text' class='form-control' name='username' />
</div>
<div class='form-group'>
<label>Display Name:</label>
<input type='text' class='form-control' name='displayname' />
</div>
<div class='form-group'>
<label>Password:</label>
<input type='password'  class='form-control' name='password' />
</div>
<div class='form-group'>
<label>Confirm:</label>
<input type='password' class='form-control' name='passwordc' />
</div>
<div class='form-group'>
<label>Email:</label>
<input type='text' class='form-control' name='email' />
</div>
<div class='form-group'>
<label>Security Code:</label>
<img src='models/captcha.php'>
</div>
<label>Enter Security Code:</label>
<input name='captcha' class='form-control' type='text'>

<br/>

<input type='submit'  class='btn btn-primary round raised' value='Register'/>
</div>

</form>
</div>

</div>
<div id='bottom'></div>
</div>
</body>
</html>";
?>
