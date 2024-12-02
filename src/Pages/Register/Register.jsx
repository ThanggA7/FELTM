import React, { useState } from "react";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp!");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/register", {
        username,
        password,
      });
      setSuccessMessage(response.data.message);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.response.data.error || "Đăng ký thất bại");
      setSuccessMessage("");
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-lg font-bold">Đăng ký</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
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
      <div>
        <input
          type="password"
          placeholder="Xác nhận mật khẩu"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border px-4 py-2 rounded-lg focus:outline-none w-full"
        />
      </div>
      <button
        onClick={handleRegister}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600"
      >
        Đăng ký
      </button>
    </div>
  );
}

export default Register;
