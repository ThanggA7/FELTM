import React, { useState } from "react";
import Header from "./components/Layout/Header/Header";
import { Route, Routes } from "react-router-dom";
import PublicRouter from "./Routes";
import Login from "./components/Layout/Login/Login";
import Register from "./components/Layout/Register/Register";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(true);

  return (
    <>
      {!isAuthenticated ? (
        isRegistering ? (
          <div
            className="text-white h-[100vh] flex justify-center items-center bg-cover"
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
        <div className="container mx-auto p-4">
          (<Header />
          )(
          <Routes>
            {PublicRouter.map((route, index) => {
              const Page = route.component;
              return <Route key={index} path={route.path} element={<Page />} />;
            })}
          </Routes>
          )
        </div>
      )}
    </>
  );
}

export default App;
