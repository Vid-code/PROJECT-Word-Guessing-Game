// Promenljive koje referenciraju HTML klase.
const inputs = document.querySelector(".inputs"),
hintTag = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
resetBtn = document.querySelector(".reset-btn"),
typingInput = document.querySelector(".typing-input");


// Promenljive koje cuvaju rec koju treba pogoditi, maksimalan broj pokusaja, niz pogresnih slova
// i niz tacnih odgovora
let word, maxGuesses, incorrectLetters = [], correctLetters = [];


// Funkcija koja se pozovi na pocetku i sluzi da izabere neku rec iz wordList
function randomWord() {
    let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranItem.word;
    maxGuesses = word.length >= 5 ? 8 : 6;
    correctLetters = []; incorrectLetters = [];
    hintTag.innerText = ranItem.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrectLetters;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
}
randomWord();


// Funckija koja se pozove kad korisnik stavi neko slovo u igru, proverava da li je uneta vrednost ispravno slovo
// da li je to slovo vec uneto pa onda proverava da li se uneto slovo nalazi u reci i azuzira odgovarajuce promenljive
function initGame(e) {
    let key = e.target.value.toLowerCase();
    if(key.match(/^[A-Za-z]+$/) && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        if(word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if(word[i] == key) {
                    correctLetters += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrectLetters.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrectLetters;
    }
    typingInput.value = "";


    // setimeout se koristi da proveri da li je igra zavrsena, da li su sva slova pogodjena ili
    // je broj pokusaja istekao
    setTimeout(() => {
        if(correctLetters.length === word.length) {
            alert(`Congrats! You found the word ${word.toUpperCase()}`);
            return randomWord();
        } else if(maxGuesses < 1) {
            alert("Game over! You don't have remaining guesses");
            for(let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}


// Event listeneri koji reaguju na dogadjaje igre - resetovanje igre, unos slova
// klik na polje za unos, i pritiskanje bilo kog tastera.
resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());