/* Card Click Event Listener*/
const deck=document.querySelector('.card-container');

deck.addEventListener('click',function(evt) {
  //if the icon element itself is clicked
  if(evt.target.classList.contains("card-icon")) {
    evt.target.classList.toggle("card-icon-visible");
    evt.target.parentNode.classList.toggle("card-closed");
    evt.target.parentNode.classList.toggle("card-open");
  }
  else { //if anywhere else in the card is clicked
    evt.target.childNodes[0].classList.toggle("card-icon-visible");
    evt.target.classList.toggle("card-closed");
    evt.target.classList.toggle("card-open");
 }
});
