
//define vars

var artist = {artistName:"The Almighty Open Mind", tagline:"A Creative Collective", genre:""};

var members={memberone:"Open", membertwo:"Enoxh"};

var titles={titleheadingone:"Music Spotlight", titleheadingtwo:"Social/Contact", titleheadingthree:"Shows", titleheadingfour:"Featured Videos", titleheadingfive:"Digital Media", titleheadingsix:"Merch"};

var tracks=["01.mp3","02.mp3","01.mp3","02.mp3","01.mp3","02.mp3"];
var artists=["The Almighty Open Mind <br/> Song Title", "The Almighty Open Mind"];

var currentartist = 0;
var alength = artists.length+1; 
var tlength = tracks.length+1;  
var showlength = tracks.length+1;  
var startrack = 0;
var currentrack = 0;
var showtrack = currentrack+1;

var rndtrack = getRandomArbitrary(startrack , tlength);
var track = tracks[currentrack];



function Start(){
document.getElementById("artistname").innerHTML = '<h2 class="animated zoomInDown" id="artistname">'+artist.artistName+'</h2>';
 
 document.getElementById("songtitle").innerHTML = artists[0];   
document.getElementById("tagline").innerHTML = artist.tagline;
document.getElementById("genre").innerHTML = artist.genre;
document.getElementById("headinga").innerHTML = titles.titleheadingone;   
document.getElementById("headingb").innerHTML = titles.titleheadingtwo;
document.getElementById("headingc").innerHTML = titles.titleheadingthree;    
document.getElementById("headingd").innerHTML = titles.titleheadingfour;    
document.getElementById("headinge").innerHTML = titles.titleheadingfive;    
document.getElementById("headingf").innerHTML = titles.titleheadingsix;    
   

document.getElementById("trackcount").innerHTML ='<small style="color:white;"> Total Tracks: '+showlength+' Current Track: '+showtrack+'</small>';    
    
    
document.getElementById("player").innerHTML = '<audio id="audio" preload="auto" tabindex="0" controls=""type="audio/mpeg" style="margin-top:20px; max-width:100%;"><source type="audio/mp3" src="'+track+'">Sorry, your browser does not support HTML5 audio.</audio>';    

};


function nextSong(){

if(currentrack < tlength-1){
currentrack++;
     showtrack = currentrack+1;
document.getElementById("trackcount").innerHTML ='<small style="color:white;">Total Tracks: '+tlength+' Current: '+showtrack+'</small>';  
}else{
    currentrack = 0;
    showtrack = currentrack+1;
document.getElementById("trackcount").innerHTML ='<small style="color:white;">Total Tracks: '+tlength+' Current: '+showtrack+'</small>';  
}
}



function prevSong(){

if(currentrack > 0  ){
currentrack--;
     showtrack = currentrack+1;
document.getElementById("trackcount").innerHTML ='<small style="color:white;">Total Tracks: '+tlength+' Current: '+showtrack+'</small>';  
}else{
    currentrack = 0;
    showtrack = currentrack+1;
document.getElementById("trackcount").innerHTML ='<small style="color:white;">Total Tracks: '+tlength+' Current: '+showtrack+'</small>';  
}
}



function getRandomArbitrary(min, max) {
return Math.random() * (max - min) + min;
}



