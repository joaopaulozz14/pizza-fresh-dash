import { Routes, Route } from "react-router-dom";
import { RoutePath } from "./types/routes";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import ManageProducts from "./components/ManageProducts";
import ManageUsers from "./components/ManageUsers";
import ManageTables from "./components/ManageTables";

const Router = () => {
  return (
    <Routes>
      <Route path={RoutePath.HOME} element={<Home />} />
      <Route path={RoutePath.LOGIN} element={<Login />} />
      <Route path={RoutePath.SETTINGS} element={<Settings />}>
        <Route
          path={RoutePath.SETTINGS_PRODUCTS}
          element={<ManageProducts />}
        />
        <Route path={RoutePath.SETTINGS_USERS} element={<ManageUsers />} />
        <Route path={RoutePath.SETTINGS_TABLES} element={<ManageTables />} />
      </Route>
    </Routes>
  );
};

export default Router;
