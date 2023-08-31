import Nav from "./components/navBar";
import SideBar from "./components/SideBar";
import Game from "./components/typing_test/Game";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:5101/user/home").then((res) => {
      if (res.data !== "") {
        console.log(res.data);
        setUsername(res.data);
        auth.setAuthUser(res.data);
        console.log({authUser: auth.authUser});
      }else{
        navigate('/');
      }
    });
  });

  return (
    <>
      <Nav user={username} />
      <SideBar />
      <Game />
    </>
  );
}
