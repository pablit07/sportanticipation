//VARIABLES
var olanstring;
var questions;
var data;
var answerarray;
var startcount;
var startpoint ;
var count;
var current_question;
var uid ;
var callback;
var AJAX_req ;
var answer_answer;
//Default BG Color    
var bgcolor="default";
var count=0;  
//Default Test Mode
var testmode="quiz";
var correct;
var incorrect;
var tid;
var uid;
var pid;
var mypid;
var sdate;
var test_question_count;
var test_id;
var test_active ;
var test_created;
var test_description;
var test_focus;
var questionid;
var test_question_order;
var test_team;
var test_title;
var testtype = 'new';
var data = new Array();
var video;
var question_video;
var question_alt_video;
var playerid;
var count=1;
var answertext ;
var question_id;
var buttonid;
var button;
var xc;
var ca;
var sessioncount;

/*
localStorage.tid
localStorage.uid
localStorage.mypid 
localStorage.myData
localStorage.playersessions
localStorage.olanstring
localStorage.correct;
localStorage.incorrect
localStorage.testmode 
localStorage.batside 
localStorage.tsData
localStorage.numq  
localStorage.playerid 
localStorage.questionid    
localStorage.correcta  
localStorage.videoid   
localStorage.batside 
*/





























//-----TEST STARTS HERE

//-----------------------------------------------------------------------------------


//-----------------------PRETEST: THIS LOADS FIRST

function PreTest(){

startpoint = 2;  //DO NOT CHANGE 
count=1;      //DO NOT CHANGE 

//get the date
sdate = GetDate();   

//default bg color
bgcolor="default";
//default test mode    
testmode="quiz";   
//default test status    
testtype = 'new'; 





//user should have been logged into the site prior to this at some point so a localstorage obj for the user ID should exist. If there have been tests done offline then not only will a userid exist but several pid's

// start by looking for a pid stored locally
if (isset(localStorage.pid)){    
pid = localStorage.pid;
getuid = false;
}else{
if (!isset(localStorage.pid)){  
//no pid get uid
if (isset(localStorage.uid)){     
pid = localStorage.uid;
getuid=false;
}else{
//no pid or uid prompt for one
getuid = true;}
};


//battingside
if (isset(localStorage.batside)){    
battingside = localStorage.batside;
getbatside = false;
}else{
//getbattingside
getbatside = true;
};



//testid always 1 in prototype
if(isset(localStorage.tid)){
tid = localStorage.tid;
}else{tid=1;}  


//stores how many test sessions between DB uploads if offline
if(isset(localStorage.sessionCount)){
sessioncount = localStorage.sessionCount;
sessioncount ++;
localStorage.sessionCount = sessioncount;   


}else{ 
//if not set set to 1 must be a new test session
sessioncount = 1; localStorage.sessionCount = sessioncount;}  

//debug
console.log('Test ID:'+tid);
console.log('Session Count:'+sessioncount);


//check to see if we are online    
OnlineCheck(); 

}




//-------------------------------------------------------------------------------

//----------CHECK IF ONLINE
function OnlineCheck(){
if(navigator.onLine){
online = true;
console.log("ONLINE"); 
}else{online=false;}
    
    
    
if((localStorage.uid)){console.log('UID EXISTS');
}else{

;}  


//GENERATE A NEW JSON FILE BY CALLING PHP FUNCTION makejson.php  
console.log("GEN NEW JSON FILE");       
jQuery.ajax({
type: "POST",
url: '../../makejson.php',
dataType: 'json',
data: {functionname: 'add', arguments: [1, 2]},

success: function (obj, textstatus) {
if( !('error' in obj) ) {
yourVariable = obj.result;
}
else {
console.log(obj.error);
}
}
});

//LOAD JSON DATA    
console.log("LOAD DATA FROM JSON");     
AJAX_JSON_Req('results.json', function (callback) {
data = callback;    
});       

}
//populate the content to the page 
if (online=true){

//LOGINBOX
document.getElementById('loginbox').innerHTML = '<div class="container"><h2>Player ID '+localStorage.pid+'</h2> <button class="btn btn-primary" onclick="GoLogin()">START</button></div> <BR> <br/><br/> <div id="tmodebuttons">You are In:<strong>'+testmode+' mode</strong><br/> <button class="btn btn-primary" onclick="a()">Switch to Test Mode</button> </div> <div id="tmode"></div><input type="hidden" name="playerID" id="playerID"  value="'+uid+'"/>'; 

return true; 
}
else
{
//We are offline    
console.log("OFFLINE");
document.getElementById('netstatus').innerHTML = 'OFFLINE';


//LOAD JSON DATA FROM CACHED FILE
console.log("LOAD DATA FROM JSON");     
AJAX_JSON_Req('results.json', function (callback) {
data = callback;    
});          



//populate the content to the page 

document.getElementById('loginbox').innerHTML = '<div class="container"><h2>Enter your Player ID</h2><input type="text" id="playerID" name="playerID"/><Select name="batside"><option value="left"><option value="right"></select> <button class="btn btn-primary" onclick="GoLogin()">START</button></div> <BR> <br/><br/> <div id="tmodebuttons">You are In:<strong>'+testmode+' mode</strong><br/> <button class="btn btn-primary" onclick="a()">Switch to Test Mode</button> </div> <div id="tmode"></div>'; 

return false;

/*The buttons in the pops above will call the function GoLogin*/    
}
}

