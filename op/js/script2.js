// Sportanticipation Test


//define vars
var startpoint;
var count;
var sdate;
var bgcolor;
var testmode;
var testtype;
var pid;
var getuid;
var battingside;
var getbatside;
var tid;
var sessioncount;
var datestamp;
var current_question;
var test_question_order;
var test_question_count;
var correct;
var incorrect;
var enableQuestion;
var test_id;
var buttonid;
var chk;
var button;

//default test mode
testmode = "quiz";
//get the date
datestamp = GetDate();

var videoUrl = window.location.hostname.indexOf('elasticbeanstalk') != -1
    ? 'https://s3.amazonaws.com/sportanticipation.videos/'
    : '../videos/001/'

//Test Modes

//-----------------------------//
//-----------------------------//
//-----------------------------//
function b() {

    testmode = 'quiz';
    document.getElementById('netstatus').innerHTML = 'QUIZ MODE';
    localStorage.testmode = testmode;
}

function a() {

    testmode = 'test';
    document.getElementById('netstatus').innerHTML = 'TEST MODE';
    document.getElementById('tmodebuttons').innerHTML = '';
    localStorage.testmode = testmode;
    //console.log(testmode);
}


//batting sides

function c() {

    battingside = 'left';
    localStorage.batside = battingside;
}


function d() {

    battingside = 'right';
    localStorage.batside = battingside;
}


//-----------------------------//
//-----------------------------//
//-----------------------------//
//CREATES A DATE STAMP

function GetDate() {

    var d = new Date(),
        minutes = d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes(),
        hours = d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours(),
        ampm = d.getHours() >= 12 ? 'pm' : 'am',
        months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    mytimestamp = days[d.getDay()] + ' ' + months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear() + ' ' + hours + ':' + minutes + ampm;

    return d;
}


//-----------------------------//
//-----------START-------------//
//-----------------------------//
//----------PRETEST-----------//
// This Loads First //

function PreTest() {

    startpoint = 2, count = 1;


//default bg color
    bgcolor = "default";


    battingside = CheckForBatside();

//for future dev defines test id   
    tid = CheckForTestID();
//see if session exists    
    sessionstate = CheckForSession;
    SetupOfflineData();


//if it does
    if (isset(pid)) {
//start the existing test up    
        StartOldTest()

    } else {
//otherwise start a new test
        pid = localStorage.pid;
        StartNewTest();
    }
}

//-----------------------------//
//------------START A NEW TEST-----------------//
//-----------------------------//


function StartNewTest() {

//NEW TEST
    sessioncount = 1;
//SET THE DATA ARRAY FOR LOCALSTORAGE    
    SetupOfflineData();
    correct = 0;
    incorrect = 0;

    //console.log("START NEW TEST!");


    BuildATest("new");
}


//-----------------------------//
//------------RESUME AN EXISTING TEST-----------------//
//-----------------------------//

//----------
function StartOldTest() {

//GET THE DATA ARRAY FOR LOCALSTORAGE        
    pid = localStorage.pid;
    sdate = localStorage.sessiondate;
    sc = localStorage.savesessionid;
    test_id = localStorage.test_id;
    test_created = localStorage.test_created;
    test_description = localStorage.test_description;
    test_focus = localStorage.test_focus;
    test_question_count = localStorage.test_question_count;
    test_question_order = localStorage.test_question_order;
    test_team = localStorage.test_team;
    test_title = localStorage.test_title;
    correct = localStorage.correct;
    incorrect = localStorage.incorrect;
//GetOfflineData();   

    //console.log("RESUME EXISTING TEST!");
    IncreaseSessionCount(sessioncount);
    //console.log('Session Count:' + sessioncount);

    BuildATest("old");
}


function GoLogin() {
    // hack for ios
    var videotag = $('video')[0];
    videotag.load();
    videotag.play();
    
    $('#start').hide();
    PreTest();

}


//-----------------------------//
//--------------SetupOfflineData---------------//
//-----------------------------//

