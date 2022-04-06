"use strict"

const submitBtn = document.querySelector(".btn-submit");
const message = document.querySelector(".message-box");
const getName = document.getElementById("playername");
const btnRoll = document.querySelector(".btn-roll");
const btnAgain = document.querySelector(".btn-playagain");
const btnReset = document.querySelector(".btn-reset");
const diceEl = document.querySelector(".dice");
const chances = document.querySelector(".chance-box");
const boxDivs = document.querySelectorAll('.box');
const winnerText = document.querySelector('.winner-message');
const overlay = document.querySelector('.overlay');
const myScore = document.querySelector('.your-score');
const highScore = document.querySelector('.high-score');
const audio = document.getElementById('audio');
let userInput = [];
let newArr = []
let chanceNum = 0;
let oldScore ;
let newScore = 100;
let diceNum;


const newPositions = Array.from(document.querySelectorAll('.box'));

const getInput= function(ev){
    play();
    ev.preventDefault();
    myScore.innerHTML = "100";
    const name = getName.value;
    userInput.push(name);
    document.getElementById("form").reset(); 
    if(name != ''){
        message.textContent = `HELLO ${userInput[0].toUpperCase()} ✌️ ROLL THE DICE...`;
        cursorOpen();
    }
}


function play(){
    audio.src = "sounds/button-rein.mp3";
    audio.play();
  }
  

function hover(){
    audio.src = "sounds/hover.mp3";
    setTimeout(function() {
        audio.play();
      }, 0);
  }

 function mark(){
    audio.src = "sounds/mark.mp3";
    audio.play();
  }

  function hwon(){
    audio.src = "sounds/firework.mp3";
    audio.play();
  }

  function cwon(){
    audio.src = "sounds/cwon.mp3";
    audio.play();
  }

const cursorHide = function(){  
    btnRoll.disabled = true;
    btnAgain.disabled = true;
    btnReset.disabled = true;
   
}
const cursorOpen = function(){  
    btnRoll.disabled = false;
    btnAgain.disabled = false;
    btnReset.disabled = false;
    submitBtn.disabled = true;
   
}

const openModal = function () {
    winnerText.classList.remove('hidden');
    overlay.classList.remove('hidden'); 
  };

  const closeModal = function () {
    winnerText.classList.add('hidden');
    overlay.classList.add('hidden');
    message.innerHTML = `WANNA PLAY AGAIN??...😉😉`;
    cursorHide();
    btnAgain.disabled = false;
    newPositions.forEach(el=> {

        el.style.pointerEvents = 'none';
    })

  };

function chanceText(diceNum){

    if(diceNum==1){
        chances.innerHTML = "6";
        chanceNum = 6;
    }
    else if(diceNum==2){
        chances.innerHTML = "5";
        chanceNum = 5;
    }
    else if(diceNum==3){
        chances.innerHTML = "4";
        chanceNum = 4;
    }
    else if(diceNum==4){
        chances.innerHTML = "3";
        chanceNum = 3;
    }
    else if(diceNum==5){
        chances.innerHTML = "2";
        chanceNum = 2;
    }
    else if(diceNum==6){
        chances.innerHTML = "1";
        chanceNum = 1;
    }

}

function cellNum(diceNum){
    const arr = []
    while(arr.length < diceNum){
      let r = Math.floor(Math.random() * 25) + 1;
      let k = document.querySelector(`.box${r}`);
      if(arr.indexOf(k) === -1) arr.push(k)
    }
  return(arr)
  }


function markNum(arr){

    arr.forEach(el => {
        el.classList.add("1");
    });

}

function unMark(newPositions){

    newPositions.forEach(el => {
       if( el.classList[2] === "1"){
           return;
       }
       else{
           el.classList.add("0");
       }
    });

}

const checkWin = function(newPositions,diceNum,chanceNum,newScore,oldScore){


    const handleEvent = function(el){

        let clist = el.target.classList[2];
        mark();
        if(clist == '1' ){
            el.target.innerHTML = `${diceNum}`;
            el.target.style.color = "red";
            el.target.style.backgroundColor = "white";
            el.target.style.pointerEvents = 'none';
            hwon();
            openModal();
            winnerText.innerHTML = `YOU WON..🎉🎉`;
            newScore += 100;
            oldScore = newScore;
            myScore.innerText = oldScore;
            newScore = Number(myScore.innerText);
            console.log(oldScore)
            console.log(typeof(oldScore))
            chanceNum = 0;
        }
        else {
            el.target.innerHTML = "X";
            el.target.style.backgroundColor = "red";
            chanceNum = chanceNum - 1;
            chances.innerHTML = chanceNum;
            el.target.style.pointerEvents = 'none';
            message.innerHTML = `WRONG BOX ! YOU HAVE ${chanceNum} CHANCES LEFT..🔂🔂`;

            if(chanceNum === 0){
                openModal();
                cwon();
                winnerText.innerHTML = `YOU LOST..😪😪`;
                newScore = newScore - 25;
                oldScore = newScore;
                myScore.innerHTML = oldScore;
                newScore = Number(myScore.innerText);
                console.log(oldScore)
                console.log(typeof(oldScore))
             }

        }
          console.log(chanceNum);   
    }

        newPositions.forEach( (el =>{el.addEventListener('click',handleEvent)})); 
}


cursorHide();

submitBtn.addEventListener("click",getInput);

btnRoll.addEventListener("click",function(){

    play();
    newPositions.forEach(el=> {
        el.style.pointerEvents = '';
    })
    diceNum =  Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `images/dice-${diceNum}.png`;
    btnRoll.disabled = true;
    chanceText(diceNum);
    console.log(chanceNum);
    message.innerHTML = `NUMBER ${diceNum} IS HIDDEN IN ${chanceNum} BOXES , YOU HAVE ${chanceNum} CHANCES TO GUESS BOX WITH NUMBER ${diceNum}, CHOOSE A BOX..✅✅`;
    let cells = cellNum(diceNum);
    console.log(cells);
    markNum(cells);
    unMark(newPositions);
    checkWin(newPositions,diceNum,chanceNum,newScore,oldScore);

});

overlay.addEventListener('click',closeModal);

btnAgain.addEventListener('click',function(){
    play();
    message.innerHTML = `ROLL THE DICE AGAIN...🎲`;
    chances.innerHTML = "0";
    submitBtn.disabled = true;;
    btnRoll.disabled = false;
    btnAgain.disabled = true;
    btnReset.disabled = false;
    userInput.pop();
    chanceNum = 0;


    newPositions.forEach(el=> {

        el.classList.remove(el.classList[2]);
        el.innerHTML = "";
        el.style.color = "";
        el.style.backgroundColor = "";
        
    })
});

btnReset.addEventListener('click',function(){
    play();
    submitBtn.disabled = false;
    cursorHide();
    highScore.innerHTML = Number(myScore.innerHTML);
    myScore.innerHTML = "100";
})

