import "./styles/navBar.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Nav(props) {
  const auth = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    axios.defaults.withCredentials = true;
    axios.get("http://localhost:5101/user/logout").then((res) => {
      if(res.data === ""){
        auth.setAuthUser(null);
        // console.log(auth.authUser); 
        navigate(`/`);
      }
    });
  }

  return (
    <header>
      <nav>
        <a href="/">
          <h1>theTypist</h1>
        </a>
        <li></li>
        {props.user ? (
          <li id="logout">
            <a>{props.user}</a>
            <a  onClick={handleLogout}>
              <img type="image/svg+xml" src="/icons8-logout-96.png" />
            </a>
          </li>
        ) : (
          <li></li>
        )}
      </nav>
    </header>
  );
}