function SetupOfflineData() {

//debug
    //console.log('Test ID:' + tid);

    //console.log('madeit');

    chk = current_question + 1;

    test_id = data[0].test_id;
    test_team = data[0].test_team;
    test_title = data[0].test_title;
    test_created = data[0].test_created;
    test_description = data[0].test_description;
    test_focus = data[0].test_focus;
    test_question_count = data[0].test_question_count;
    test_question_id = chk;
    test_question_question = data[0].test_question_question;
    localStorage.sessiondate = sdate;
    localStorage.test_title = test_title;
    localStorage.test_id = test_id;
    localStorage.test_team = test_team;
    localStorage.test_title = test_title;
    localStorage.test_created = test_created;
    localStorage.test_description = test_description;
    localStorage.test_focus = test_focus;
    localStorage.test_question_count = test_question_count;
    localStorage.test_question_order = test_question_order;
    localStorage.answers_correct = correct;
    localStorage.answers_incorrect = incorrect;
    localStorage.test_question_id = chk;
    localStorage.test_question_count = test_question_count;
    //console.log('TCC' + test_question_count);

}


//-----------------------------//
//------------BuildATest-----------------//
//-----------------------------//
function BuildATest(testtype) {
    var tempcount = test_question_count;
    var startpoint = 2;

//----------------------------------RESUME
    if (testtype == 'old') {
        //console.log('Old Test');

//adds 2 to the object count which is where the questions start 
        current_question = 1;

        AJAX_JSON_Req('results.json', function (callback) {
//data holds the test data received from JSON
            data = callback;
//check if we got something
            //console.log(data);

            //console.log('New Test Has Begun');
            clearBox('holder');
            clearBox('tmodebuttons');

//Show the buttons
            ShowButtons();


//get batting side
            //console.log(battingside);


            if (data[2].question_battingside == 0) {
                batcomp = 'left';
            }
            if (data[2].question_battingside == 1) {
                batcomp = 'right';
            }

            if (data[2].question_battingside == batcomp) {

//populate html    
                document.getElementById("questionrow").innerHTML = '<div class="question" ><h1>' + data[2].question_question + '</h1></div>   ';
//Load the video
                LoadRndVideo();
            }
        });
    }


    if (testtype == 'new') {
        //console.log('Start New Test');

//adds 2 to the object count which is where the questions start 
        current_question = 1;

        AJAX_JSON_Req('results.json', function (callback) {
//data holds the test data received from JSON
            data = callback;
//check if we got something
            //console.log(data);

            //console.log('New Test Has Begun');
            clearBox('holder');
            clearBox('tmodebuttons');

//get batting side
            //console.log(battingside);

//populate html    
            document.getElementById("questionrow").innerHTML = '<div class="question" ><h1>' + data[2].question_question + '</h1></div>   ';
//Load the video
            LoadRndVideo();

            ShowButtons();
        });

    } else {
        //console.log('ERROR testype missmatch!');
    }


}


//-----------------------------//
//---------------SHOW BUTTONS--------------//
//-----------------------------//

//----------
function ShowButtons() {
        ri = 0;
//get answers
        var answer_array = data[1].answer_answer;


//create answerarray    
        answerarray = answer_array.split(',');
        //console.log(answerarray);


        for (j = 0; j < answerarray.length; j++) {

            document.getElementById('buttonrow').innerHTML += ('<input type="button" class="btn btn-warning" style="margin-right: 5px; margin-left: 5px;" name="answer_' + ri + '" value="' + answerarray[ri] + '" id="answer_' + ri + '_' + j + '" class="question_' + ri + '" onclick="submitAnswer(' + ri + ', this, \'question_' + ri + '\', \'label_' + ri + '_' + j + '\')" />');
            ri++;

        }
}


//-----------------------------//
//--------------LOAD VIDEO---------------//
//-----------------------------//

//

