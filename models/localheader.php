<!DOCTYPE html">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title><?php echo $websiteName; ?></title>
<!-- Latest compiled and minified CSS -->
<link rel="stylesheet" href="css/bootstrap.min.css">


<link rel="stylesheet" href="css/font-awesome.min.css">
    
    
   <script type="text/javascript" src="js/jquery.min.js"></script> 
    
    <link rel="stylesheet" href="css/buttons.css">
<link rel="stylesheet" href="css/style.css">
      <link rel="stylesheet" href="css/animate.min.css">    
    
  
<!-- Latest compiled and minified JavaScript -->
<script src="js/bootstrap.min.js"></script>    

<script src="models/funcs.js" type="text/javascript">
</script>
    

     <script>
$(function(){

var video = $('#video')[0];
var answers = $('#answers')[0];

video.addEventListener('playing', function(){
$('PLAY').fadeOut();


})
video.addEventListener('pause', function(){
$('STOP').fadeOut();
video.style.visibility='hidden';    
answers.style.visibility='visible'; 

})

})
</script>   
    
</head>
    
    
    
    