//----------Begins the Testing Process
function GoLogin(){
console.log("GOLOGIN OK");
playerid = document.getElementById("playerID").value;
mypid =playerid;
//there is now a storage object that is called the pid
//mypid becomes the actual pid for this test session


localStorage.mypid = mypid; 



document.getElementById('loginbox').innerHTML = '';
document.getElementById("plid").innerHTML = "Player ID: "+mypid;
console.log("User Input: "+mypid);
CheckSessionArray();
}//








//-----------------------------------------------------

//----------CHECK FOR SESSION ARRAY
function CheckSessionArray(){


if(localStorage.myData){   
console.log("TESTING SESSIONS EXIST"+localStorage.myData);

CheckPlayerSession();
return true;
}

if(!localStorage.myData){
console.log("NO TESTING SESSIONS EXIST");
CheckPlayerSession();
return false;    

}
}//

//-------------------------------------------------------

//----------CHECK IF PLAYER SESSIONS EXIST
function CheckPlayerSession(){
if(isset(localStorage.playersessions)){
console.log("PLAYER SESSION EXISTS");
//RESUME TEST SESSION  
StartOldTest(pid);  



}else if(!isset(localStorage.playersessions)){
console.log("NO PLAYER SESSION EXISTS");

localStorage.playersessions = playerid;
//START A NEW TEST SESSION    
StartNewTest(pid);    
}
}








//-----------------------------------------------------------


//---------START A NEW TEST
function  StartNewTest(){

//NEW TEST
//SET THE DATA ARRAY FOR LOCALSTORAGE    
SetupOfflineData(); 


console.log("START NEW TEST!");   
BuildATest("new");
}


//------------------------------------------------------------

//----------RESUME AN EXISTING TEST
function  StartOldTest(){

//GET THE DATA ARRAY FOR LOCALSTORAGE        

//GetOfflineData();   

console.log("RESUME EXISTING TEST!");
BuildATest("old");   
}








//---------------------------------------------

function SetupOfflineData(){
correct=0;
incorrect=0;
localStorage.correct=0;
localStorage.incorrect=0;
    
var index=0;
var qcount = test_question_count;
tsc = Math.floor(Math.random() * 90000) + 10000;
localStorage.savesessionid = tsc;
}






//--------------------------------------------BUILD A TEST

//testype=old or new

