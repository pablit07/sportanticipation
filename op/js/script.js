//VARIABLES
//GLOBALS    
var baseQs = questions.length; //number of Q's
var numQsToAsk = baseQs * 2;   // haw many times to ask each q
var testsessions = []; //object holds test info during test
var useranswers = new Array(); // answers given by user
var questionsasked = new Array(); // number of q's asked so far
var anscount = new Array(); //number of answers given so far
var qstoask = new Array(); //q id's of q's to ask during test
var qsanswered = new Array(); //number of q's answered total
var answerstring;
var answertext;
var olanstring;
var pid;
var mypid;
var qansd;
var classId;
var battingside = "Left";
var video;
var videofull;
var questionresults = new Array();
var bgcolor;
var answered = 0 ;
var questId;
var testmode;
var alertMsg;
var correct = 0;
var incorrect= 0;
var videopath="";
var sdate;
var quid;








//----------------------FUNCTIONS



function ResetAll(){localStorage.clear(); document.location = document.location;}

function ResetPSession(){localStorage[pid, pid]=0; correct = incorrect = ''; document.location = 'syncro.html';}


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

function c() {   
battingside = 'left';          
localStorage.batside  = battingside  ;  
} 



function d() {   
battingside = 'right';
localStorage.batside  = battingside  ;  
}




//PRETEST: THIS LOADS FIRST
function PreTest(){
sdate = GetDate();

console.log("SYSTEM CHECKS");   
    
    
//check to see if we are online    
OnlineCheck(); 


console.log("PRETEST OK");

//setup the data framework for the test
SetupOfflineData(); 

console.log("QCOUNTS: "+baseQs+' '+numQsToAsk);

//Everything is good to go we must be offline at this point so show the login box     
document.getElementById('loginbox').innerHTML = '<div class="container"><h2>Enter your Player ID</h2><input type="text" id="playerID" name="playerID"/> <button class="btn btn-primary" onclick="GoLogin()">START</button></div> <BR> <br/><br/> <div id="tmodebuttons">You are In:<strong>'+testmode+' mode</strong><br/> <button class="btn btn-primary" onclick="a()">Switch to Test Mode</button> </div> <div id="tmode"></div>';     

    
    
bgcolor="default";
testmode="quiz";
localStorage.testmode = testmode;      
    
    
    
}//



//----------CHECK IF ONLINE
function OnlineCheck(){
if(navigator.onLine)
{
//We are online
console.log("ONLINE"); 
document.getElementById('netstatus').innerHTML = 'ONLINE ';

//UNCOMMENT B4 YOU DEPLOY   

//var srez = CheckSessionArray();    
//if (srez=true){document.location = 'http://sportanticipation.com/login.php';}    
//if (srez){document.location = 'http://sportanticipation.com/package/views/syncro.html';}    



document.getElementById('netstatus').innerHTML = 'ONLINE';  
return; //tempdev
}
else
{
    
//We are offline    
console.log("OFFLINE");
document.getElementById('netstatus').innerHTML = ' OFFLINE';

return;
}
}





//----------MAIN LOGIN
function GoLogin(){
console.log("GOLOGIN OK");
pid = document.getElementById("playerID").value;
mypid = pid;
//there is now a storage object that is called the pid
//mypid becomes the actual pid for this test session


localStorage.mypid = mypid; 
localStorage.setItem[pid,pid];   


document.getElementById('loginbox').innerHTML = '';
document.getElementById("plid").innerHTML = "Player ID: "+mypid;
console.log("User Input: "+mypid);
CheckSessionArray();
}//



//----------CHECK FOR SESSION ARRAY
function CheckSessionArray(){


if(localStorage.myData){   
console.log("SESSIONS EXIST");
CheckPlayerSession();
return true;
}

if(!localStorage.myData){
console.log("NO SESSIONS EXIST");
CheckPlayerSession();
return false;    

}
}//


