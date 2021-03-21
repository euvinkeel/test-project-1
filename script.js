// global constants
const startingClueHoldTime = 1000
let clueHoldTime = startingClueHoldTime; //how long to hold each clue's light/sound
let cluePauseTime = 500; //how long to pause in between clues
let nextClueWaitTime = 1000; //how long to wait before starting playback of the clue sequence

//Global Variables
let pattern = [];
let progress = 0; 
let gamePlaying = false;
let tonePlaying = false;
let volume = 0.5;  //must be between 0.0 and 1.0
let guessCounter = 0;
let patternLength = 8;
let buttons = 6;

//Options settings
let mistakesAllowed = false;
let timerEnabled = false;

//Optional variables
let startingSeconds = 16;
let secondsThisTurn = startingSeconds; //game starts off with this many seconds per turn
let timerDecrement = 1;
let secondsPassed = 0;
let allowedMistakes = 3;
let mistakes = 0;
let turnTimer; //actually holds the setInterval
let waitForPattern; // holds a setTimeout

//DOM elements
let timerswitch = document.getElementById('timerswitch');
let multipletryswitch = document.getElementById('multipletryswitch');
let timerCounter = document.getElementById("timerCounter");
let mistakeCounter = document.getElementById("mistakeCounter");

timerswitch.addEventListener('input', function(e){
  timerEnabled = e.target.checked;
  stopGame();
})
multipletryswitch.addEventListener('input', function(e){
  mistakesAllowed = e.target.checked;
  stopGame();
})

function generateNewPattern() {
  pattern = [];
  for (let i=0; i<patternLength; i++) {
    pattern[i] = Math.floor(Math.random() * buttons)+1;
  }
  console.log(pattern);
}

function startGame() {
  // Reset everything to default values
  clueHoldTime = startingClueHoldTime;
  secondsThisTurn = startingSeconds;
  mistakes = 0;
  progress = 0;
  
  // Random pattern every time user plays a new game
  generateNewPattern();
  
  gamePlaying = true;
  document.getElementById("startBtn").classList.add("hidden");
  document.getElementById("stopBtn").classList.remove("hidden");
  
  playClueSequence();
} 

function stopGame() {
  gamePlaying = false;
  clearTimerIntervals()
  timerCounter.innerText = `Time left: ...`;
  mistakeCounter.innerText = `Mistakes: 0`;
  document.getElementById("stopBtn").classList.add("hidden");
  document.getElementById("startBtn").classList.remove("hidden");
} 

function loseGame(){
  stopGame();
  alert("Game Over. You lost.");
}

function winGame(){
  stopGame();
  alert("Congratulations! You won!");
}


function guess(btn){
  if(!gamePlaying){
    return;
  }
  
  // add game logic here
  if (pattern[guessCounter] != btn) {
    
    //Mistake handling
    if (mistakesAllowed) {
      if (mistakes < allowedMistakes){
        mistakes++;
        
        if (mistakes == allowedMistakes) {
          alert(`Made a mistake! This is your last chance...`);
        }else{
          alert(`Made a mistake! You have ${allowedMistakes - mistakes} mistake(s) left!`);
        }
        
        mistakeCounter.innerText = `Mistakes: ${mistakes}`;
        guessCounter = 0;
        return;
      }
    }
    
    // At this point, either there's no mistakes enabled or user made too much mistakes
    loseGame();
    
  }else if (guessCounter < progress) {
    
    // The user has guessed the first few buttons correctly, but not done yet
    guessCounter++;
    
  }else if (progress < pattern.length - 1){
    
    // The user has guessed the revealed pattern, on to the next turn
    progress++;
    playClueSequence();
    
  }else{
    
    // There's nothing else, the user guessed the entire pattern
    winGame();
    
  }
}


function lightButton(btn){
  document.getElementById("button"+btn).classList.add("lit")
}
function clearButton(btn){
  document.getElementById("button"+btn).classList.remove("lit")
}


// used so setintervals and settimeouts don't overlap each other
function clearTimerIntervals() {
  clearInterval(turnTimer);
  clearTimeout(waitForPattern);
}

function playClueSequence(){
  // Reset variables + timers
  clearTimerIntervals()
  secondsPassed = 0;
  guessCounter = 0;
  
  // Speed up the clue playback and timer
  clueHoldTime *= 0.8;
  cluePauseTime *= 0.8;
  secondsThisTurn -= timerDecrement;
  
  // Playback notes
  let delay = nextClueWaitTime; //set delay to initial wait time
  for(let i=0;i<=progress;i++){ // for each clue that is revealed so far
    setTimeout(playSingleClue,delay,pattern[i]) // set a timeout to play that clue
    delay += clueHoldTime 
    delay += cluePauseTime;
  }
  
  // indicate that the timer is paused while the solution plays out
  timerCounter.innerText = `Time left: ...`;
  
  if (timerEnabled) {
    
    // only start timer after it's all done playing
    waitForPattern = setTimeout(function(){
      
      // start the timer
      timerCounter.innerText = `Time left: ${secondsThisTurn}`;
      turnTimer = setInterval(function(){
        secondsPassed += 1;
        timerCounter.innerText = `Time left: ${secondsThisTurn-secondsPassed}`;
        if (secondsPassed >= secondsThisTurn && gamePlaying) {
          loseGame();
          clearTimerIntervals()
        }
      }, 1000)
    },delay)
  }
}

function playSingleClue(btn){
  if(gamePlaying){
    lightButton(btn);
    playTone(btn,clueHoldTime);
    setTimeout(clearButton,clueHoldTime,btn);
  }
}




// Sound Synthesis Functions

//just generate the tone based on button's order
function getButtonTone(btn){
  return 200 + 66*(btn-1);
}

function playTone(btn,len){ 
  o.frequency.value = getButtonTone(btn);
  g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
  tonePlaying = true
  setTimeout(function(){
    stopTone()
  },len)
}
function startTone(btn){
  if(!tonePlaying){
    o.frequency.value = getButtonTone(btn);
    g.gain.setTargetAtTime(volume,context.currentTime + 0.05,0.025)
    tonePlaying = true
  }
}
function stopTone(){
    g.gain.setTargetAtTime(0,context.currentTime + 0.05,0.025)
    tonePlaying = false
}

//Page Initialization
// Init Sound Synthesizer
let context = new AudioContext()
let o = context.createOscillator()
let g = context.createGain()
g.connect(context.destination)
g.gain.setValueAtTime(0,context.currentTime)
o.connect(g)
o.start(0)