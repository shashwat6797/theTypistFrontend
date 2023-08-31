import axios from "axios";

var charactersTyped = 0;
var wrongCharacters = 0;
var charactersTypedSec = 0;
var wrongCharactersSec = 0;
var incorrect = 0;
var wpm = 0;
var acc = 0;
var wpmSec = [];
var timestamp = [];
var practiceKeys = [];

export const getWpm = () => {
  console.log({
    charactersTyped: charactersTyped,
    wrongCharacters: wrongCharacters,
  });
  wpm = (charactersTyped / 5 - wrongCharacters / 5) * 2;
  return Math.ceil(wpm);
};

export const getAcc = () => {
  if (charactersTyped !== 0) acc = 100 - (incorrect / charactersTyped) * 100;
  return Math.floor(acc);
};

export const incrementTyped = (value) => {
  charactersTyped = charactersTyped + value;
};

export const incrementWrongTyped = (value) => {
  wrongCharacters = wrongCharacters + value;
};

export const incrementTypedSec = (value) => {
  charactersTypedSec = value;
};

export const incrementWrongTypedSec = (value) => {
  wrongCharactersSec = value;
};

export const incrementIncorrect = () => {
  incorrect++;
};

export const resetResult = () => {
  charactersTyped = 0;
  wrongCharacters = 0;
  charactersTypedSec = 0;
  wrongCharactersSec = 0;
  incorrect = 0;
  wpm = 0;
  acc = 0;
  wpmSec = [];
  timestamp = [];
  practiceKeys = [];
};

export const calcWpmSec = (t) => {
  let ans = Math.ceil(
    (charactersTypedSec / 5 - wrongCharactersSec / 5) * (60 / t)
  );
  wpmSec.push(ans);
};

export const getWpmSec = () => {
  return wpmSec;
};

export const setTimestamps = (key, type) => {
  timestamp.push({ time: Date.now(), letter: key, type: type });
};

export const calcPracticeKeys = () => {
  practiceKeys.push(0);
  for (let i = 1; i < timestamp.length; i++) {
    practiceKeys.push(timestamp[i].time - timestamp[i - 1].time);
  }
  let avg = 0;
  practiceKeys.map((el) => {
    avg = avg + el;
  });
  avg = avg / practiceKeys.length;
  practiceKeys = [];
  for (let i = 1; i < timestamp.length; i++) {
    if (avg < timestamp[i].time - timestamp[i - 1].time && timestamp[i].letter != timestamp[i - 1].letter) {
      const diff = timestamp[i].time - timestamp[i - 1].time;
      practiceKeys.push({ key1: timestamp[i - 1].letter, key2: timestamp[i].letter, diff:diff});
    }
  }
  console.log('practice Key' + practiceKeys);
};

export const saveResult = () => {
  axios.defaults.withCredentials = true;
  axios
    .post("http://localhost:5101/test/result", { wpm, acc, time: 30, practiceKeys })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