function LoadRndVideo() {
    var question_index = (startpoint + current_question) - 1;

    video = data[question_index].question_video;

    videofull = data[question_index].question_alt_video;
    //console.log(video);
    //console.log(videofull);

    document.getElementById("questionrow").innerHTML = '<div id="question"><p class="question">  ' + data[question_index].question_question + ' <span id="result_' + question_index + '"><img src="../images/blank.gif" style="border:0" alt="" /></span></p>  </div> ';

    var videotag = $('video')[0];

    videotag.innerHTML = '<source src="' + videoUrl + video + '" type="video/mp4"/>';
    videotag.removeEventListener('ended', afterReplay, false);
    videotag.load();
    videotag.play();

    document.getElementById("answerrow").innerHTML = '<div class="btn-group"><div id="buttonrow" class="buttonrow"></div></div>';

    enableQuestion(test_id);

}


//-----------------------------//
//--------------SUBMIT ANSWER---------------//
//-----------------------------//


//---------
function submitAnswer(buttonid, question, x, y) {

    //console.log('Submitted:' + buttonid);
    //console.log('Submitted:' + question);
    //console.log('qid:' + current_question);
    //console.log('Submitted:' + y);

    ca = current_question + 1;
//check the answer
    cas = data[ca].answer_answer;


    if (testmode == "test") {

        localStorage.answered = answerarray[buttonid];
        chk = current_question + 1;
        checkAnswer(buttonid, true);

        SaveAQuestion();

        disableQuestion(test_id);//disables buttons
        clearBox("questionrow");
        contTest();

    } else if (testmode == "quiz") {
        document.getElementById("feedbackrow").innerHTML = '<h2>Your Answer: <span style="color: #fff">' + answerarray[buttonid] + '</span></h2>';
        $('#feedbackModal .modal-body > h2').remove();
        localStorage.test_question_answered = buttonid;// answerarray[buttonid];
        disableQuestion(test_id);//disables buttons
        SaveAQuestion();
        showResult(buttonid); //shows result
        $('#feedbackModal').modal()
        $('#Continue').focus();
    }

}//END


//-----------------------------//
//-------------CONTINUE THE TEST----------------//
//-----------------------------//


function contTest() {

    //console.log('saved');

    test_question_count = data[0].test_question_count;
    //console.log('Current Question:' + current_question);
    //console.log('Question Count:' + test_question_count);

    if (current_question >= test_question_count) {
        EndTest();
    } else {

        current_question++;

        document.getElementById('answerrow').innerHTML = '';
        document.getElementById('buttonrow').innerHTML = '';
        LoadRndVideo();
        ShowButtons();
        document.getElementById("feedbackrow").innerHTML = '';

        document.getElementById("questionrow").innerHTML = '<p class="question">   <span id="result_' + ri + '"><img src="../images/blank.gif" style="border:0" alt="" /></span></p>   ';

    }
}


//-----------------------------//
//-------------TEST IS OVER----------------//
//-----------------------------//


function EndTest() {

    //console.log("TEST OVER");
    SaveATest();
    var div = document.createElement('div');

    div.id = "container";

    clearBox("answerrow");
    clearBox("answers");
    clearBox("questionrow");
    clearBox("buttonrow");

    clearBox("feedbackrow");

    document.getElementById("holder").innerHTML = ('<a href=" ../../account.php"  class="btn btn-primary" >Finish</a><div id="reportdiv">TEST COMPLETE</div><div style="text-align:center;" id="answerrow"></div><div style="text-align:center;" id="feedbackrow"></div><div id="buttonrow" style="text-align:center;"></div>');


//console.log(questionresults);
    showScore();


}


//-----------------------------//
//--------------SHOW SCORE---------------//
//-----------------------------//


