import Nav from "./components/navBar";
import Result from "./components/typing_test/Result";
import Test from "./components/typing_test/layout";
import { useState } from "react";
import './styles/guest.scss';

const Guest = () => {
  const [result, setResult] = useState(false);
  const showResult = (bool) => {
    setResult(bool);
  };

  return (
    <>
      <Nav></Nav>
      <div id="guestGame">
        {result ? <Result guest={true} showResult={showResult} /> : <Test showResult={showResult} />}
      </div>
    </>
  );
};

export default Guest;
