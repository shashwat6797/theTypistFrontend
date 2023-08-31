import { words_english } from "../../../../public/words/english.js";

//Global variables
const wordListLength = words_english.length;

const wordList = () => {
  let randomIndex;
  let wrdlist = [];
  for (let i = 0; i < 200; i++) {
    randomIndex = Math.ceil(Math.random() * wordListLength - 1);
    wrdlist[i] = words_english[randomIndex];
  }
  return wrdlist;
};

const mapLetter = (lttr) => {
  return <span className="letter">{lttr}</span>;
};

export const mapWords = () => {
  const wrdlist = wordList();
  let res = [];
  for (let i = 0; i < 200; i++) {
    res[i] = (
      <div className="word">
        {wrdlist[i].split("").map((lttr) => mapLetter(lttr))}
      </div>
    );
    // document.getElementById("words").appendChild(res[i]);
  }
  return res;
};

export const reMapWord = () => {
  const wrdlist = wordList();
  for (let i = 0; i < 200; i++) {
    const el = document.createElement('div');
    el.className = "word";
    wrdlist[i].split('').map(lttr => {
      const lttrEl = document.createElement('span');
      lttrEl.className = 'letter';
      lttrEl.innerHTML = lttr;
      el.appendChild(lttrEl);
    })
    document.getElementById("words").appendChild(el); 
  }

  return null;
};

const addClass = (el, name) => {
  el.className = el.className + " " + name;
};

export const newGame = () => {
  addClass(document.querySelector(".word"), "active");
};
