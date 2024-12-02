import React, { useState } from "react";
import Header from "./components/Layout/Header/Header";
import { Route, Routes } from "react-router-dom";
import PublicRouter from "./Routes";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <Routes>
          {PublicRouter.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
        </Routes>
      </div>
    </>
  );
}

export default App;
