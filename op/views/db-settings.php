<?php
/*
SportsTest by @ENOXH
*/

//Database Information
$db_host = isset($_ENV['RDS_HOSTNAME']) ? $_ENV['RDS_HOSTNAME'] : "localhost"; //Host address (most likely localhost)
$db_name = isset($_ENV['RDS_DB_NAME']) ? $_ENV['RDS_DB_NAME'] : "sportstestdb"; //Name of Database
$db_user = isset($_ENV['RDS_USERNAME']) ? $_ENV['RDS_USERNAME'] : "enoxhsi"; //Name of database user
$db_pass = isset($_ENV['RDS_PASSWORD']) ? $_ENV['RDS_PASSWORD'] : "IVsport1235"; //Password for database user
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