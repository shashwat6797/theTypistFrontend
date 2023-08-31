import { mapWords, reMapWord } from "./logic";
// import { newGame, restart } from "./input_logic";
import "../styles/test.scss";
import { useState } from "react";
import Cursor from "./cursor";
import {
  calcPracticeKeys,
  calcWpmSec,
  incrementIncorrect,
  incrementTyped,
  incrementTypedSec,
  incrementWrongTyped,
  incrementWrongTypedSec,
  resetResult,
  setTimestamps
} from "./result_logic";

var timer;
const view = 'home';
var wrdIndex = 0;

const Test = (props) => {
  const [gameStarted, setGameStarted] = useState(false);

  const gameClick = () => {
    setGameStarted(true);
    if (!gameStarted) {
      newGame();
    }
  };

  const addClass = (el, name) => {
    el.className = el.className + " " + name;
  };

  const removeClass = (el, name) => {
    el.classList.remove(name);
  };

  const sound = new Audio("../../../../public/click4_1.wav");
  

  const setTimer = () => {
    var time = document.getElementById("timer").innerHTML;
    let i = 1;
    timer = setInterval(() => {
      document.getElementById("timer").innerHTML = time;
      if (time > 0 ) {
        const typed = document.querySelectorAll(
          ".letter.correct",
          ".letter.incorrect"
        );
        var typedNo = typed.length;
        const wrong = document.querySelectorAll(".letter.incorrect");
        
        var wrongNo = wrong.length;
        incrementTypedSec(typedNo);
        incrementWrongTypedSec(wrongNo);
        calcWpmSec(i);
        time--;
        i++;
      } else {
          clearInterval(timer);
          gameOver();
      }
    }, 1000);
  };

  const newGame = () => {
    resetResult();
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

      // console.log({ expected: expected, key: k });
      //handle letter inputs
      if (isLetter) {
        // console.log(expected);
        if (k === expected) {
          addClass(currentLetter, "correct");
          removeClass(currentLetter, "active");
          if (currentLetter.nextSibling) {
            addClass(currentLetter.nextSibling, "active");
          }
          setTimestamps(expected, 'correct');
        } else {
          addClass(currentLetter, "incorrect");
          removeClass(currentLetter, "active");
          if (currentLetter.nextSibling) {
            addClass(currentLetter.nextSibling, "active");
          } else {
            //
          }
          setTimestamps(expected, 'incorrect');
          incrementIncorrect();
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
      cursor.style.top = nextWord.getBoundingClientRect().top + 2 + "px";
      if (nextLetter) {
        cursor.style.left = nextLetter.getBoundingClientRect().left - 2 + "px";
      } else {
        cursor.style.left = nextWord.getBoundingClientRect().right + "px";
      }

      //scroll lines
      if (
        currentWord.nextSibling.getBoundingClientRect().bottom >
          document.getElementById("game").getBoundingClientRect().bottom - 20 &&
        !currentLetter
      ) {
        const words = document.getElementById("words");
        const margin = parseInt(words.style.marginTop || "0px");
        words.style.marginTop = margin - 42 + "px";
        const nextLetter = document.querySelector(".letter.active");
        const nextWord = document.querySelector(".word.active");
        cursor.style.top = nextWord.getBoundingClientRect().top + 2 + "px";
        if (nextLetter) {
          cursor.style.left =
            nextLetter.getBoundingClientRect().left - 2 + "px";
        } else {
          cursor.style.left = nextWord.getBoundingClientRect().right - 5 + "px";
        }
      }
    });
  };

  const restart = () => {
    const wordsElement = document.getElementById("words");
    wordsElement.style.marginTop = 0;
    wrdIndex = 0;
    for (let i = 0; i < 200; i++) {
      wordsElement.lastChild.remove();
    }
    clearInterval(timer);
    document.getElementById("timer").innerHTML = 30;
    reMapWord();
    resetResult();
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
  };

  const gameOver = () => {
    const typed = document.querySelectorAll(
      ".letter.correct",
      ".letter.incorrect"
    );
    var typedNo = typed.length;
    const wrong = document.querySelectorAll(".letter.incorrect");
    var wrongNo = wrong.length;
    console.log(typedNo);
    console.log(wrongNo);
    incrementTyped(typedNo);
    incrementWrongTyped(wrongNo);
    calcPracticeKeys();
    const wordsElement = document.getElementById("words");
    // wordsElement.style.marginTop = 0;
    for (let i = 0; i < 200; i++) {
      wordsElement.lastChild.remove();
    }
    props.showResult(true);
  };

  return (
    <>
      <Cursor />
      <div id="test_container">
        <div id="game_info">
          <div id="timer">30</div>
          <div id="lang">english</div>
        </div>
        <div id="game">
          <div id="error">Click to play game!</div>
          <div id="words" tabIndex={0} onClick={gameClick}>
            {mapWords().map((wrd) => {
              return wrd;
            })}
          </div>
        </div>
        <button id="restart" onClick={restart}>
          Restart
        </button>
      </div>
    </>
  );
};

export default Test;
