const btn = document.querySelector('.btn');
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext("2d");
const hint = document.querySelector('#hint');
let clicks = 1;
let str = "";
let array;
let length = 0;
let characterFound = [];
let whichIndex;

onload = function(){
  randWords = ['kid', 'car', 'Banana'/*, 'basic', 'picture', 'thinking', 'faint', 'other', 'truth', 'beg', 'tool'*/];
  hintArray = ['someone small', 'something that moves fast on roads', 'something yellow'];
  whichIndex = Math.floor(Math.random() * randWords.length);
  str = randWords[whichIndex];
  length = str.length;
  array = Array.from(str);
  gameOn = true;
  for ( i = 0; i<length; i++){
		characterFound.push(false);
  }
  sentence();
}
draw = function(startx, starty, endx, endy) {
    ctx.strokeStyle = "blue";
    ctx.moveTo(startx, starty);
    ctx.lineTo(endx, endy);
    ctx.stroke(); 
}
hangmanPainter = function(partToPaint){
	switch(partToPaint) {
  case 1:
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw (0, 150, 150, 150);
    break;
  case 2:
     draw (10, 0, 10, 600);
    break;
  case 3:
    draw (0, 5, 70, 5);
    break;
  case 4:
    draw (60, 5, 60, 15);
    break;
  case 5:
  //ritar ett huvud
    ctx.beginPath();
    ctx.arc(60,25,10,0,2* Math.PI,false)
    ctx.strokeStyle = "blue";
    ctx.stroke();
    break;
  case 6:
    draw (60, 36, 60, 70);
    break;
  case 7:
     draw (60, 46, 100, 50);
    break;
  case 8:
     draw (60, 46, 20, 50);
    break;
  case 9:
     draw (60, 70, 100, 100);
    break;
  default:
  draw (60, 70, 20, 100);
  gameOn = false;
}
}
letterExists = function(letter) {
	var exists = false;
	for ( i = 0; i<length; i++){
		if (array[i]==letter){
      characterFound[i] = true;
      exists = true;
		}
  }
	return exists;
}
sentence = function() {
  person.textContent = "";
  var winCount = 0;
	for ( i = 0; i<length; i++){
		if (characterFound[i]){
      person.textContent = person.textContent + array[i];
      winCount++;
    }
    else {
      person.textContent = person.textContent + "_";
    }
	}
	if (winCount == length) {
    person.textContent = "You Won! the word was " + str
    gameOn = false;
  }
  else if(!gameOn){
  	person.textContent = "You lose!"
  }
}
hint.addEventListener('click', (e) => {
   e.preventDefault();
   const hintp = document.querySelector('#hintP');
   hintp.textContent = hintArray[whichIndex];
});

btn.addEventListener('click', (e) => {
    e.preventDefault();
    if (gameOn){
	    const guess = document.querySelector('#guess');
	    const person = document.querySelector('#person');
      const guessString = guess.value.toLowerCase();
	    if (guessString.length == 1) {
        if (!letterExists(guessString)){
            hangmanPainter(clicks);
		        clicks++;
        }
      } 
      sentence();
      guess.value = "";
    }
});
