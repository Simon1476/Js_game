const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const speedBtn = document.querySelector('#speed');
const popupBtn = document.querySelector('.popup_btn');
const monsterBox = document.querySelector('#monster_box');
const audioBgm = document.querySelector('.bg #audio');
const audioRose = document.querySelector('.bg #audio_lose')
const audioWin = document.querySelector('.bg #audio_win');
const audioCarrot = document.querySelector('.bg #audio_carrot');
const audioBug = document.querySelector('.bg #audio_bug');
const clockText = document.querySelector('#clock_text');
const popupReplay = document.querySelector('.popup.replay');
const popupClose = document.querySelectorAll('.popup .close');
const popupLose = document.querySelector('.popup.lose');
const popupWin = document.querySelector('.popup.win');
const totalNumber = document.querySelector('#total_number');
const catchNumber = document.querySelector('#catch_number');
const dummy = document.querySelector('.dummy');
const bug = document.querySelector('#bug');

const imgs = ["img/bug.png", "img/carrot.png"]

let seconds = 10;
let timer = 0;
let catchCarrot = 0;

let clickState = false;
let timeState = true;
let createState = false;
let popupState = false;

let carrotNumber = Math.floor(Math.random()*10 + 1);


// let carrotDummy = [];
// let bugDummy = [];


function handleStartGame(){
    let bugNumber = 0;
    if(!clickState && !createState) {
        audioBgm.play();
        createState = true;
        clickState = true;
        bugNumber = Math.floor(Math.random()*10 + 1);
        carrotNumber = Math.floor(Math.random()*10 + 1);
        totalNumber.innerText = carrotNumber;
        handleMakeImage(bugNumber, carrotNumber);
        if(timeState){
            timeState = false;
            clockText.innerText =`${seconds}초`;
            timer = setInterval(()=>{
            seconds--;
            clockText.innerText =`${seconds}초`;
            if(seconds === 0){
                if (carrotNumber !== 0) {
                    popupLose.classList.remove('lose');
                    popupState = true;
                    audioRose.play();
                    catchNumber.innerText = 0;
                    catchCarrot = 0;
                }
                clockText.innerText =`Time over!`;
                audioBgm.pause();
                audioBgm.currentTime = 0;
                clearInterval(timer);
                createState = true;
                seconds = 10;
            
            } else if(seconds !==0 && carrotNumber === 0){
                audioWin.play();
                popupWin.classList.remove('win');
                catchNumber.innerText = 0;
                clockText.innerText =`0`;
                catchCarrot = 0;
                popupState = true;
                audioBgm.pause();
                audioBgm.currentTime = 0;
                clearInterval(timer);
                createState = true;
                seconds = 10;
            }
         
            
            }, 1000)
        }
    }
   
   
    // audio.paused ? audio.play() : audio.pause();    
}

function handlePauseGame() {
    if(clickState && !popupState){
        dummy.style.pointerEvents = "none";
        clickState = false;
        popupReplay.classList.remove('replay')
        audioBgm.paused ? audioBgm.play() : audioBgm.pause();
        if(seconds != 0){
            timeState = true;
            clearInterval(timer);
            audioBgm.pause();
            
        }
    }
}

function handleMakeImage(bugNumber, carrotNumber) {
        
    let randomX = 0;
    let randomY = 0
  
    for(let i=0; i<bugNumber; i++){
        let img = document.createElement('img');
        randomX = Math.floor(Math.random()*(dummy.clientWidth -50));
        randomY = Math.floor(Math.random()*(dummy.clientHeight-50));
        img.setAttribute("style", "position:absolute");
        img.setAttribute("src", "img/bug.png");
        img.setAttribute("data-name", "bug");
        
        img.style.top = randomY;
        img.style.left = randomX;
        
        dummy.appendChild(img);
    }

    for(let i=0; i<carrotNumber; i++){
        let img = document.createElement('img');
        randomX = Math.floor(Math.random()*(dummy.clientWidth -50));
        randomY = Math.floor(Math.random()*(dummy.clientHeight-50));
    
        img.setAttribute("style", "position:absolute");
        img.setAttribute("src", "img/carrot.png");
        img.setAttribute("data-name", "carrot");
        
        
        img.style.top = randomY;
        img.style.left = randomX;
        
        dummy.appendChild(img);
    }
    
}

function handleRemoveAllChild(dummy) {
    while(dummy.hasChildNodes()){
        dummy.removeChild(dummy.firstChild);
    }
}

function handleClosePopup(event) {
    popupReplay.classList.add('replay');
    popupLose.classList.add('lose');
    popupWin.classList.add('win');
    handleRemoveAllChild(dummy);
    totalNumber.innerText = 0;
    clockText.innerText =`0`;
    audioBgm.pause();
    audioBgm.currentTime = 0;
    seconds = 10;
    createState = false;
    popupState = false;
    clickState = false;
    timeState = true;
    catchNumber.innerText = 0;
    // clockText.innerText =`${seconds}`
    
}

function handleRestartGame() {

    if(!popupState){
    popupReplay.classList.add('replay');
    dummy.style.pointerEvents = "auto";
    audio.play()
    clickState = true;
    clockText.innerText =`${seconds}초`;
    timer = setInterval(()=>{
        seconds--;
        clockText.innerText =`${seconds}초`;
        if(seconds === 0){
            if (carrotNumber !== 0) {
                popupLose.classList.remove('lose');
                popupState = true;
                catchCarrot = 0;
            }
            clockText.innerText =`Time over!`;
            clearInterval(timer);
            audioBgm.pause();
            audioBgm.currentTime = 0;
            createState = false;
            seconds = 10;
        }   else if(seconds !==0 && carrotNumber === 0){
            audioWin.play();
            popupWin.classList.remove('win');
            catchNumber.innerText = 0;
            clockText.innerText =`0`;
            popupState = true;
            audioBgm.pause();
            audioBgm.currentTime = 0;
            clearInterval(timer);
            createState = true;
            seconds = 10;
        }
    }, 1000)
    }
}

function hadleClickImage(event) {
    
    if(event.target.dataset.name === "carrot"){
        audioCarrot.play();
        event.target.remove();
        carrotNumber--;
        catchCarrot++;
        catchNumber.innerText = catchCarrot;
        totalNumber.innerText = carrotNumber;
        
        
    }else if(event.target.dataset.name === "bug"){
        audioBug.play();
    }
}

// function handleMoveImage(carrotDummy, bugDummy) {
//     randomX = Math.floor(Math.random()*(dummy.clientWidth -50));
//     randomY = Math.floor(Math.random()*(dummy.clientHeight-50));
//     img.style.top = randomY;
//     img.style.left = randomX;
// }



startBtn.addEventListener('click', handleStartGame);
stopBtn.addEventListener('click', handlePauseGame);
popupClose.forEach(item=> item.addEventListener('click', handleClosePopup));
popupBtn.addEventListener('click', handleRestartGame);
dummy.addEventListener('click', hadleClickImage)