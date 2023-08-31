import "./styles/cardsMenu.scss";
import { useAuth } from "../../context/AuthContext";

export default function SideBar() {
  const auth = useAuth();
  return (
    <aside>
      <div id="menu_container">
        <div>
          {" "}
          <img src="/user.svg" alt="user" />{" "}
          <a href={`/profile/:${auth.authUser}`}>Profile</a>
        </div>
        <div>
          {" "}
          <img src="/keyboard.png" alt="user" />{" "}
          <a href={`/home/:${auth.authUser}`}>Game</a>
        </div>
        <div>
          {" "}
          <img src="/lesson.png" alt="user" />{" "}
          <a href={`/practice/:${auth.authUser}`}>Practice</a>
        </div>
        <div>
          {" "}
          <img src="/leaderboard.png" alt="user" />{" "}
          <a href="/leaderboard">LeaderBoard</a>
        </div>
        <div className="space">
          
        </div>
        <div className="space"> </div>
        <div>
          {" "}
          <img src="/setting.png" alt="user" /> <a href="/">Settings</a>
        </div>
      </div>
    </aside>
  );
}
