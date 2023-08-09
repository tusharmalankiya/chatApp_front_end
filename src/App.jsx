import "./App.css";
import Home from "./pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import useLogin from "./hooks/useLogin";

import Messages from "./pages/Messages/Messages";


function App() {
  const { isLogin, setIsLogin } = useLogin();

  if (localStorage.getItem("token")) {
    setIsLogin(true);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Routes>
          {/* <Route path="/login" element={!isLogin ? <Login /> : <Navigate to="/" />} /> */}
          <Route path="/" element={isLogin ? <Home /> : <Login />} />

          <Route path="/chat/:receiverId" element={<Messages />} />

          <Route path="/register" element={<Register />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
