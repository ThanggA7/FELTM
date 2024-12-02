import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        username,
        password,
      });
      setIsAuthenticated(true);
      setErrorMessage("");
      navigate("/a");
    } catch (error) {}
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-lg font-bold">Đăng nhập</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      <div>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border px-4 py-2 rounded-lg focus:outline-none w-full"
        />
      </div>
      <div>
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border px-4 py-2 rounded-lg focus:outline-none w-full"
        />
      </div>
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600"
        disabled={isLoading}
      >
        {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
      </button>
    </div>
  );
}

export default Login;
