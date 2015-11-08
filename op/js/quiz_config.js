
var questions = new Array();
var choices = new Array();
var answers = new Array();
var response = new Array();
var videos = new Array();
var pitchtype;

// To add more questions, just follow the format below.

//Q1
questions[0] = "What kind of pitch is this? 1";
choices[0] = new Array();
choices[0][0] = "Fastball Strike";
choices[0][1] = "Curve Ball Strike";
choices[0][2] = "Change Up Strike";
choices[0][3] = "Fastball Ball";
choices[0][4] = "Curve Ball Ball";
choices[0][5] = "Change Up Ball";
//answers[0] = new Array();
answers[0] = choices[0][0];

videos[0] = new Array();
videos[0] = videos[0][0]="0";
pitchtype = "Strike";

//Q2-------------------
questions[1] = "What kind of pitch is this? 2";
choices[1] = new Array();
choices[1][0] = "Fastball Strike";
choices[1][1] = "Curve Ball Strike";
choices[1][2] = "Change Up Strike";
choices[1][3] = "Fastball Ball";
choices[1][4] = "Curve Ball Ball";
choices[1][5] = "Change Up Ball";
//answers[1] = new Array();
answers[1] = choices[1][1];

videos[1] = new Array();
videos[1] = videos[1][0]="1";

/*

//Q3--------------------------------
questions[2] = "What kind of pitch is this? 3";
choices[2] = new Array();
choices[2][0] = "Fastball Strike";
choices[2][1] = "Curve Ball Strike";
choices[2][2] = "Change Up Strike";
choices[2][3] = "Fastball Ball";
choices[2][4] = "Curve Ball Ball";
choices[2][5] = "Change Up Ball";
//answers[2] = new Array();
answers[2] = choices[2][2];

videos[2] = new Array();
videos[2] = videos[2][0]="2";


//Q4-----------------------------
questions[3] = "What kind of pitch is this? 4";
choices[3] = new Array();
choices[3][0] = "Fastball Strike";
choices[3][1] = "Curve Ball Strike";
choices[3][2] = "Change Up Strike";
choices[3][3] = "Fastball Ball";
choices[3][4] = "Curve Ball Ball";
choices[3][5] = "Change Up Ball";
//answers[3] = new Array();
answers[3] = choices[3][3];

videos[3] = new Array();
videos[3] = videos[3][0]="3";


*/




//--------------------------------------------------

// response for getting 100%
response[0] = "Excellent, top marks!";
// response for getting 90% or more
response[1] = "Excellent, try again to get 100%!"
// response for getting 70% or more
response[2] = "Well done, that is a good score, can you do better?";
// response for getting over 50%
response[3] = "Nice one, you got more than half of the questions right, can you do better?";
// response for getting 40% or more
response[4] = "You got some questions right, you can do better!";
// response for getting 20% or more
response[5] = "You didn't do too well, why not try again!?";
// response for getting 10% or more
response[6] = "That was pretty poor!  Try again to improve!";
// response for getting 9% or less
response[7] = "Oh dear, I think you need to go back to school (or try again)!";