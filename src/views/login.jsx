import "./styles/login.scss";
import Nav from "./components/navBar";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BASE } from "../../env";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mssg, setMssg] = useState("");
  const [errorlogin, setErrorLogin] = useState("");
  const auth = useAuth();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get(`${BASE}/user/register`).then((res) => {
      console.log({ cookie: res });
      document.cookie = res.cookie;
      console.log(res.data);
      console.log(auth.authUser);
      if (res.data !== "") {
        navigate(`/home/:${res.data}`);
      }
    });
  });

  const handleSignUp = (e) => {
    e.preventDefault();

    axios.defaults.withCredentials = true;
    if (username !== "" && email !== "" && password !== "") {
      axios
        .post(`${BASE}/user/signUp`, {
          username: username,
          email: email,
          password: password,
        })
        .then((res) => {
          if (res.data === "Username already in use") {
            setError(res.data);
          } else {
            setMssg(res.data);
            console.log(mssg);
            navigate(`/home/:${username}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setError("please fill all fields");
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    axios.defaults.withCredentials = true;
    if (username !== "" && password !== "") {
      axios
        .post(`${BASE}/user/login`, {
          username: username,
          password: password,
        })
        .then((Response) => {
          console.log(Response.data);
          if (Response.data === "Invalid username") {
            setErrorLogin(Response.data);
          } else if (Response.data === true) {
            navigate(`/home/:${username}`);
          } else setErrorLogin("Wrong password");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setErrorLogin("please fill all the fields");
    }
  };

  const showClick = () => {
    const showIcon = '/visible.png';
    const hideIcon = '/public/hide.png';

    const password = document.getElementById('pass');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    const icon = document.getElementById('passwordVisibility');
    type === 'password' ? icon.setAttribute('src', showIcon) : icon.setAttribute('src', hideIcon);
    type === 'password' ? icon.setAttribute('title', 'show') : icon.setAttribute('title', 'hide');
  };

  return (
    <>
      <Nav />
      <div id="container">
        <form onSubmit={handleSignUp} id="signUp">
          <h2>SignUp</h2>
          <h3>{error}</h3>
          <div>
            <label htmlFor="Username">UserName</label>
            <input
              type="text"
              id="Username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">email</label>
            <input type="text" id="email" />
          </div>
          <div>
            <label htmlFor="confirmemail">confirm email</label>
            <input
              type="text"
              id="confirmemail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="passwordconfirm">cofirm password</label>
            <input type="password" id="passwordconfirm" />
          </div>
          <button>Register</button>
        </form>
        <form onSubmit={handleLogin} id="login">
          <h2>Login</h2>
          <h3>{errorlogin}</h3>
          <div>
            <label htmlFor="username">UserName</label>
            <input
              type="text"
              id="username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="pass">Password</label>
            <div id="input">
              <input
                type="password"
                id="pass"
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                id="passwordVisibility"
                src="/visible.png"
                alt="showPassword"
                title="show"
                onClick={showClick}
              />
            </div>
          </div>
          <button>login</button>
          <div id="Geust">
            <h2>Play Now!</h2>
            <p>
              Help your eyes relax by keeping them still. <br /> Login to play
              personalised training games,
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
