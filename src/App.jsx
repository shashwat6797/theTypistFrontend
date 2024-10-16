import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/home";
import LoginPage from "./views/login";
import { AuthProvider } from "./context/AuthContext";
import Profile from "./views/profile";
import { useAuth } from "./context/AuthContext";
import Leaderboard from "./views/leaderboard";
import Practice from "./views/practice";
import Guest from "./views/guest";
import Challenge from "./views/challenge";

export default function App() {
  const user = '';
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />}></Route>
          <Route path='/home/:id' element={<Home /> }></Route>
          <Route path='/profile/:id' element={<Profile />}></Route>
          <Route path="/leaderboard" element={<Leaderboard />}></Route>
          <Route path="/practice/:id" element={<Practice/>}></Route>
          <Route path="/challenge/:id" element={<Challenge/>}></Route>
          <Route path="/guest" element={<Guest/>}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
