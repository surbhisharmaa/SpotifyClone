console.log("Welcome to Spotify");

//Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs\1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let songitems = Array.from(document.getElementsByClassName('songitem'));

let songs = [  
    {songName: "It's you", filePath: "C:\HTML\spotifyclone\songs\1.mp3", coverPath: "covers/cover1.jpg"},
    {songName: "Baby", filePath: "C:\HTML\spotifyclone\songs\2.mp3", coverPath: "covers/cover2.jpg"},
    {songName: "Dancing with your ghost", filePath: "C:\HTML\spotifyclone\songs\3.mp3", coverPath: "covers/cover3.jpg"},
    {songName: "Bananza", filePath: "C:\HTML\spotifyclone\songs\4.mp3", coverPath: "covers/cover4.jpg"},
    {songName: "Meant to be", filePath: "C:\HTML\spotifyclone\songs\5.mp3", coverPath: "covers/cover5.jpg"},
    {songName: "Believer", filePath: "C:\HTML\spotifyclone\songs\6.mp3", coverPath: "covers/cover6.jpg"},
    {songName: "Friends", filePath: "C:\HTML\spotifyclone\songs\7.mp3", coverPath: "covers/cover7.jpg"},
    {songName: "Sorry", filePath: "C:\HTML\spotifyclone\songs\8.mp3", coverPath: "covers/cover8.jpg"}
]
 songitems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerHTML = songs[i].songName;
 })
// audioElement.play();

//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        // gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        // gif.style.opacity = 0;

    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myprogressbar.value = progress;
})

myprogressbar.addEventListener('change', ()=>{
    audioElement.currentTime = ((myprogressbar.value * audioElement.duration)/100);
})

const makeAllplays = ()=>{
    
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.target.classList.remove('fa-pause-circle')
        element.target.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        console.log(e.target);
        makeAllplays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = 'songs/${songIndex+1}.mp3';
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=7){
        songIndex=0;
    }
    else{
        songIndex +=1;
    }
    audioElement.src = 'songs/${songIndex+1}.mp3';
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle'); 
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = 'songs/${songIndex+1}.mp3';
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle'); 
})