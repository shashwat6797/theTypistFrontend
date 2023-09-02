import { useState } from "react";
import Test from "./layout";
import Result from "./Result";
import '../styles/game.scss'

const Game = () => {
  const [result, setResult] = useState(false);
  const showResult = (bool) => {
    setResult(bool);
  }

  return <div id="game_container">{result ? <Result showResult={showResult} /> : <Test showResult={showResult}/>}</div>;
};

export default Game;
