import Nav from "./components/navBar";
import SideBar from "./components/SideBar";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./styles/leaderboard.scss";
import { useTable } from "react-table";
const Leaderboard = () => {
  const auth = useAuth();
  const [data, setData] = useState([]);
  const columns = [
    {
      Header: "Username",
      accessor: "userId",
    },
    {
      Header: "Speed",
      accessor: "wpm",
    },
    {
      Header: "Accuracy",
      accessor: "acc",
    },
  ];

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

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:5101/test/leaderboard").then((res) => {
      console.log(res.data);
      setData(res.data);
    });
  }, []);

  return (
    <div>
      <Nav />
      <SideBar />
      <div id="leaderboardContainer">
      <h1>LeaderBoard</h1>
        <div id="header">
          <h2>Username</h2>
          <h2>Speed</h2>
          <h2>Accuracy</h2>
        </div>
        <div id="tableContainer">
          <table>
            <tbody>
              {data.map((e) => {
                return (
                  <>
                    <tr>
                      <td>{e.userId}</td>
                      <td>{Math.ceil(e.wpm)} wpm</td>
                      <td>{Math.ceil(e.acc)}%</td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
