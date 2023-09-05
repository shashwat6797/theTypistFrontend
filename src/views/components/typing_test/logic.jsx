import { words_english }  from "../../../../public/words/english.js";
import { english_1k } from "../../../../public/words/english_1k.js";
import { english_5k } from "../../../../public/words/english_5k.js";
import { javascript } from "../../../../public/words/javascript.js";

//Global variables
var wordListLength = words_english.length;

const getLanguage = (lang) => {
  switch (lang) {
    case 'english': wordListLength = words_english.length; console.log({wordList: words_english}); return words_english;
    
    case 'eng1k': wordListLength = english_1k.length; console.log({wordList: english_1k}); return english_1k; 

    case 'eng5k': wordListLength = english_5k.length; console.log({wordList: english_5k}); return english_5k;
    
    case 'javascript': wordListLength = javascript.length; console.log({wordList: javascript}); return javascript; 
  
    default: return words_english;
  }
}

const wordList = (lang) => {
  let randomIndex;
  let wrdlist = [];
  let language = getLanguage(lang);
  for (let i = 0; i < 200; i++) {
    randomIndex = Math.ceil(Math.random() * wordListLength - 1);
    wrdlist[i] = language[randomIndex];
  }
  return wrdlist;
};

const mapLetter = (lttr) => {
  return <span className="letter">{lttr}</span>;
};

export const mapWords = (lang) => {
  const wrdlist = wordList(lang);
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

export const reMapWord = (lang) => {
  const wrdlist = wordList(lang);
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