//----------CHECK IF PLAYER SESSIONS EXIST
function CheckPlayerSession(){
if(localStorage[mypid, pid] == mypid){
console.log("PLAYER SESSION EXISTS");
//RESUME TEST SESSION  
StartOldTest(pid);  
}else if(localStorage[mypid, pid] != mypid){
console.log("NO PLAYER SESSION EXISTS");
localStorage[mypid, pid] = pid
//START A NEW TEST SESSION    
StartNewTest(pid);    
}
}


function SetupOfflineData(){
if(olanstring){localStorage.olanstring=olanstring;console.log(olanstring)}
localStorage.correct=0;
localStorage.incorrect=0;

var index=0;
var qcount = questions.length;
if (qstoask[index] != null){
for(j=0;j<qcount;j++) {    
qstoask.push(j);
qstoask.push(j);
}
}else{
for(j=0;j<qcount;j++) {    
qstoask.push(j);
qstoask.push(j);
}
}
}

//---------START A NEW TEST
function  StartNewTest(){
//document.getElementById("sessioninfo").innerHTML = "Player Session: "+pid;    
console.log("START NEW TEST!");
saveSession();      

BuildATest("new")  ;
}



//----------RESUME AN EXISTING TEST
function  StartOldTest(){
//document.getElementById("sessioninfo").innerHTML = "Player Session: "+pid;       
console.log("START OLD TEST!");
BuildATest("old")   
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




//--------------------------------------------QUIZ RENDER FUNCTIONS

function BuildATest(testtype){  
var qs2ask = new Array();
var qs2ask = qstoask;


// load questions to ask    
console.log(qs2ask);    
if(testtype == 'old' ){ 
//parse stored session    
var data = JSON.parse(localStorage.getItem('myData'));
var tdate = data.tdate;
var tpid = data.tpid;
qansd = data.qansd;   
console.log(data); 

LoadRndVideo(); 
ShowButtons(); 



document.getElementById("status").innerHTML = "Resuming test from: " +tdate+tpid+"|"+qansd;
document.getElementById("questionrow").innerHTML = '<div class="question"><h1>  ' + questions[ri] + ' <span id="result_' + ri + '"></h1><img src="../images/blank.gif" style="border:0" alt="" /></span></div>   '; 

//document.getElementById("bsidebutns").innerHTML ='<div="batsidebutns">Batting Side: <button onclick="c()">Left</button> <button  onclick="d()">Right</button></div>';    

} 
if(testtype == 'new'){
console.log('New Test Has Begun'); 

LoadRndVideo(); 
ShowButtons(); 

document.getElementById("questionrow").innerHTML = '<div class="question" ><h1>  ' + questions[ri] + ' <span id="result_' + ri + '"></h1><img src="../images/blank.gif" style="border:0" alt="" /></span></div>   ';     

}

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



//Get's the correct video for the batting side

function LoadRndVideo(){
// console.log(questions.length);   
var tempvid;
var max = questions.length;
ri  = Math.floor((Math.random() * max) );

console.log(qstoask);    

rs = qstoask.splice(ri, 1); // Splice out a random element using the ri var     
console.log(rs);      
console.log(qstoask);     
video = '1-'+videos[ri]+'-1';
SplitVideoName(video);
videofull = '1-'+ri+'-z';
console.log(video);     
console.log(videofull); 



document.getElementById("mainholder").innerHTML ='<div id="netstatus" style="pull-left;"></div><div class="page-header"><h2 style="text-align:center; ">SPORTANTICIPATION</h2></div><div class="pull-right" style="position:relative; margin-right:100px;"><span id="plid"></span><small><span id="status"></span></small><span id="sessioninfo"></span></div><div id="loginbox" style="max-width:100%; text-align:center;"></div><div id="plid"></div><div id="sessioninfo"></div><div id="message"></div><div class="inforow" id="inforow"></div><div class="container"><div class="videorow" id="videorow"></div></div><div id="status"></div><div id="questionrow"></div><div id="feedbackrow"></div><div id="answerrow" class="answerrow"><div class="btn-group"><div id="buttonrow" class="buttonrow"></div></div>';

document.getElementById("videorow").innerHTML ='<div id="a"><video style="max-width:98%;" id="video"  autoplay><source src="../videos/001/'+video+'.mp4" type="video/mp4"/></video></div>';

document.getElementById("questionrow").innerHTML = '<p class="question">  ' + questions[ri] + ' <span id="result_' + ri + '"><img src="../images/blank.gif" style="border:0" alt="" /></span></p>   ';



enableQuestion(classId);

}


//max should be the current numvber of q's left that need to be asked.

function GetRI (){


}







//SPLIT VIDEO NAME
function SplitVideoName(video){

tempvid = video.split('-');

console.log(tempvid);

return tempvid;

}



//----------SHOW BUTTONS
function ShowButtons(){

for(j=0;j<choices[ri].length;j++) {

document.getElementById('buttonrow').innerHTML += ('<input type="button" class="btn btn-primary"  name="answer_' + ri + '" value="' + choices[ri][j] + '" id="answer_' + ri + '_' + j + '" class="question_' + ri + '" onclick="submitAnswer(' + ri + ', this, \'question_' + ri + '\', \'label_' + ri + '_' + j + '\')" />'); 


} 
}




//---------SUBMIT ANSWER
function submitAnswer(questionId, obj, classId, labelId) {
var qaid;
var qobj;
var qclassId;
var qlabelId;
var givenans;

qaid = questionId;
qclassId = classId;    
qlabelId = labelId 
useranswers[questionId] = obj.value;

answered++;//increments answered


if(testmode =="quiz"){
document.getElementById("answerrow").innerHTML='<h2>You Answered: '+obj.value+'</h2>';



disableQuestion(classId);//disables buttons 

    
    showResult(questionId); //shows result

    //SETS ANSWER STRING
    setAnswerstring(quid);    
}

if(testmode =="test"){
document.getElementById("answerrow").innerHTML='<button type="button" onclick="contTest()">Continue</button> '; 

    //SETS ANSWER STRING FOR DB
    setAnswerstring(quid);
}


questionresults[questionId] = [questionId, obj, classId, labelId];

console.log(questionresults);
console.log( obj.value);   
console.log(qaid);
console.log(qclassId);
console.log(qlabelId);    

// Store the results
localStorage.answerarray = questionresults; 


localStorage.givena  = numQsToAsk;  

}





//TEST AN ARRAY FOR EMPTY OR UNDEFINED
function CheckArray(qstoask){

if (qstoask === undefined || qstoask.length <1) {
return false;
}else{

return true;
}
}








//----------PLAY THE FULL CLIP
function play_full(){ 
var vid = document.getElementById("a");
vid.innerHTML  = ' <video  autoplay controls><source src="../videos/001/' + videofull + '.mp4" type="video/mp4" />';}

//REPLAY THE CLIP
function play_re() 
{var vid = document.getElementById("a");
vid.innerHTML  = ' <video  autoplay controls><source src="../videos/001/' + video + '.mp4" type="video/mp4" />';}






//----------SHOW RESULT
function showResult(questionId) {




document.getElementById("questionrow").innerHTML = '';
//if correct
if(answers[questionId] == useranswers[questionId]) { 


answertext = choices[ri][questionId];
document.getElementById("feedbackrow").innerHTML = '<div class="container" style="text-align:center;"><div class="col-med-4" style="color:green;"><h1>CORRECT!</h1></div><div class="col-med-4"><img src="../images/correct.gif" style="border:0" alt="Correct!"/> <button type="button" onclick="play_re()">Replay</button> <button type="button" onclick="play_full()">Watch Full Pitch</button><button type="button" onclick="contTest()">Continue</button> <img src="../images/correct.gif" style="border:0" alt="Correct!"/>  <h2></div> </div> ' ;
correct++;
localStorage.correct++ ;
disableQuestion(classId);//disables buttons

} else {




console.log(answers[questionId]);
answertext = choices[ri][questionId];
document.getElementById("feedbackrow").innerHTML = '<div class="container" style="text-align:center;"><div class="col-med-4" style="color:red;"><h2>SORRY INCORRECT!</h2><img src="../images/incorrect.gif" style="border:0" alt="Incorrect!" /> <button type="button" onclick="play_re()">Replay</button><button type="button" onclick="play_full()">Watch Full Pitch</button><button type="button" onclick="contTest()">Continue</button> <img src="../images/incorrect.gif" style="border:0" alt="Incorrect!" /><h2>The Correct Answer Was: '+answertext+'</h2></div> </div>';
incorrect++
localStorage.incorrect++;
disableQuestion(classId);//disables buttons

}


}





function Checker(){


if(answered == numQsToAsk ){

//document.getElementById("answerrow").innerHTML=''; 
EndTest();  

}    

}








function showScore() {
//questionCount = numQsToAsk;

for(i=0;i<answered;i++) {
if(useranswers[i] == answers[i]){


}else{



}}
var ansx=answered
tcorrect = correct ;

var pc = Math.round(( tcorrect  / ansx) * 100);

document.getElementById("reportdiv").innerHTML = "<div> <h2>You scored " + correct  + " out of " + ansx + "</h2> </div>";

document.getElementById("reportdiv").innerHTML  += "<div> <h2>You correctly answered " + pc + "% of the questions! </h2> </div>";

if(pc == 100)
alertMsg += response[0];
else if(pc >= 90)
alertMsg += response[1];
else if(pc >= 70)
alertMsg += response[2];
else if(pc > 50)
alertMsg += response[3];
else if(pc >= 40)
alertMsg += response[4];
else if(pc >= 20)
alertMsg += response[5];
else if(pc >= 10)
alertMsg += response[6];
else
alertMsg += response[7];
if(pc < 100) {




} 
}


function contTest(){
Checker();  
document.getElementById('answerrow').innerHTML='';
//document.getElementById('buttonrow').innerHTML='';
LoadRndVideo(); 
ShowButtons();
document.getElementById("feedbackrow").innerHTML = '';

document.getElementById("questionrow").innerHTML = '<p class="question">  ' + questions[ri] + ' <span id="result_' + ri + '"><img src="../images/blank.gif" style="border:0" alt="" /></span></p>   '; 



}





function EndTest(){

console.log("TEST OVER"); 
document.writeln('<div id="header"> <div class="container"><a href="#" class="btn btn-primary" onclick=" ResetPSession()">Finish</a><div id="reportdiv">TEST COMPLETE</div></div></div><div style="text-align:center;" id="questionrow"></div><div style="text-align:center;" id="answerrow"></div><div style="text-align:center;" id="feedbackrow"></div><div id="buttonrow" style="text-align:center;"></div>');


console.log(questionresults);
showScore();

}


function ClearVariables(){

baseQs = numQsToAsk = testsessions =  useranswers = questionsasked =  anscount = qstoask = qsanswered = 
pid =  qansd = classId =  battingside = video = videofull = questionresults = bgcolor = answered  = questId = testmode =  alertMsg = correct = incorrect = '';


}






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












//----------DISABLEBUTTONS
function disableQuestion(classId) {
var alltags=document.all? document.all : document.getElementsByTagName("*")
for (i=0; i<alltags.length; i++) {
if (alltags[i].className == classId) {
alltags[i].disabled = true;
}
}
}


//----------ENABLE BUTTON
function enableQuestion(classId) {
var alltags=document.all? document.all : document.getElementsByTagName("*")
for (i=0; i<alltags.length; i++) {
if (alltags[i].className == classId) {
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