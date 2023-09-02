import Nav from "./components/navBar";
import SideBar from "./components/SideBar";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./styles/leaderboard.scss";
// import { useTable } from "react-table";
import { useNavigate } from "react-router-dom";
import { BASE } from "../../env";

const Leaderboard = () => {
  const auth = useAuth();
  const [data, setData] = useState([]);
  const navigate  = useNavigate();
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
    axios.get(`${BASE}/user/home`).then((res) => {
      if (res.data !== "") {
        console.log(res.data);
        auth.setAuthUser(res.data);
      } else {
        navigate('/');
      }
    });
  }, [auth]);

  function sortJSONByKey(jsonArray, key) {
    if (!Array.isArray(jsonArray) || jsonArray.length === 0) {
      return jsonArray; // Return the input array if it's not valid or empty
    }
  
    // Custom comparison function to sort objects based on the specified key
    function compareObjects(a, b) {
      const valueA = a[key];
      const valueB = b[key];
  
      if (valueA < valueB) {
        return 1;
      }
      if (valueA > valueB) {
        return -1;
      }
      return 0;
    }
  
    // Sort the JSON array in-place using the custom comparison function
    jsonArray.sort(compareObjects);
  
    return jsonArray;
  }
  
  // Example usage:
  // const jsonData = [
  //   { name: 'John', age: 30 },
  //   { name: 'Alice', age: 25 },
  //   { name: 'Bob', age: 35 },
  // ];
  
  // const sortedData = sortJSONByKey(jsonData, 'age');
  // console.log(sortedData);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get(`${BASE}/test/leaderboard`).then((res) => {
      console.log(res.data);
      const sortedData = sortJSONByKey(res.data, 'wpm');
      setData(sortedData);
    });
  }, []);

  return (
    <div>
      <Nav user={auth.authUser} />
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
                      <td>{parseFloat(e.wpm).toFixed(2)} wpm</td>
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
