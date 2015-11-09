<?php
// Autoload our dependencies with Composer

require '../vendor/autoload.php';

use Illuminate\Database\Capsule\Manager as Capsule;


require_once("../models/db-settings.php"); //Require DB connection

$capsule = new Capsule;

// Database information
$capsule->addConnection(array(
    'driver' => 'mysqli',
    'host' => $db_host,
    'database' => $db_name,
    'username' => $db_user,
    'password' => $db_pass,
    'collation' => 'utf8_general_ci',
    'prefix' => 'st'
));

// Bootstrap Eloquent ORM
$capsule->setAsGlobal();
$capsule->bootEloquent();