function BuildATest(testtype){  
var tempcount = test_question_count;
var startpoint=2;   

//adds 2 to the object count which is where the questions start 
current_question = 1;    

AJAX_JSON_Req('results.json', function (callback) {
//data holds the test data received from JSON
data = callback;
//check if we got something
console.log(data)   ;

});      


// load questions to ask    
console.log('Question: '+current_question);  

if(testtype == 'old' ){ 
//parse stored session    
var mydata = JSON.parse(localStorage.getItem('myData'));
var tdate = data[0].test_created;
var tpid = playerid;
//qansd = mydata.qansd;   
console.log(mydata); 

//Show the buttons
ShowButtons(); 

//Load the video
LoadRndVideo(); 


//populate html
document.getElementById("status").innerHTML = "Resuming test from: " +tdate+test_id+"|";
document.getElementById("questionrow").innerHTML = '<div class="question"><img src="../images/blank.gif" style="border:0" alt="" /></span></div>   '; 

//document.getElementById("bsidebutns").innerHTML ='<div="batsidebutns">Batting Side: <button onclick="c()">Left</button> <button  onclick="d()">Right</button></div>';    

} 
if(testtype == 'new'){
console.log('New Test Has Begun'); 

//Show the buttons
ShowButtons(); 

//Load the video
LoadRndVideo(); 


//populate html    
document.getElementById("questionrow").innerHTML = '<div class="question" ><h1>  ' + data[count].question_question + ' <span id="result_' + count + '">HERE?</h1><img src="../images/blank.gif" style="border:0" alt="" /></span></div>   ';     

}
}







//---------------------------------------------

//----------SHOW BUTTONS
function ShowButtons(){
AJAX_JSON_Req('results.json', function (callback) {

data=callback;


ri= 0;
//get answers
var answer_array = data[1].answer_answer; 


//create answerarray    
answerarray = answer_array.split(',');  
console.log(answerarray);


for(j=0;j<answerarray.length;j++) {

document.getElementById('buttonrow').innerHTML += ('<input type="button" class="btn btn-primary"  name="answer_' + ri + '" value="' + answerarray[ri] + '" id="answer_' + ri + '_' + j + '" class="question_' + ri + '" onclick="submitAnswer(' + ri + ', this, \'question_' + ri + '\', \'label_' + ri + '_' + j + '\')" />'); 
ri++ ;

}}); 
}




//---------------------------------------------

//LOAD VIDEO

function LoadRndVideo(){

video = data[startpoint].question_video;

videofull = data[startpoint].question_alt_video;
console.log(video);     
console.log(videofull); 

document.getElementById("mainholder").innerHTML ='<div id="netstatus" style="pull-left;"></div><div class="page-header"><h2 style="text-align:center; ">SPORTANTICIPATION</h2></div><div class="pull-right" style="position:relative; margin-right:100px;"><span id="plid"></span><small><span id="status"></span></small><span id="sessioninfo"></span></div><div id="loginbox" style="max-width:100%; text-align:center;"></div><div id="plid"></div><div id="sessioninfo"></div><div id="message"></div><div class="inforow" id="inforow"></div><div class="container"><div class="videorow" id="videorow"></div></div><div id="status"></div><div id="questionrow"></div><div id="feedbackrow"></div><div id="answerrow" class="answerrow"><div class="btn-group"><div id="buttonrow" class="buttonrow"></div></div>';

document.getElementById("videorow").innerHTML ='<div id="a"><video style="max-width:98%;" id="video"  autoplay><source src="../videos/001/'+video+'.mp4" type="video/mp4"/></video></div>';

document.getElementById("questionrow").innerHTML = '<p class="question">  ' + data[startpoint].question_question + ' <span id="result_' + startpoint + '"><img src="../images/blank.gif" style="border:0" alt="" /></span></p>   ';

enableQuestion(test_id);

}


//----------------------------------------------------------


