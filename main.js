const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const speedBtn = document.querySelector('#speed');
const monsterBox = document.querySelector('#monster_box');
const audio = document.querySelector('.bg audio');
const clockText = document.querySelector('#clock_text');
const popupReplay = document.querySelector('.popup.replay');
const popupClose = document.querySelector('.popup .close');
const totalNumber = document.querySelector('#total_number');
const catchNumber = document.querySelector('#catch_number');
const dummy = document.querySelector('.dummy');
const bug = document.querySelector('#bug');

const imgs = ["img/bug.png", "img/carrot.png"]

let count = 3;
let timeFlag = true;
let timer = 0;
function handleStartGame(){
    console.log('start!');
    let bugNumber = Math.floor(Math.random()*10 + 1);
    let carrotNumber = Math.floor(Math.random()*10 + 1);
   
    totalNumber.innerText = carrotNumber;
    handleMakeImage(bugNumber, carrotNumber);
    audio.play();
    if(timeFlag){
        timeFlag = false;
        timer = setInterval(()=>{
        clockText.innerText =`${count}초`;
        count--;
        if(count === 0){
            clockText.innerText =`0`;
            clearInterval(timer);
        }
        }, 1000)
    }
    // audio.paused ? audio.play() : audio.pause();    
}

function handlePauseGame() {
    popupReplay.classList.remove('replay')
    audio.paused ? audio.play() : audio.pause();
    if(count != 0){
        timeFlag = true;
        clearInterval(timer);
    }
}

function handleMakeImage(bugNumber, carrotNumber) {
        
    let randomX = 0;
    let randomY = 0
    console.log(typeof bugNumber)
    for(let i=0; i<bugNumber; i++){
        let img = document.createElement('img');
        randomX = Math.floor(Math.random()*monsterBox.clientWidth) - 100;
        randomY = Math.floor(Math.random()*monsterBox.clientHeight) + 100;
        img.setAttribute("style", "position:absolute");
        img.setAttribute("src", "img/bug.png");
        img.setAttribute("z-index", "3");
        img.style.top = randomY;
        img.style.left = randomX;
        dummy.appendChild(img);
    }

    for(let i=0; i<carrotNumber; i++){
        let img = document.createElement('img');
        randomX = Math.floor(Math.random()*monsterBox.clientWidth) - 100;
        randomY = Math.floor(Math.random()*monsterBox.clientHeight) + 100;
        img.setAttribute("style", "position:absolute");
        img.setAttribute("src", "img/carrot.png");
        img.style.top = randomY;
        img.style.left = randomX;
        dummy.appendChild(img);
    }
    
}

startBtn.addEventListener('click', handleStartGame);
stopBtn.addEventListener('click', handlePauseGame);
popupClose.addEventListener('click', ()=>{
    popupReplay.classList.add('replay');
    dummy.parentNode.removeChild(dummy);
    clockText.innerText =`0`;
})