function showScore() {
    ls = localStorage.sessionCount;
    ls++;
    localStorage.sessionCount = ls;
    var ansx = test_question_count;
    tcorrect = correct;
//localStorage.correct=0;    
//localStorage.incorrect=0;    
    var pc = Math.round(( tcorrect / ansx) * 100);

    $('#scoreModal .modal-body').html("<div > <h2>Score: " + correct + " out of " + ansx + "</h2> " +
        "<div id='feedbackrow'> <h2 style='color: #fff'>Percent correct: " + pc + "%</h2> </div></div><div id='mainholder'></div>");
    localStorage.correct = correct;

    tcorrect = ansx = pc = '';
    localStorage.correct = localStorage.incorrect = 0;

    $('video').hide();

    setTimeout(function() { $('#scoreModal').modal(); }, 500);
}

function checkAnswer(button, isTest) {
    xc = data[chk].question_test_correct;
    ans = button + 1;

//if correct
    if (xc == ans) {
        localStorage.answered = answerarray[buttonid];

        if (!isTest) {
            $('#feedbackModal .modal-body').prepend('<h2>Correct</h2>');
        }

        correct++;
        localStorage.correct++;

        if (!isTest) {
            disableQuestion(test_id);//disables buttons
            clearBox("questionrow");
        }

    } else {

        ra = xc - 1;
        answertext = answerarray[ra];
        localStorage.test_question_answer_correct = answertext;
//answertext = choices[ri][questionId];

        if (!isTest) {
            document.getElementById("feedbackrow").innerHTML += '<h2>Correct Answer: <span style="color: #fff">' + answertext + '</span></h2>';
            $("#feedbackModal .modal-body").prepend('<h2>Incorrect</h2>');
        }

        incorrect++;
        localStorage.incorrect++;

        if (!isTest) {
            disableQuestion(test_id);//disables buttons
        }

    }
}

//-----------------------------//
//------------SHOW RESULT OF A QUESTION-----------------//
//-----------------------------//


//----------SHOW RESULT

function showResult(button) {

    chk = current_question + 1;

//check the answer
//console.log(data[chk].question_test_correct);


    document.getElementById("questionrow").innerHTML = '';


    checkAnswer(button, testmode == "test");

    clearBox("questionrow");
}


//-----------------------------//
//--------------DISABLES THE BUTTONS BETWEEN ANSWERS---------------//
//-----------------------------//

function disableQuestion(test_id) {
    var alltags = document.all ? document.all : document.getElementsByTagName("*");
    for (i = 0; i < alltags.length; i++) {
        if (alltags[i].className == test_id) {
            alltags[i].disabled = true;


        }
    }
}


//-----------------------------//
//-------------LOADS FULL VIDEO----------------//
//-----------------------------//

function afterReplay() {
    $('#answerrow').fadeIn();
    $('#feedbackModal').modal();
    $('#Continue').focus();
};


//----------PLAY THE FULL CLIP
function play_full() {
    var videotag = $('video')[0];
    videotag.innerHTML = '<source src="' + videoUrl + videofull + '" type="video/mp4" />';
    videotag.addEventListener('ended', afterReplay, false);
    $('#answerrow').fadeOut();
    videotag.load();
    videotag.play();
}

//REPLAY THE CLIP
function play_re() {
    var question_index = (startpoint + current_question) - 1;

    video = data[question_index].question_video;

    videofull = data[question_index].question_alt_video;
    //console.log(video);
    //console.log(videofull);
    var videotag = $('video')[0];
    videotag.innerHTML = '<source src="' + videoUrl + video + '" type="video/mp4" />';
    videotag.addEventListener('ended', afterReplay, false);
    $('#answerrow').fadeOut();
    videotag.load();
    videotag.play();
}


function enableQuestion(test_id) {
    var alltags = document.all ? document.all : document.getElementsByTagName("*")
    for (i = 0; i < alltags.length; i++) {
        if (alltags[i].className == test_id) {
            alltags[i].disabled = false;

        }
    }
}

//-----------------------------//
//-------------SAVES THE RESULTS TO LOCALSTORAGE----------------//
//-----------------------------//


