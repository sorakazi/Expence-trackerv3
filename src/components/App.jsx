import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Layout } from "components/Layout/Layout";
import PublicWelcomeRoute from "routes/PublicWelcomeRoute";
import PublicLoginRoute from "routes/PublicLoginRoute";
import PageNotFound from "pages/Auth/PageNotFound/PageNotFound";
import { refreshThunk } from "../redux/auth/operations";
import PageLoader from "./PageLoader/PageLoader";
import { selectIsRefreshing } from "../redux/auth/selectors";
export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(refreshThunk());
  }, [dispatch]);

  return isRefreshing ? (
    <PageLoader />
  ) : (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<PublicWelcomeRoute />} />
          <Route path="login" element={<PublicLoginRoute />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
