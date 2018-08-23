window.addEventListener("load", init);

//Variables globales

//Niveles de dificultad
const levels = {
  easy: 5,
  medium: 3,
  hard: 2
};

//Cambiar nivel de dificultad

const currentLevel = levels.easy;

let time = currentLevel;
let score = 0;
let isPlaying;

//Elementos DOM
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");

//Palabras

const words = [
  "hat",
  "river",
  "lucky",
  "statue",
  "generate",
  "stubborn",
  "cocktail",
  "runaway",
  "joke",
  "developer",
  "establishment",
  "hero",
  "javascript",
  "nutrition",
  "revolver",
  "echo",
  "siblings",
  "investigate",
  "horrendous",
  "symptom",
  "laughter",
  "magic",
  "master",
  "space",
  "definition"
];

//Inicializar Juego

function init() {
  //Monstrar el numero de segundos

  seconds.innerHTML = currentLevel;

  //Cargar la palabra desde el array

  showWord(words);
  //Que comience un evento cada vez que existe un input
  wordInput.addEventListener("input", startMatch);

  //Cuenta regresiva

  setInterval(countdown, 1000);

  //Verificar el estado del juego
  setInterval(checkStatus, 50);
}

//Start Match
function startMatch() {
  if (matchWords()) {
    isPlaying = true;
    time = currentLevel + 1;
    showWord(words);
    wordInput.value = "";
    score++;
  }
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

//Comparar las palabras: Input y palabra random

function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    message.innerHTML = "Correcto!!";
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}

//Elegir y mostrar la palabra random

function showWord(words) {
  //Generar un index random dentro del array de words
  const randIndex = Math.floor(Math.random() * words.length);

  //Generar una palabra random

  currentWord.innerHTML = words[randIndex];
}

//Cuenta regresiva timer

function countdown() {
  //Se asegura que el tiempo no termine
  if (time > 0) {
    //El tiempo disminuye
    time--;
  } else if (time === 0) {
    //El juego termina
    isPlaying = false;
  }

  timeDisplay.innerHTML = time;
}

//Verificar el estado del juego
function checkStatus() {
  if (!isPlaying && time === 0) {
    message.innerHTML = "Game Over!";
    score = -1;
  }
}
