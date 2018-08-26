window.addEventListener("load", init);
loadDoc();
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
let pala = "Go";
//Elementos DOM
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#current-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const message = document.querySelector("#message");
const seconds = document.querySelector("#seconds");

//Palabras

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(xhttp.responseText);
      var rango = response.length;
      const random = Math.floor(Math.random() * rango);
      var palabra = response[random].word;
      var prueba = JSON.stringify(palabra);
      var prueba1 = prueba.charAt(1).toUpperCase() + prueba.slice(2);
      var prueba1 = prueba1.slice(0, -1);
      pala = prueba1;
      console.log(rango);
      console.log(pala);
    }
  };
  xhttp.open("GET", "palabras.json", true);
  xhttp.send();
}

const words = "";

//Inicializar Juego

function init() {
  //Monstrar el numero de segundos
  seconds.innerHTML = currentLevel;

  //Cargar la palabra desde el array
  loadDoc();
  showWord(pala);
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
    loadDoc();
    return true;
  } else {
    message.innerHTML = "";
    return false;
  }
}

//Elegir y mostrar la palabra random

function showWord() {
  //Muestra una palabra random

  currentWord.innerHTML = pala;
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
