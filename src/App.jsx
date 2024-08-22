import React from "react";
import Logo from "./components/header/logo/Logo"; // Update the path as necessary
import WelcomePage from "pages/WelcomePage/WelcomePage";

const App = () => {
  // Determine if the user is logged in
  const isLoggedIn = false; // Replace this with actual logic to determine login status

  return (
    <div>
      <Logo isLoggedIn={isLoggedIn} />
      <WelcomePage />
    </div>
  );
};

export default App;