//---------SUBMIT ANSWER
function submitAnswer(buttonid, question, x, y ) {
AJAX_JSON_Req('results.json', function (callback) {

data=callback;
console.log('Submitted:'+buttonid) ;
console.log('Submitted:'+question) ;    
console.log('qid:'+current_question) ;   
console.log('Submitted:'+y) ;   

ca = current_question + 1;
//check the answer
cas = data[ca].answer_answer;


if(testmode =="quiz"){
document.getElementById("answerrow").innerHTML='<h2>You Answered: '+answerarray[buttonid]+'</h2>';
localStorage.test_question_answered  = answerarray[buttonid];
disableQuestion(test_id);//disables buttons 

showResult(buttonid); //shows result


}

if(testmode =="test"){
document.getElementById("answerrow").innerHTML='<button class="btn btn-primary" type="button" onclick="SaveAQuestion()">Continue</button> '; 


}

}); 

}//END




//----------CONTINUE THE TEST----------------------------


function contTest(){



AJAX_JSON_Req('results.json', function (callback) {
data=callback;

test_question_count = data[0].test_question_count;   
console.log('Current Question:' +current_question);
console.log('Question Count:'+test_question_count);    



if(current_question >= test_question_count ){
EndTest();  
} else{

current_question++;      

document.getElementById('answerrow').innerHTML='';
//document.getElementById('buttonrow').innerHTML='';
LoadRndVideo(); 
ShowButtons();
document.getElementById("feedbackrow").innerHTML = '';

document.getElementById("questionrow").innerHTML = '<p class="question">   <span id="result_' + ri + '"><img src="../images/blank.gif" style="border:0" alt="" /></span></p>   '; 


}
});
}

//----------TEST IS OVER-------------------------


function EndTest(){

console.log("TEST OVER"); 



var div = document.createElement('div');

div.id = "container";


document.getElementById("mainholder").innerHTML = ('<a href=" ../../account.php"  class="btn btn-primary" >Finish</a><div id="reportdiv">TEST COMPLETE</div><div style="text-align:center;" id="questionrow"></div><div style="text-align:center;" id="answerrow"></div><div style="text-align:center;" id="feedbackrow"></div><div id="buttonrow" style="text-align:center;"></div>');


//console.log(questionresults);
showScore();

}



//-----------------SHOW SCORE----------------------------------------

function showScore() {
SaveATest();
console.log(correct=localStorage.correct);    
console.log(localStorage.incorrect);     
ls = localStorage.sessionCount;
ls++;
localStorage.sessionCount = ls;    
var ansx=test_question_count
tcorrect = correct ;
//localStorage.correct=0;    
//localStorage.incorrect=0;    
var pc = Math.round(( tcorrect  / ansx) * 100);

document.getElementById("reportdiv").innerHTML = "<div > <h2>You scored " + correct  + " out of " + ansx + "</h2> ";

document.getElementById("reportdiv").innerHTML  += "<div> <h2>You correctly answered " + pc + "% of the questions! </h2> </div></div><div id='mainholder'></div>";





}





//------------------------SHOW RESULT OF A QUESTION---------------------------------


//----------SHOW RESULT
function showResult(button) {
//document.getElementById("questionrow").innerHTML = '';
AJAX_JSON_Req('results.json', function (callback) {
data = callback;
chk = current_question + 1;
ans = button+1;    
//check the answer

//console.log(data[chk].question_test_correct);
console.log('ANS'+ans);    


document.getElementById("questionrow").innerHTML = '';

console.log(data[chk]);

xc = data[chk].question_test_correct;


//if correct
if(xc == ans) { 
localStorage.answered = answerarray[buttonid];
document.getElementById("feedbackrow").innerHTML = '<div class="container" style="text-align:center;"><div class="col-med-4" style="color:green;"><h1>CORRECT!</h1></div><div class="col-med-4"><img src="../images/correct.gif" style="border:0" alt="Correct!"/> <button class="btn btn-primary" type="button" class="btn btn-primary" onclick="play_re()">Replay</button> <button type="button" class="btn btn-warning" onclick="play_full()">Watch Full Pitch</button><button type="button" class="btn btn-success" onclick="SaveAQuestion()">Continue</button> <img src="../images/correct.gif" style="border:0" alt="Correct!"/>  <h2></div> </div> ' ;
correct++;
localStorage.correct++ ;
disableQuestion(test_id);//disables buttons

} else {

ra=xc-1;
answertext = answerarray[ra];
localStorage.test_question_answer_correct =answertext;
//answertext = choices[ri][questionId];
document.getElementById("feedbackrow").innerHTML = '<div class="container" style="text-align:center;"><div class="col-med-4" style="color:red;"><h2>SORRY INCORRECT!</h2><img src="../images/incorrect.gif" style="border:0" alt="Incorrect!" /> <button class="btn btn-primary" type="button" class="btn btn-primary" onclick="play_re()">Replay</button><button type="button" class="btn btn-warning" onclick="play_full()">Watch Full Pitch</button><button class="btn btn-success" type="button" onclick="SaveAQuestion()">Continue</button> <img src="../images/incorrect.gif" style="border:0" alt="Incorrect!" /><h2>The Correct Answer Was: '+answertext+'</h2></div> </div>';
incorrect++
localStorage.incorrect++;
disableQuestion(test_id);//disables buttons

}

});

}

