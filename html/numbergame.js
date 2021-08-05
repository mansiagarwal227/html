var randomnum = 0,
	count = 0;

function writeMessage(elementId, message, appendMessage) {
	var elemToUpdate = document.getElementById(elementId);
	if (appendMessage) {
		elemToUpdate.innerHTML = elemToUpdate.innerHTML + message;
	} else {
		elemToUpdate.innerHTML = message;
	}
};

function newGame() {
	randomnum = Math.floor(Math.random() * 100) ;
	count = 0;
	writeMessage('List', '');
}

function number() {
	var number = document.getElementById('userGuess').value;
	var middle = document.getElementById('middle');
	var List = document.getElementById('List');
	 
		if (number == randomnum) {
			document.getElementById("middle").innerHTML+="</br>You guess the number correct....YOU WON....";
			newGame();
		} else if (number < randomnum) {
			count++;

			document.getElementById("List").innerHTML+="</br>You guess the number lesser";
		} else {
			count++;
			document.getElementById("List").innerHTML+="</br>You guess the number greter";
		}

	document.getElementById('userGuess').value = '';	
}

window.onload = function() {
	newGame();
	document.getElementById('buttonArea').addEventListener('click', number);
};