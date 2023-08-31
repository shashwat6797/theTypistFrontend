import Nav from "./components/navBar";
import SideBar from "./components/SideBar";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import PracticeGame from "./components/practice_test/Practice";

const Practice = () => {
  const auth = useAuth();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:5101/user/home").then((res) => {
      if (res.data !== "") {
        console.log(res.data);
        auth.setAuthUser(res.data);
      } else {
        // navigate('/');
      }
    });
  }, []);

  return (
    <div>
      <Nav />
      <SideBar />
      <div id="practiceContainer">
        <PracticeGame />
      </div>
    </div>
  );
};

export default Practice;