//-----------DISABLES THE BUTTONS BETWEEN ANSWERS----------------------

//----------DISABLEQUESTION
function disableQuestion(test_id) {
var alltags=document.all? document.all : document.getElementsByTagName("*")
for (i=0; i<alltags.length; i++) {
if (alltags[i].className == test_id) {
alltags[i].disabled = true;


}
}
}



//----------------LOADS FULL VIDEO----------------------------------


//----------PLAY THE FULL CLIP
function play_full(){ 
var vid = document.getElementById("a");
vid.innerHTML  = ' <video  autoplay controls><source src="../videos/001/' + videofull + '.mp4" type="video/mp4" />';}

//REPLAY THE CLIP
function play_re() 
{var vid = document.getElementById("a");
vid.innerHTML  = ' <video  autoplay controls><source src="../videos/001/' + video + '.mp4" type="video/mp4" />';}













//------SAVES THE RESULTS TO LOCALSTORAGE


function SaveATest(){



AJAX_JSON_Req('results.json', function (callback) {
data = callback;    


//general test information
//test_id = data[0].test_id; 
test_created = data[0].test_created;    
test_description = data[0].test_description;
test_focus = data[0].test_focus;
test_question_count = data[0].test_question_count;
test_question_order = data[0].test_question_order;
test_team = data[0].test_team;
test_title = data[0].test_title; 




correct = localStorage.correct;
incorrect = localStorage.incorrect;


console.log (localStorage.sessiondate = sdate); 
console.log (localStorage.test_id     = test_id ) ;
console.log (localStorage.test_created    = test_created );
console.log (localStorage.test_description    = test_description) ;
console.log (localStorage.test_focus    = test_focus );
localStorage.test_question_count    = test_question_count;
console.log (localStorage.test_question_order   = test_question_order) ;
console.log (localStorage.test_team    = test_team) ;
console.log (localStorage.test_title    =  test_title);
console.log (localStorage.answers_correct   = correct  );
console.log (localStorage.answers_incorrect    = incorrect );

console.log('MADE IT');
console.log ('Sdate'+localStorage.sessiondate );  
console.log ('test_id'+ localStorage.test_id );  
UpdateTest();
}); 





}





function UpdateTest(){
console.log('MADE IT-2');
var xx = localStorage.savesessionid;

sdate = localStorage.sessiondate;     
test_id = localStorage.test_id      ;
test_created  = localStorage.test_created  ;
test_description = localStorage.test_description   ;
test_focus = localStorage.test_focus  ;
test_question_count = localStorage.test_question_count   ;
test_question_order = localStorage.test_question_order    ;
test_team = localStorage.test_team  ;
test_title = localStorage.test_title ;

incorrect  = localStorage.answers_incorrect ;  
test_question_id  = localStorage.test_question_id -1    ;
test_question_answered = localStorage.test_question_answered     ;
test_question_answer_correct  =localStorage.test_question_answer_correct   ;    


$.ajax({
method: "POST",
url: "syncrotest.php",
data:{test_id:test_id,total_answered:current_question,correct:correct,pid:pid,test_created :test_created,test_team:test_team,test_title:test_title,sdate:sdate}
}); 





}











