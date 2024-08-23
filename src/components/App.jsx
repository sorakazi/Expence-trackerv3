import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Layout } from "components/Layout/Layout";
import MainTransactionsProtectedRoute from "routes/MainTransactionsProtectedRoute";
import PublicWelcomeRoute from "routes/PublicWelcomeRoute";
import PublicLoginRoute from "routes/PublicLoginRoute";
import PublicRegisterRoute from "routes/PublicRegisterRoute";
import TransactionsHistoryProtectedRoute from "routes/TransactionsHistoryProtectedRoute";
import PageNotFound from "pages/PageNotFound/PageNotFound";
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
          <Route
            path="transactions/:transactionsType"
            element={<MainTransactionsProtectedRoute />}
          />
          <Route
            path="/transactions/history/:transactionsType"
            element={<TransactionsHistoryProtectedRoute />}
          />

          <Route path="/" element={<PublicWelcomeRoute />} />
          <Route path="login" element={<PublicLoginRoute />} />
          <Route path="register" element={<PublicRegisterRoute />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </div>
  );
};
