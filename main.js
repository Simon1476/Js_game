const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const speedBtn = document.querySelector('#speed');
const popupBtn = document.querySelector('.popup_btn');
const monsterBox = document.querySelector('#monster_box');
const audioBgm = document.querySelector('.bg #audio');
const audioRose = document.querySelector('.bg #audio_lose')
const clockText = document.querySelector('#clock_text');
const popupReplay = document.querySelector('.popup.replay');
const popupClose = document.querySelectorAll('.popup .close');
const popupLose = document.querySelector('.popup.lose');
const totalNumber = document.querySelector('#total_number');
const catchNumber = document.querySelector('#catch_number');
const dummy = document.querySelector('.dummy');
const bug = document.querySelector('#bug');
console.log(popupClose);
const imgs = ["img/bug.png", "img/carrot.png"]

let seconds = 10;
let timeFlag = true;
let timer = 0;

let click = false;
let createStatus = false;

let carrotNumber = Math.floor(Math.random()*10 + 1);
let popupState = false;


function handleStartGame(){
    let bugNumber = 0;
    if(!click && !createStatus) {
        audioBgm.play();
        createStatus = true;
        click = true;
        bugNumber = Math.floor(Math.random()*10 + 1);
        carrotNumber = Math.floor(Math.random()*10 + 1);
        totalNumber.innerText = carrotNumber;
        handleMakeImage(bugNumber, carrotNumber);
        if(timeFlag){
            console.log('눌렷니?')
            timeFlag = false;
            clockText.innerText =`${seconds}초`;
            timer = setInterval(()=>{
            seconds--;
            clockText.innerText =`${seconds}초`;
            if(seconds === 0){
                if (carrotNumber !== 0) {
                    popupLose.classList.remove('lose');
                    popupState = true;
                }
            
                audioBgm.pause();
                audioBgm.currentTime = 0;
                clockText.innerText =`Time over!`;
                clearInterval(timer);
                createStatus = true;
                seconds = 10;
                
            }
            }, 1000)
        }
    }
   
   
    // audio.paused ? audio.play() : audio.pause();    
}

function handlePauseGame() {
    if(click && !popupState){
        click = false;
        popupReplay.classList.remove('replay')
        audioBgm.paused ? audioBgm.play() : audioBgm.pause();
        if(seconds != 0){
            timeFlag = true;
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
        
        console.log(`X=${randomX} Y=${randomY}`);
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
    handleRemoveAllChild(dummy);
    totalNumber.innerText = 0;
    clockText.innerText =`0`;
    audioBgm.pause();
    audioBgm.currentTime = 0;
    seconds = 10;
    createStatus = false;
    popupState = false;
    click = false;
    timeFlag = true;
    // clockText.innerText =`${seconds}`
    
}

function handleRestartGame() {

    if(!popupState){
    popupReplay.classList.add('replay');
    audio.play()
    click = true;
    clockText.innerText =`${seconds}초`;
    timer = setInterval(()=>{
        seconds--;
        clockText.innerText =`${seconds}초`;
        if(seconds === 0){
            if (carrotNumber !== 0) {
                popupLose.classList.remove('lose');
                popupState = true;
                
            }
            clockText.innerText =`Time over!`;
            clearInterval(timer);
            audioBgm.pause();
            audioBgm.currentTime = 0;
            createStatus = false;
            seconds = 10;
        }
    }, 1000)
    }
}
startBtn.addEventListener('click', handleStartGame);
stopBtn.addEventListener('click', handlePauseGame);
popupClose.forEach(item=> item.addEventListener('click', handleClosePopup));
popupBtn.addEventListener('click', handleRestartGame);