function SaveATest() {

//general test information
//test_id = data[0].test_id; 
    test_created = datestamp;
    test_description = data[0].test_description;
    test_focus = data[0].test_focus;
    test_question_count = data[0].test_question_count;
    test_question_order = data[0].test_question_order;
    test_team = data[0].test_team;
    test_title = data[0].test_title;
    correct = localStorage.answers_correct;
    incorrect = localStorage.answers_incorrect;
    //console.log (localStorage.sessiondate = sdate);
    //console.log (localStorage.test_id = test_id);
    //console.log (localStorage.test_created = test_created);
    //console.log (localStorage.test_description = test_description);
    //console.log (localStorage.test_focus = test_focus);
    localStorage.test_question_count = test_question_count;
    //console.log (localStorage.test_question_order = test_question_order);
    //console.log (localStorage.test_team = test_team);
    //console.log (localStorage.test_title = test_title);
    //console.log (localStorage.answers_correct = correct);
    //console.log (localStorage.answers_incorrect = incorrect);
    //console.log('MADE IT');
    //console.log ('Sdate' + localStorage.sessiondate);
    //console.log ('test_id' + localStorage.test_id);
    UpdateTest();
}


//-----------------------------//
//-------------UpdateTest----------------//
//-----------------------------//
function UpdateTest() {
    //console.log('MADE IT-2');
    var xx = localStorage.savesessionid;

    sdate = localStorage.sessiondate;
    test_id = localStorage.test_id;
    test_created = localStorage.test_created;
    test_description = localStorage.test_description;
    test_focus = localStorage.test_focus;
    test_question_count = localStorage.test_question_count;
    test_question_order = localStorage.test_question_order;
    test_team = localStorage.test_team;
    test_title = localStorage.test_title;
    correct = localStorage.answers_correct;
    incorrect = localStorage.answers_incorrect;
    test_question_id = localStorage.test_question_id - 1;
    test_question_answered = localStorage.test_question_answered;
    test_question_answer_correct = localStorage.test_question_answer_correct;


    $.ajax({
        method: "POST",
        url: "syncrotest.php",
        data: {
            test_id: test_id,
            total_answered: current_question,
            correct: correct,
            pid: pid,
            test_created: test_created,
            test_team: test_team,
            test_title: test_title,
            sdate: sdate,
            is_test_mode: testmode === 'test' ? 1 : 0
        }
    });

}


//-----------------------------//
//--------------SaveAQuestion---------------//
//-----------------------------//

function SaveAQuestion() {

    chk = current_question + 1;

    test_id = data[0].test_id;
    test_team = data[0].test_team;
    test_title = data[0].test_title;
    test_created = datestamp;
    test_description = data[0].test_description;
    test_focus = data[0].test_focus;
    test_question_count = data[0].test_question_count;
    test_question_id = chk;

    localStorage.sessiondate = sdate;
    localStorage.test_title = test_title;
    localStorage.test_id = test_id;
    localStorage.test_team = test_team;
    localStorage.test_title = test_title;
    localStorage.test_created = test_created;
    localStorage.test_description = test_description;
    localStorage.test_focus = test_focus;
    localStorage.test_question_count = test_question_count;
    localStorage.test_question_order = test_question_order;
    localStorage.answers_correct = correct;
    localStorage.answers_incorrect = incorrect;
    localStorage.test_question_id = chk;

    UpdateQuestion();
}


//-----------------------------//
//-------------UpdateQuestion----------------//
//-----------------------------//
function UpdateQuestion() {

    var xx = localStorage.savesessionid;

    sdate = localStorage.sessiondate;
    test_id = localStorage.test_id;
    test_created = localStorage.test_created;
    test_description = localStorage.test_description;
    test_focus = localStorage.test_focus;
    test_question_count = localStorage.test_question_count;
    test_question_order = localStorage.test_question_order;
    test_team = localStorage.test_team;
    test_title = localStorage.test_title;
    correct = localStorage.answers_correct;
    incorrect = localStorage.answers_incorrect;
    test_question_id = localStorage.test_question_id - 1;
    test_question_answered = localStorage.test_question_answered;
    test_question_answer_correct = localStorage.test_question_answer_correct;


    $.ajax({
        method: "POST",
        url: "syncroquestion.php",
        data: {
            sc: xx,
            pid: pid,
            sdate: datestamp,
            test_id: test_id,
            test_created: test_created,
            test_description: test_description,
            test_focus: test_focus,
            test_question_count: test_question_count,
            test_question_order: test_question_order,
            test_team: test_team,
            test_title: test_title,
            correct: correct,
            incorrect: incorrect,
            test_question_id: test_question_id,
            test_question_answered: test_question_answered,
            test_question_answer_correct: test_question_answer_correct,
            is_test_mode: testmode === 'test' ? 1 : 0
        }
    });
}


