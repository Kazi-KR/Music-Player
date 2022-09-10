const music=document.querySelector('audio');
const title=document.getElementById('title');
const artist=document.getElementById('artist');
const image=document.querySelector('img');
const prevBtn=document.getElementById('prev');
const playBtn=document.getElementById('play');
const nextBtn=document.getElementById('next');
const progress_container=document.getElementById('progress-container');
const progerss=document.getElementById('progress');
const currentEl=document.getElementById('current-time');
const durationEl=document.getElementById('duration');

const songs=[
    {   
        name:'kazi-1',
        title:'Electro ',
        artist:'*****',
    },
    {   
        name:'kazi-2',
        title:'Electro-2',
        artist:'*****',
    },
    {   
        name:'kazi-3',
        title:'Electro-3',
        artist:'*******',
    }

];



let isPlaying=false;
let songIndex=0;

function playMusic(){
    //console.log("Playing")
    isPlaying=true;
    playBtn.classList.replace('fa-play','fa-pause');
    music.play();
}
function pauseMusic(){
    //console.log("Pausing")
    isPlaying=false;
    playBtn.classList.replace('fa-pause','fa-play');
    music.pause();
}


function loadSong(songIndex){
    title.textContent=songs[songIndex].title;
    artist.textContent=songs[songIndex].artist;
    image.src=`img/${songs[songIndex].name}.jpg`;
    music.src=`music/${songs[songIndex].name}.mp3`;
}

loadSong(songIndex);

function nextSong(){
    songIndex++;
    if(songIndex==songs.length){
        songIndex=0;
    }
    loadSong(songIndex);
    playMusic();
}

function prevSong(){
    songIndex--;
    if(songIndex<0){
        songIndex=songs.length-1;
    }
    loadSong(songIndex);
    playMusic();
}

function updateProgress(e){
    if(isPlaying){
        const {duration,currentTime}=e.srcElement;
        //console.log(duration);
        const progress_constant=(currentTime/duration)*100;
        progerss.style.width=`${progress_constant}%`;
        durationMin=Math.floor(duration/60);
        durationSec=Math.floor(duration%60);
        if(durationSec<10){
            durationSec=`0${durationSec}`;
        }
        if(durationSec){
            durationEl.innerText=`${durationMin}:${durationSec}`;
        }
        currentMin=Math.floor(currentTime/60);
        currentSec=Math.floor(currentTime%60);
        if(currentSec<10){
            currentSec=`0${currentSec}`;
        }
        if(currentSec){
            currentEl.innerText=`${currentMin}:${currentSec}`;
        }
    }
}

function setProgressBar(e){
    const width=this.clientWidth;
    const clickOffset=e.offsetX;
    const {duration}=music;
    music.currentTime=(clickOffset/width)*duration;
}
//EventListeners
playBtn.addEventListener('click',()=>{
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
});

nextBtn.addEventListener('click',nextSong);

prevBtn.addEventListener('click',prevSong);

music.addEventListener('timeupdate',updateProgress);

progress_container.addEventListener('click',setProgressBar);