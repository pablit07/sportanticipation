<?php
/*
SportsTest by @ENOXH
*/

//Database Information
$db_host = "localhost"; //Host address (most likely localhost)
$db_name = "sportstestdb"; //Name of Database
$db_user = "enoxhsi"; //Name of database user
$db_pass = "IVsport1235"; //Password for database user
$db_table_prefix = "st_";

GLOBAL $errors;
GLOBAL $successes;

$errors = array();
$successes = array();

/* Create a new mysqli object with database connection parameters */
$mysqli = new mysqli($db_host, $db_user, $db_pass, $db_name);
GLOBAL $mysqli;

if(mysqli_connect_errno()) {
	echo "Connection Failed: " . mysqli_connect_errno();
	exit();
}

//Direct to install directory, if it exists
if(is_dir("install/"))
{
	header("Location: install/");
	die();

}

?>