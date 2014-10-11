
/* imports the function prompt from the sync-prompt module */
var prompt = require('sync-prompt').prompt;

/* generateCards() function generates and returns an array of card objects. */
var generateCards = function(){
	var suits=['♠','♥','♦','♣'];
	var faces=['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
	var cards=[];
	for(var i=0;i<suits.length;i++){
		for(var j=0;j<faces.length;j++){
			card = {
				suit:suits[i],
				face: faces[j]
			};
			cards.push(card);
		}
	}
	return cards;
};

/* shuffle(Array) function shuffles the array of cards passed in as an argument and returns shuffled cards. */
var shuffle = function(array){
	var m = array.length, t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
};

/* calculateHand(Array) function calculates and returns the total numeric value of a hand. */
var calculateHand = function(hand){
	var numA=0;
	var total=0;
	for(var i=0;i<hand.length;i++){
		var value = hand[i].face;
		if(value=='J'||value=='Q'||value=='K') {
			total+=10;
		}else if(value=='A') {
			total+=11;
			numA++;
		}else {
			total+=parseInt(value,10);
		}
	}
	while(total>21&&numA>0){
		total -= 10;
    numA--;
  }
	return total;
};

/* determineWinner(Number, Number) function determines the winner based on the totals passed in, and return the string representation of the winner. */
var determineWinner = function(playerHand, computerHand){
	var result;
	var playerTotal = calculateHand(playerHand);
	var computerTotal = calculateHand(computerHand);
	if(playerTotal>21){
		if(computerTotal>21){
			result='Tie!';
		}else{
			result='Computer Wins\n';
		}
	}else{
		if(computerTotal>21){
			result='Player Wins\n';
		}else{
			if(playerTotal>computerTotal){
				result='Player Wins\n';
			}else if(playerTotal<computerTotal){
				result='Computer Wins\n';
			}else{
				result='Tie!\n';
			}
		}
	}
	return result;
};

var getHand = function(hand){
	var handCards="";
	for(var i=0;i<hand.length;i++){
		handCards=handCards+hand[i].face+hand[i].suit+" ";
	}
	return handCards;
};

/*
An interactive commandline game codes start here.
*/

/* Initialize the deck of cards. */
var cards = generateCards();
cards = shuffle(cards);

/* Loop game until the number of cards is less than 26. */
var gameover=false;
while(!gameover){
	var playerHand=[];
	playerHand.push(cards.pop());
	playerHand.push(cards.pop());
	var computerHand=[];
	computerHand.push(cards.pop());
	computerHand.push(cards.pop());
	console.log("Your hand is: "+getHand(playerHand)+"... for a total of "+calculateHand(playerHand));
	var cont=true;
	while(cont){
		var action=prompt('(h)it or (s)tay \n> ');
		switch(action){
			case 'h':
			case 'hit':
			playerHand.push(cards.pop());
			//check if player busts
			if(calculateHand(playerHand)<=21){
				console.log("Your hand: "+getHand(playerHand)+"("+calculateHand(playerHand)+")");
			}else{
				cont=false;
			}
			break;
			case 's':
			case 'stay':
			cont=false;
			break;
			default:
			console.log('Please choose (h)it or (s)tay\n');
			break;
		}
	}
	//Deal for computer until >17
	while(calculateHand(computerHand)<17){
		computerHand.push(cards.pop());
	}
	console.log("Your hand: "+getHand(playerHand)+"("+calculateHand(playerHand)+"), Computer hand: "+getHand(computerHand)+"("+calculateHand(computerHand)+")");
	console.log(determineWinner(playerHand,computerHand));
	console.log('There are '+cards.length+' cards left in the deck\n----------------------- \n');
	if(cards.length<26){
		gameover=true;
		console.log('Less than 26 cards left. Game over!');
	}
}
