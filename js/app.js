//Variable Declarations
//Cards Icons Array
let icons =[
  "fas fa-bolt",
  "fas fa-cube",
  "fas fa-gem",
  "fas fa-bicycle",
  "fas fa-anchor",
  "fas fa-paper-plane",
  "fas fa-leaf",
  "fas fa-chess-king",
  "fas fa-bolt",
  "fas fa-cube",
  "fas fa-gem",
  "fas fa-bicycle",
  "fas fa-anchor",
  "fas fa-paper-plane",
  "fas fa-leaf",
  "fas fa-chess-king"
];
let moves=0;
let openCards=[];//array to hold open cards
let numMatchedCards=0;
let currentCard;
let unmatchedCards;
let numSeconds=0;
const deck=document.querySelector('.card-container');
const resetButton=document.querySelector('#reset-button');
const movesContainer=document.querySelector('.moves');
const newGameButton=document.querySelector('.new-game-btn');
//Event Listeners
//Card Click Event Listener
deck.addEventListener('click',function(evt) {
  currentCard=evt.target;
  processClick(currentCard);
});
//Reset Button Event Listener
resetButton.addEventListener('click',function(){
  reset();
});
//Page/DOM Load Event Listener
document.addEventListener('DOMContentLoaded',function(){
  gameInit();
});
newGameButton.addEventListener('click',function(){
  reset();
});
//Initialize/reload page
function gameInit(){
  moves=0;
  numMatchedCards=0;
  shuffle(icons);
  assignIcons(icons);
  startTimer();
}
function startTimer(){
  setInterval(function(){
    numSeconds++;
  },1000);
}
function stopTimer(){
  clearInterval(startTimer);
}
//toggle function: toggles card and icons
function toggleCard(card){
    //if the icon element itself is clicked
    if(card.classList.contains("card-icon")) {
      card.classList.toggle("card-icon-visible");
      card.parentNode.classList.toggle("card-closed");
      card.parentNode.classList.toggle("card-open");
    }
    else { //if anywhere else in the card is clicked
      card.childNodes[0].classList.toggle("card-icon-visible");
      card.classList.toggle("card-closed");
      card.classList.toggle("card-open");
    }
}
//Functions checks if two cards match
function checkMatch(card1, card2){
  if(card1.innerHTML===card2.innerHTML){
    return true;
  }
  else{
    return false;
  }
}
//Processes the bulk of the clicking functionality
function processClick(card){
  if(!card.classList.contains("card-open") && !card.classList.contains("card-matched")){
      toggleCard(card);
      openCards.push(card);
      ++moves;
      displayMoves();
    }
  if(openCards.length==2 && !card.classList.contains("card-matched")){
    setTimeout(function(){
      for(let card in openCards){
        toggleCard(openCards[card]);
      }
      openCards=[];
    },650);
  }
  if(checkMatch(openCards[0],openCards[1])){
    addClass(openCards[0],"card-matched");
    addClass(openCards[1],"card-matched");
    numMatchedCards+=2;
    openCards=[];
    if(numMatchedCards===16){
      setTimeout(function(){
        stopTimer();
        displayModal();
      },500);
    }
  }
  else{
    addClass(openCards[0],"card-unmatched");
    addClass(openCards[1],"card-unmatched");
    unmatchedCards=document.querySelectorAll('.card-unmatched');
    setTimeout(function(){
      for(let card in unmatchedCards){
        removeClass(unmatchedCards[card],"card-unmatched");
      }
    },500);
  }
}
//Function: Takes in time in seconds and returns the number of hours, minutes and seconds
function calcTime(s){
  let h = Math.floor(s/3600);
  s -= h * 3600;
  let m = Math.floor(numSeconds/60);
  s -= m * 60;
  return h + ":" + m + ":" + s;
}
//Function displays the modal upon successful completion of game
function displayModal(){
  let gameTime = calcTime(numSeconds);
  const modalBody=document.querySelector('.modal-body');
  const modalMovesHTML="<h3>Moves: "+moves+" </h3>";
  const modalTimerHTML="<h3>Time: "+gameTime+" </h3>";
  const modalHeading="<h2>Congratulations! You won!</h2>";
  const modalTrophy="<i class='fas fa-trophy'></i>";
  modalBody.innerHTML+=modalTrophy;
  modalBody.innerHTML+=modalHeading;
  modalBody.innerHTML+=modalMovesHTML;
  modalBody.innerHTML+=modalTimerHTML;
  $('.modal').modal('show');
}
//Function: Adds specified class to obj
function addClass(obj,className){
  obj.classList.add(className);
}
//Function: Removes specified class from obj
function removeClass(obj,className){
  obj.classList.remove(className);
}
//Display moves function
function displayMoves(){
  document.querySelector('.moves').innerHTML = moves+" Moves";
}
//Reset Function
function reset(){
  moves=0;
  document.location.reload(false);//reload page from cache
}
//Shuffle Array Function
function shuffle(arr){
  let val=0;
  let curr=0,other=0,temp=0;
  for(let i=0;i<arr.length;i++){
    val=Math.floor(Math.random()*(16));
    if(arr[i]===arr[val]){
      continue;
    }
    else{
      temp=arr[i];
      arr[i]=arr[val];
      arr[val]=temp;
    }
  }
}
//Function assigns Icons to Cards
function assignIcons(arr){
  const deck=document.querySelector('.card-container');
  for(let i=0;i<arr.length;i++){
    deck.children[i].children[0].className+=" "+arr[i];
  }
}