//-----------------------------//
//-------------CHECKS IF STRING IS IN A STRING----------------//
//-----------------------------//

function contains(arr, x) {
    return arr.filter(function (elem) {
            return elem == x
        }).length > 0;
}


function contains(a, obj) {
    var i = a.length;
    while (i--) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

//-----------------------------//
//-------------CheckForSession----------------//
//-----------------------------//
function CheckForSession() {
    if (isset(localStorage.sessionCount)) {
        testtype = 'old';
        sessioncount = localStorage.sessionCount;
//if a test session already exists get the info to use as a starting point    
        if (sessioncount > 1) {
            GetSessionCounts();
        }
        testtype = 'old';
        return sessioncount;
    } else {
        testtype = 'new';
        sessioncount = 1;
        localStorage.sessionCount = sessioncount;
        return false;
    }
}

//-----------------------------//
//-------------CheckForBatside----------------//
//-----------------------------//
function CheckForBatside() {
    if (isset(localStorage.batside)) {
        battingside = localStorage.batside;
        return battingside;
    } else {
        return false;
    }

}

//-----------------------------//
//-------------CheckForTestID----------------//
//-----------------------------//
function CheckForTestID() {
//testid always 1 in prototype this is for future development
    if (isset(localStorage.tid)) {
        tid = localStorage.tid;
        return tid;
    } else {
        localStorage.tid = 1;
        return false;
    }
    ;

}

//-----------------------------//
//-------------IncreaseSessionCount----------------//
//-----------------------------//
function IncreaseSessionCount(sessioncount) {
    sessioncount++;
}


//-----------------------------//
//-----------------------------//
//-----------------------------//
//----------CHECK IF ONLINE
//-----------------------------//
//-----------------------------//
//-----------------------------//
//Pulls data from JSON File Results.json

function AJAX_JSON_Req(url, callback) {
    AJAX_req = new XMLHttpRequest();
    AJAX_req.open("GET", url, true);
    AJAX_req.setRequestHeader("Content-type", "application/json");

    AJAX_req.onreadystatechange = function () {
        if (AJAX_req.readyState == 4 && AJAX_req.status == 200) {
            callback(JSON.parse(AJAX_req.responseText));
        }
    };

    AJAX_req.send();
}


// Function to load data from JSON
//console.log("LOAD DATA FROM JSON");
AJAX_JSON_Req('results.json', function (callback) {
    data = callback;
//check if we got something

});


//-----------------------------//
//-----------------------------//
//-----------------------------//
function isset() {
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

    if (l === 0) {
        throw new Error('Empty isset');
    }

    while (i !== l) {
        if (a[i] === undef || a[i] === null) {
            return false;
        }
        i++;
    }
    return true;
}


function ToggleMenu() {

    var video = document.getElementsByTagName('video')[0];

    var isOpen = $('#top-nav').hasClass('menu-open');
    
    if (!isOpen) {
        $('#top-nav').addClass('menu-open');
        $('.btn-navbar').removeClass('collapsed');
        $('body').append('<div class="modal-backdrop behind-nav"></div>');
    }
    else {
        $('#top-nav').removeClass('menu-open');
        $('.btn-navbar').addClass('collapsed');
        $('.modal-backdrop').remove();
    }

    if (video && !isOpen) {
        video.pause();        
    } else if (video) {
        video.play();
    }

}











