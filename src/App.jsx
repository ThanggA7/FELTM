import React, { useState } from "react";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <div className="container mx-auto p-4">
      {isAuthenticated ? (
        isRegistering ? (
          <Register setIsAuthenticated={setIsAuthenticated} />
        ) : (
          <Login setIsAuthenticated={setIsAuthenticated} />
        )
      ) : (
        <Home />
      )}

   
    </div>
  );
}

export default App;
