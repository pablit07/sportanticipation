/* SportsTest by @ENOXH */

//DEFINE GLOBALS
var useranswers = new Array();
var questionsasked = new Array();
var questionresults = new Array();
var answered ;
var battingside="Left";
var  sw;
var videofull;
var video;
var videos = "../videos/001/";
var testInProg;
var classId;
var questionCount;
var answers;
var bgcolor;
var playername ="Pete Rose";
var d;




bgcolor="default";



if(!d){
d = new Date(),
minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
ampm = d.getHours() >= 12 ? 'pm' : 'am',
months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
mytimestamp = days[d.getDay()]+' '+months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+hours+':'+minutes+ampm;
}

//START EVERYTHING
function preTest(){

 
    
document.writeln('<input type="button" value="TRAIN"/><input type="button" value="TEST"/><br>');    
    
    
document.writeln('Enter your Player ID: <input type="text"/><input type="button" value="Begin"/>');




//renderTest();  



}


//START EVERYTHING

//----------START TEST
function startTest(){


if(localStorage.answered >= questions.length){
showScore();
clearStorage();
answered=0;
preTest();
}

//if you have not answered any questions already
if(!localStorage.answered){
localStorage.answered = 0
answered =0;
localStorage.correct = 0;
preTest();

} else {

renderTest();

}
}    







//--------------RENDER THE TEST
function renderTest() {

answered =  localStorage.answered; 

//SET LOCAL VARS
var min = 0;
var max = questions.length;
var ri  = Math.floor(Math.random() * (max - min )) + min;

//CHECK FOR BATTING SIDE LEFT
if(battingside == "Left"){
video = '1-'+videos[ri]+'a'
videofull = '1-'+videos[ri]+'b'
}

//CHECK FOR BATTING SIDE RIDE
if(battingside == "Right"){
video = '1-'+videos[ri]+'c';
videofull = '1-'+videos[ri]+'d';
}

//CHECK FOR BATTING SIDE SWITCH
if(battingside == "Switch"){var swt = GetSw();

if (swt == 0){sw="-"+videos[ri]+"a";}

if(swt == 1){ sw="-"+videos[ri]+"c";}

video ='1'+sw;
}    

console.log(localStorage.correct+answered);

document.write('<div id="masterdiv">');    

document.writeln('<div id="message"></div><h3>Player: '+playername+' Batting Side: '+battingside+' Started: '+mytimestamp+'</h3><br>  ');

//video
document.writeln('<div><hr>  <div id="a"><video  autoplay><source src="videos/' + video + '.mp4" type="video/mp4" /></video></div>'); 

document.writeln('<p class="question">  ' + questions[ri] + ' <span id="result_' + ri + '"><img src="blank.gif" style="border:0" alt="" /></span></p>');


document.writeln('<p> </p><p style="display:none"><img src="correct.gif" style="border:0" alt="Correct!"  /><img src="incorrect.gif" style="border:0" alt="Incorrect!" /></p>');

document.getElementById('message').innerHTML = "";     


for(j=0;j<choices[ri].length;j++) {

document.write('<input type="button" name="answer_' + ri + '" value="' + choices[ri][j] + '" id="answer_' + ri + '_' + j + '" class="question_' + ri + '" onclick="submitAnswer(' + ri + ', this, \'question_' + ri + '\', \'label_' + ri + '_' + j + '\')" /><label id="label_' + ri + '_' + j + '" for="answer_' + ri + '_' + j + '"> </label>');
} 


document.write('</div>');        


}







//---------SUBMIT ANSWER
function submitAnswer(questionId, obj, classId, labelId) {

useranswers[questionId] = obj.value;
document.getElementById(labelId).style.fontWeight = "bold";
disableQuestion(classId);//disables buttons
showResult(questionId); //shows result
answered=localStorage.answered++;//increments answered
questionresults[questionId] = [questionId, obj, classId, labelId];
document.getElementById('message').innerHTML =   questionresults[questionId];

// Store the results
localStorage.answerarray = questionresults;  
}



//----------CLEAR  LOCAL STORAGE
function clearStorage(){
localStorage.removeItem("answerarray");   
localStorage.removeItem("answered");
localStorage.removeItem("correct");    
localStorage.removeItem("incorrect");
localStorage.removeItem("answers");
unset(d);
localStorage.correct = 0;
localStorage.answered = 0;

preTest();
}



//----------SWITCH
function GetSw(){
var min = 0;
var max = 2;
var swt =  Math.floor(Math.random() * (min - max ))+ max ;
return swt;
}


//----------PLAY THE FULL CLIP
function play_full(){ 
var vid = document.getElementById("a");
vid.innerHTML  = ' <video  autoplay controls><source src="videos/' + videofull + '.mp4" type="video/mp4" />';}

//REPLAY THE CLIP
function play_re() 
{var vid = document.getElementById("a");
vid.innerHTML  = ' <video  autoplay controls><source src="videos/' + video + '.mp4" type="video/mp4" />';}

//SELECT MENU FOR BATTING SIDE
function dataCap(){
var dataCap = document.getElementById("selected2").value;
document.getElementById('show').innerHTML = "This is your selection:" + dataCap;
}


//----------RESET TEST
function resetQuiz(showConfirm) {
if(showConfirm)
if(!confirm("Are you sure you want to reset your answers and start from the beginning?"))

clearStorage();

}




//----------SHOW RESULT
function showResult(questionId) {

//if correct
if(answers[questionId] == useranswers[questionId]) { 

localStorage.correct++;

document.getElementById('result_' + questionId).innerHTML = '<img src="correct.gif" style="border:0" alt="Correct!"/> <button type="button" onclick="play_re()">Replay</button> <button type="button" onclick="play_full()">Watch Full Pitch</button><button type="button" onclick="contTest()">Continue</button> <img src="correct.gif" style="border:0" alt="Correct!"/>  ' ;
} else {


//incorrect++;

localStorage.incorrect++;  

document.getElementById('result_' + questionId).innerHTML = '<img src="incorrect.gif" style="border:0" alt="Incorrect!" /> <button type="button" onclick="play_re()">Replay</button><button type="button" onclick="play_full()">Watch Full Pitch</button><button type="button" onclick="contTest()">Continue</button> <img src="incorrect.gif" style="border:0" alt="Incorrect!" />  ';
}
}


//----------CONTINUE TEST
function contTest(){

document.location = document.location;
renderQuiz();
enableQuestion(classId); 


}








function showScore() {

questionCount = answers.length;

for(i=0;i<questionCount;i++) {
if(useranswers[i] == answers[i]){

localStorage.correct++ ;

}else{


localStorage.incorrect++;


}}



var pc = Math.round((localStorage.correct  / questionCount) * 100);
alertMsg = "You scored " + localStorage.correct  + " out of " + questionCount + "\n\n";
alertMsg += "You correctly answered " + pc + "% of the questions! \n\n";
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

if(confirm(alertMsg))

resetQuiz(false); 

else
resetQuiz(false); 
} else {
alert(alertMsg);
}
}


function disableQuestion(classId) {
var alltags=document.all? document.all : document.getElementsByTagName("*")
for (i=0; i<alltags.length; i++) {
if (alltags[i].className == classId) {
alltags[i].disabled = true;
}
}
}



function enableQuestion(classId) {
var alltags=document.all? document.all : document.getElementsByTagName("*")
for (i=0; i<alltags.length; i++) {
if (alltags[i].className == classId) {
alltags[i].disabled = false;

}
}
}


function contains(arr, x) {
return arr.filter(function(elem) { return elem == x }).length > 0;
}
