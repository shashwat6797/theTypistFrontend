import "./styles/navBar.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {BASE} from '../../../env';

export default function Nav(props) {
  const auth = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    axios.defaults.withCredentials = true;
    axios.get(`${BASE}/user/logout`).then((res) => {
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
        <a href={auth.authUser ? null : '/'}>
          <h1>theTypist</h1>
        </a>
        <li></li>
        {props.user ? (
          <li id="logout">
            <a title="username">{props.user}</a>
            <a title="logout" onClick={handleLogout}>
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
