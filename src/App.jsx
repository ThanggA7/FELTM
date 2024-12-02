import React, { useState } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="container mx-auto p-4">
      {!isAuthenticated ? (
        isRegistering ? (
          <div
            className="text-white h-full flex justify-center items-center bg-cover"
            style={{ backgroundImage: "url('../src/assets/bg.png')" }}
          >
            <Register setIsAuthenticated={setIsAuthenticated} />
          </div>
        ) : (
          <div
            className="text-white h-[100vh] flex justify-center items-center bg-cover"
            style={{ backgroundImage: "url('../src/assets/bg.png')" }}
          >
            <Login setIsAuthenticated={setIsAuthenticated} />
          </div>
        )
      ) : (
        <Home />
      )}
    </div>
  );
}

export default App;
