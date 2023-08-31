import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import SideBar from "./components/SideBar";
import Nav from "./components/navBar";
import "./styles/profile.scss";
import axios from "axios";

const Profile = () => {
  const auth = useAuth();
  const [User, setUser] = useState("Null");
  const [date, setDate] = useState([]);
  const [bestWPM, setBestWPM] = useState(0);
  const [bestacc, setBestAcc] = useState(0);
  const [tenAvg, setTenAvg] = useState(0);
  const [avg, setAvg] = useState(0);
  const [tenAcc, setTenAcc] = useState(0);
  const [acc, setAcc] = useState(0);

  const calcWpm = (res) => {
    let avg = 0;
    if (res.length < 10) {
      res.forEach((element) => {
        avg = avg + element.wpm;
      });
      setAvg(Math.ceil(avg / res.length));
      setTenAvg(Math.ceil(avg / res.length));
    } else {
      res.forEach((element) => {
        avg = avg + element.wpm;
      });
      avg = Math.ceil(avg / res.length);
      setAvg(avg);
      avg =0;
      for (let i = res.length - 1; i >= res.length - 10; i--) {
        avg = avg + res[i].wpm;
      }
      avg = Math.ceil(avg / 10);
      setTenAvg(avg);
    }
    avg = 0;
    for(let i = 0; i < res.length-1; i++){
      if(avg < res[i].wpm){
        avg = res[i].wpm;
      }
    }
    setBestWPM(Math.ceil(avg));
  };

  const calcAcc = (res) => {
    let avg = 0;
    if (res.length < 10) {
      res.forEach((element) => {
        avg = avg + element.acc;
      });
      setTenAcc(Math.ceil(avg / res.length));
      setAcc(Math.ceil(avg / res.length));
    } else {
      res.forEach((element) => {
        avg = avg + element.acc;
      });
      avg = Math.floor(avg / res.length);
      setAcc(avg);
      avg=0;
      for (let i = res.length - 1; i >= res.length - 10; i--) {
        avg = avg + res[i].acc;
      }
      avg = Math.ceil(avg / 10);
      setTenAcc(avg);
    }
    avg = 0;
    for(let i = 0; i < res.length-1; i++){
      if(avg < res[i].acc){
        avg = res[i].acc;
      }
    }
    setBestAcc(Math.ceil(avg));
  };

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:5101/user/home").then((res) => {
      if (res.data !== "") {
        console.log(res.data);
        auth.setAuthUser(res.data);
        setUser(auth.authUser);
      } else {
        // navigate('/');
      }
    });
  });

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:5101/user/info").then((res) => {
      console.log(res.data);
      setDate(res.data.dateCreated.split("T"));
    });
  }, []);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:5101/test/profile").then((res) => {
      console.log(res.data);
      calcWpm(res.data);
      calcAcc(res.data);
    });
  }, []);

  axios.get("http://localhost:5101/test/profile");
  return (
    <div>
      <Nav />
      <SideBar />
      <div id="profileContainer">
        <div id="profileGrid">
          <div id="profile">
            <section>
              {User}
              <p>
                Joined on <br></br> <span id={"date"}>{date[0]}</span>
              </p>
            </section>
            <section id="bestwpm">
              Best <br /> WPM <br /> {bestWPM}
            </section>
            <section id="bestacc">
              Best <br /> Accuracy <br /> {bestacc}%
            </section>
          </div>
          <div className="card">
            <span className="heading">
              Average Wpm <br />Last 10 Games
            </span>
            {tenAvg} wpm
          </div>
          <div className="card">
            <span className="heading">
              Average Wpm <br /> All Games
            </span>
            {avg} wpm
          </div>
          <div className="card">
            <span className="heading">
              Average Accuracy <br /> Last 10 Games
            </span>
            {tenAcc}%
          </div>
          <div className="card">
            <span className="heading">
              Average Accuracy <br /> All Games
            </span>
            {acc}%
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
