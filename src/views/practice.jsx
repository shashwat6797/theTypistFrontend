import Nav from "./components/navBar";
import SideBar from "./components/SideBar";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import PracticeGame from "./components/practice_test/Practice";
import { BASE } from "../../env";
import { useNavigate } from "react-router-dom";

const Practice = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const sideBar = document.getElementById('practice');
    sideBar.style.backgroundColor = '#ffffff66';
    axios.defaults.withCredentials = true;
    axios.get(`${BASE}/user/home`).then((res) => {
      if (res.data !== "") {
        console.log(res.data);
        auth.setAuthUser(res.data);
      } else {
        navigate('/');
      }
    });
  }, [auth]);

  return (
    <div>
      <Nav user={auth.authUser}/>
      <SideBar />
      <div id="practiceContainer">
        <PracticeGame />
      </div>
    </div>
  );
};

export default Practice;
