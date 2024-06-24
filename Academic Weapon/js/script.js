function hide(what){
  const h = document.getElementById(what);
  h.style.display = "none";
}
/*
var n = 1;
function information(){  
  const text = document.getElementById('infTxt');
  const title = document.getElementById('titleInf');
  n+=1
  if (n === 2){
    title.innerHTML = `Comment cela fonctionne-t-il ? ${n}/4`
    text.innerHTML = `Elle consiste à alterner des périodes 
    de travail avec de courtes pauses fréquentes, afin de favoriser une concentration soutenue et d'éviter la fatigue mentale.`
  } else if (n === 3){
    title.innerHTML = `Comment cela peut-il m'aider ? ${n}/4`
    text.innerHTML = `Regarder une tâche ou un projet imposant est 
    inconfortable, c'est pourquoi nous nous tournons plutôt vers Instagram ou Netflix pour améliorer notre humeur.`
  } else if (n === 4){
    title.innerHTML = `Fonctionnement de base ${n}/4`
    text.innerHTML = `1- Commencez par rédiger votre tâche
                      2- Séance de travail de 25 minutes
                      3- Pause de 5 minutes
                      4- après 4 pomodoros, prenez une pause plus longue (15/30min)`
  }

} */



let focusButton = document.getElementById("focus");
let buttons = document.querySelectorAll(".btn");
let shortBreakButton = document.getElementById("shortbreak");
let longBreakButton = document.getElementById("longbreak");
let startBtn = document.getElementById("btn-start");
let reset = document.getElementById("btn-reset");
let pause = document.getElementById("btn-pause");
let time = document.getElementById("time");
let set;
let active = "focus";
let count = 59;
let paused = true;
let minCount = 24;
time.textContent = `${minCount + 1}:00`;

const appendZero = (value) => {
  value = value < 10 ? `0${value}` : value;
  return value;
};

reset.addEventListener(
  
  "click",
  


  (resetTime = () => {
    pauseTimer();
    switch (active) {
      case "long":
        minCount = 14;
        break;
      case "short":
        minCount = 4;
        break;
      default:
        minCount = 24;
        break;
    }
    count = 59;
    time.textContent = `${minCount + 1}:00`;
  })
);
var noSleep = new NoSleep();

const removeFocus = () => {
  buttons.forEach((btn) => {
    noSleep.disable();
    console.log('sleep')
    btn.classList.remove("btn-focus");
  });
};
const container = document.getElementById("container").style;

focusButton.addEventListener("click", () => {
  container.backgroundColor = "#b00505"

  console.log("focus")
  removeFocus();
  focusButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 24;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});



shortBreakButton.addEventListener("click", () => {
  container.backgroundColor = "rgb(28, 145, 2)"
  active = "short";
  removeFocus();
  console.log("short")
  shortBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 4;
  count = 59;
  time.textContent = `${appendZero(minCount + 1)}:00`;
});

longBreakButton.addEventListener("click", () => {
  container.backgroundColor = "#0583E9"
  active = "long";
  console.log("long")
  removeFocus();
  longBreakButton.classList.add("btn-focus");
  pauseTimer();
  minCount = 14;
  count = 59;
  time.textContent = `${minCount + 1}:00`;
});

pause.addEventListener(
  
  "click",
  (pauseTimer = () => {
    paused = true;
    clearInterval(set);
    startBtn.classList.remove("hide");
    pause.classList.remove("show");
    reset.classList.remove("show");
  })
);

startBtn.addEventListener("click", () => {
  noSleep.enable();
  console.log('nosleep enabled');

  reset.classList.add("show");
  pause.classList.add("show");
  startBtn.classList.add("hide");
  startBtn.classList.remove("show");
  if (paused) {
    paused = false;
    time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
    set = setInterval(() => {
      count--;
      time.textContent = `${appendZero(minCount)}:${appendZero(count)}`;
      if (count == 0) {
        if (minCount != 0) {
          minCount--;
          count = 60;
        } else {
          clearInterval(set);
        }
      }
    }, 1000);
  }
});