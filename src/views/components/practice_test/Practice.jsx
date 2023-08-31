import { useState , useEffect} from "react";
import Result from "../typing_test/Result";
import '../../styles/practice.scss'
import PracticeTest from "./practice_layout";

const PracticeGame = () => {
  const [result, setResult] = useState(false);
  const showResult = (bool) => {
    setResult(bool);
  }

  useEffect(()=>{
    console.log('result:'+result);    
  },[result]);

  return <div id="game_container">{result ? <Result /> : <PracticeTest showResult={showResult}/>}</div>;
};

export default PracticeGame;
