import { reMapWord } from "./logic";

const addClass = (el, name) => {
  el.className = el.className + " " + name;
};

const removeClass = (el, name) => {
  el.classList.remove(name);
};

const sound = new Audio("../../../../public/click4_1.wav");
var timer;

 const setTimer = () => {
  var time = document.getElementById("timer").innerHTML;
  timer = setInterval(() => {
    document.getElementById("timer").innerHTML = time;
    if(time > 0){
      time--;
    }else{
      clearInterval(timer);
      gameOver();
    }
  },1000);
};

export const newGame = () => {
  if (!document.querySelector(".word.active"))
    addClass(document.querySelector(".word"), "active");
  if (!document.querySelector(".letter.active"))
    addClass(document.querySelector(".letter"), "active");
  const cursor = document.getElementById("cursor");
  cursor.style.display = "inline-block";
  const nextLetter = document.querySelector(".letter.active");
  const nextWord = document.querySelector(".word.active");
  cursor.style.top = nextWord.getBoundingClientRect().top + "px";
  if (nextLetter) {
    cursor.style.left = nextLetter.getBoundingClientRect().left - 2 + "px";
  } else {
    cursor.style.left = nextWord.getBoundingClientRect().right - 5 + "px";
  }

  //to handle input
  document.getElementById("words").addEventListener("keydown", (e) => {
    sound.currentTime = 0;
    sound.play();
    cursor.style.animation = "none";
    const k = e.key;
    const currentWord = document.querySelector(".word.active");
    const currentLetter = document.querySelector(".letter.active");
    const expected = currentLetter ? currentLetter.innerHTML : " ";
    var isLetter = k.length === 1 && k !== " ";
    var isSpace = k === " ";
    var isBackspace = k === "Backspace";
    if (
      currentLetter === document.getElementById("words").firstChild.firstChild
    ) {
      setTimer();
    }

    console.log({ expected: expected, key: k });
    //handle letter inputs
    if (isLetter) {
      // console.log(expected);
      if (k === expected) {
        addClass(currentLetter, "correct");
        removeClass(currentLetter, "active");
        if (currentLetter.nextSibling) {
          addClass(currentLetter.nextSibling, "active");
        }
      } else {
        addClass(currentLetter, "incorrect");
        removeClass(currentLetter, "active");
        if (currentLetter.nextSibling) {
          addClass(currentLetter.nextSibling, "active");
        } else {
          //
        }
      }
    }

    //handle space
    if (isSpace) {
      if (expected === " ") {
        removeClass(currentWord, "active");
        addClass(currentWord.nextSibling, "active");
        addClass(currentWord.nextSibling.firstChild, "active");
      } else {
        const lettersToInvalidate = currentWord.querySelectorAll(
          ".letter:not(.correct)"
        );
        lettersToInvalidate.forEach((element) => {
          addClass(element, "incorrect");
        });
        removeClass(currentWord, "active");
        removeClass(currentLetter, "active");
        addClass(currentWord.nextSibling, "active");
        addClass(currentWord.nextSibling.firstChild, "active");
      }
    }

    //handle backspace
    if (isBackspace) {
      if (currentLetter) {
        if (currentLetter === currentWord.firstChild) {
          removeClass(currentLetter, "active");
          removeClass(currentWord, "active");
          addClass(currentWord.previousSibling, "active");
        } else {
          removeClass(currentLetter, "active");
          addClass(currentLetter.previousSibling, "active");
          removeClass(currentLetter.previousSibling, "incorrect");
          removeClass(currentLetter.previousSibling, "correct");
        }
      } else {
        addClass(currentWord.lastChild, "active");
        removeClass(currentWord.lastChild, "incorrect");
        removeClass(currentWord.lastChild, "correct");
      }
    }

    //move cursor
    const nextLetter = document.querySelector(".letter.active");
    const nextWord = document.querySelector(".word.active");
    cursor.style.top = nextWord.getBoundingClientRect().top + "px";
    if (nextLetter) {
      cursor.style.left = nextLetter.getBoundingClientRect().left - 2 + "px";
    } else {
      cursor.style.left = nextWord.getBoundingClientRect().right - 5 + "px";
    }

    //scroll lines
    if (
      currentWord.nextSibling.getBoundingClientRect().bottom ===
        document.getElementById("game").getBoundingClientRect().bottom &&
      !currentLetter
    ) {
      const words = document.getElementById("words");
      const margin = parseInt(words.style.marginTop || "0px");
      words.style.marginTop = margin - 42 + "px";
      const nextLetter = document.querySelector(".letter.active");
      const nextWord = document.querySelector(".word.active");
      cursor.style.top = nextWord.getBoundingClientRect().top + "px";
      if (nextLetter) {
        cursor.style.left = nextLetter.getBoundingClientRect().left - 2 + "px";
      } else {
        cursor.style.left = nextWord.getBoundingClientRect().right - 5 + "px";
      }
    }
  });
};

export const restart = () => {
  const wordsElement = document.getElementById("words");
  wordsElement.style.marginTop = 0;
  for (let i = 0; i < 200; i++) {
    wordsElement.lastChild.remove();
  }
  reMapWord();
  if (!document.querySelector(".word.active"))
    addClass(document.querySelector(".word"), "active");
  if (!document.querySelector(".letter.active"))
    addClass(document.querySelector(".letter"), "active");
  const cursor = document.getElementById("cursor");
  cursor.style.display = "inline-block";
  const nextLetter = document.querySelector(".letter.active");
  const nextWord = document.querySelector(".word.active");
  cursor.style.top = nextWord.getBoundingClientRect().top + "px";
  if (nextLetter) {
    cursor.style.left = nextLetter.getBoundingClientRect().left - 2 + "px";
  } else {
    cursor.style.left = nextWord.getBoundingClientRect().right - 5 + "px";
  }
  clearInterval(timer);
  document.getElementById('timer').innerHTML = 30;
};

const gameOver = () => {
  const wordsElement = document.getElementById("words");
  // wordsElement.style.marginTop = 0;
  for (let i = 0; i < 200; i++) {
    wordsElement.lastChild.remove();
  }
};
