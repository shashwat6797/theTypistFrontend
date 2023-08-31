import axios from "axios";

const getWords = (list) => {
  let randomLen;
  let wrd = "";
  let wrdlist = [];
  let wi = 0;

  for (let i = 0; i < 200; i++) {
    randomLen = Math.ceil(Math.random() * 3);
    randomLen < 1 ? (randomLen = 1) : randomLen;
    for (let j = 0; j < randomLen; j++) {
      if (list[wi] != list[wi + 1]) {
        wrd = wrd + list[wi] + list[wi + 1];
      }
      wi++;
    }
    wrdlist.push(wrd);
    wrd = "";
  }
  return wrdlist;
};

const mapLetter = (lttr) => {
  return <span className="letter">{lttr}</span>;
};

export const mapWords = (list) => {
  const wrdlist = getWords(list);
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

export const reMapWord = (list) => {
  const wrdlist = getWords(list);
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