//----------------------------------------------

function SaveAQuestion(){


//GET THE DATA THEN SAVE AS LOCAL
AJAX_JSON_Req('results.json', function (callback) {
var data = callback;  
chk = current_question + 1;

test_id = data[0].test_id;
test_team = data[0].test_team;
test_title = data[0].test_title;     
test_created = data[0].test_created;    
test_description = data[0].test_description;
test_focus = data[0].test_focus;
test_question_count = data[0].test_question_count;
test_question_id = chk;




localStorage.sessiondate = sdate; 
localStorage.test_title    =  test_title; 
localStorage.test_id     = test_id  ;
localStorage.test_team    = test_team ;
localStorage.test_title    =  test_title;
localStorage.test_created    = test_created ;
localStorage.test_description    = test_description ;
localStorage.test_focus    = test_focus ;
localStorage.test_question_count    = test_question_count ;
localStorage.test_question_order   = test_question_order ;
localStorage.answers_correct   = correct  ;
localStorage.answers_incorrect    = incorrect ;
localStorage.test_question_id    = chk ;




UpdateQuestion();    


});

}




function UpdateQuestion(){

var xx = localStorage.savesessionid;

sdate = localStorage.sessiondate;     
test_id = localStorage.test_id      ;
test_created  = localStorage.test_created  ;
test_description = localStorage.test_description   ;
test_focus = localStorage.test_focus  ;
test_question_count = localStorage.test_question_count   ;
test_question_order = localStorage.test_question_order    ;
test_team = localStorage.test_team  ;
test_title = localStorage.test_title ;
correct = localStorage.answers_correct;
incorrect  = localStorage.answers_incorrect ;  
test_question_id  = localStorage.test_question_id -1    ;
test_question_answered = localStorage.test_question_answered     ;
test_question_answer_correct  =localStorage.test_question_answer_correct   ;    


$.ajax({
method: "POST",
url: "syncroquestion.php",
data:{sc:xx,pid:pid,sdate:sdate,test_id:test_id,test_created:test_created,test_description:test_description,test_focus:test_focus,test_question_count:test_question_count,test_question_order:test_question_order,test_team:test_team,test_title:test_title,correct:correct,incorrect:incorrect,test_question_id:test_question_id,test_question_answered:test_question_answered,test_question_answer_correct:test_question_answer_correct}
}); 

contTest();

}











































//UNCOMMENT B4 YOU DEPLOY   
//var srez = CheckSessionArray();    
//if (srez=true){document.location = 'http://sportanticipation.com/login.php';}    
//if (srez){document.location = 'http://sportanticipation.com/package/views/syncro.html';}  


//--------------------------------------------------------------------------------------

































//----------------------FUNCTIONS














//set answer string
function setAnswerstring(){



var batside = battingside; 
var quid = questionid;  
var playerid = pid;
var qaid = questionid; 
var questionid =  qaid;
var correcta = testmode;
var givena = localStorage.givena;
var videoid = video;
var bside = battingside;


localStorage.numq = numQsToAsk;     
localStorage.playerid  = playerid;    
localStorage.questionid  = questionid;   
localStorage.correcta   = correcta;   
localStorage.videoid  = videoid;   
localStorage.batside  = battingside;   


answerstring=playerid+','+sdate+','+questionid+','+correcta+','+numQsToAsk+','+videoid+','+bside+','+testmode+',';

//load answerstring
if(localStorage.answerstring){
var tanstring = localStorage.answerstring;
localStorage.answerstring = tanstring+answerstring;
olanstring = tanstring+answerstring;
} else {
var tanstring = answerstring;
localStorage.answerstring = tanstring;
console.log(olanstring);
olanstring = tanstring+answerstring;
}
}














//----------ENABLE BUTTON
function enableQuestion(test_id) {
var alltags=document.all? document.all : document.getElementsByTagName("*")
for (i=0; i<alltags.length; i++) {
if (alltags[i].className == test_id) {
alltags[i].disabled = false;

}
}
}

