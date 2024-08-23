import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Logo from "./components/header/logo/Logo"; // Update the path as necessary
import WelcomePage from "pages/WelcomePage/WelcomePage";
import PageNotFound from "pages/PageNotFound/PageNotFound";
import PageLoader from "./components/PageLoader/PageLoader";
import { selectIsRefreshing } from "./redux/auth/selectors";
const App = () => {
  // Determine if the user is logged in
  const isLoggedIn = false; // Replace this with actual logic to determine login status
  const isRefreshing = useSelector(selectIsRefreshing);
  return isRefreshing ? (
    <PageLoader />
  ) : (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Logo isLoggedIn={isLoggedIn} />
              <WelcomePage />
            </>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