//----------CHECKS IF STRING IS IN A STRING
function contains(arr, x) {
return arr.filter(function(elem) { return elem == x }).length > 0;
}



function answerArrayManager(){
//get the string

//get all the info from this answer


//append it to the string for this session

//save the session to localstorage

}








//----------SAVE A STRING TO LOCALSTORAGE
function saveSession () {
GetDate();
var data = {'tpid':mypid, 'tdate':d, qansd:0,};
localStorage.setItem('myData', JSON.stringify(data));
};


//----------LOAD A SESSION FROM LOCALSTORAGE
function loadSession  () {
var data = JSON.parse(localStorage.getItem('myData'));
var someVar = data.mypid; // gives you 'pid'
};




//CHECK IF OBJ IS CONTAINED IN A STRING
function contains(a, obj) {
var i = a.length;
while (i--) {
if (a[i] === obj) {
return true;
}
}
return false;
}



//CREATES A DATE STAMP
function GetDate(){
d = new Date(),
minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
ampm = d.getHours() >= 12 ? 'pm' : 'am',
months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
mytimestamp = days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+hours+':'+minutes+ampm;
return d;
}






//----------SAVE A TEST TO LOCALSTORAGE as TSDATA
function SaveTestSession () {
var tsdata = {'tpid':pid, 'tdate':d, qansd:anscount };
localStorage.setItem('tsData', JSON.stringify(tsdata));
};





//----------LOAD A SESSION FROM LOCALSTORAGE
function LoadTestSession  () {
var data = JSON.parse(localStorage.getItem('tsData'));
var tsdate   = data.tsdate ;
var qansd = data.qansd;    
var tsanscount  = data.anscount; // gives you 'bar'

};





//TEST AN ARRAY FOR EMPTY OR UNDEFINED
function CheckArray(qstoask){

if (qstoask === undefined || qstoask.length <1) {
return false;
}else{

return true;
}
}





//Pulls data from JSON File Results.json

function AJAX_JSON_Req(url, callback) {
AJAX_req = new XMLHttpRequest();
AJAX_req.open("GET", url, true);
AJAX_req.setRequestHeader("Content-type", "application/json");

AJAX_req.onreadystatechange = function() {
if(AJAX_req.readyState == 4 && AJAX_req.status == 200){
callback(JSON.parse(AJAX_req.responseText));
}
};

AJAX_req.send();
}



// Function to load data from JSON
console.log("LOAD DATA FROM JSON");     
AJAX_JSON_Req('results.json', function (callback) {
data = callback;
//check if we got something



});  


//Test Modes


function b() {   
testmode = 'quiz';          
document.getElementById('netstatus').innerHTML ='QUIZ MODE'; 
localStorage.testmode = testmode;    
} 


function a() {   
testmode = 'test';
document.getElementById('netstatus').innerHTML ='TEST MODE';
document.getElementById('tmodebuttons').innerHTML ='';
localStorage.testmode = testmode;  
}


//batting sides
function c() {   
battingside = 'left';          
localStorage.batside  = battingside  ;  
} 



function d() {   
battingside = 'right';
localStorage.batside  = battingside  ;  
}


function ClearVariables(){

baseQs = numQsToAsk = testsessions =  useranswers = questionsasked =  anscount = qstoask = qsanswered = 
pid =  qansd = test_id =  battingside = video = videofull = questionresults = bgcolor = answered  = questId = testmode =  alertMsg = correct = incorrect = '';


}




function isset ()
{
// http://kevin.vanzonneveld.net
// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
// +   improved by: FremyCompany
// +   improved by: Onno Marsman
// +   improved by: Rafał Kukawski
// *     example 1: isset( undefined, true);
// *     returns 1: false
// *     example 2: isset( 'Kevin van Zonneveld' );
// *     returns 2: true

var a = arguments,
l = a.length,
i = 0,
undef;

if (l === 0)
{
throw new Error('Empty isset');
}

while (i !== l)
{
if (a[i] === undef || a[i] === null)
{
return false;
}
i++;
}
return true;
}








