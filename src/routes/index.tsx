import { BrowserRouter, Routes, Route } from "react-router-dom";

import Records from "../pages/private/Records";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/public/Login";
import CustomSnackBar from "@components/CustomSnackBar";
import useSession from "@hooks/useSession";
import { ISessionContext } from "@interfaces/general.interfaces";
import Main from "@components/Main";

const Router = () => {
  const { isUserLoggedIn } = useSession() as ISessionContext;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/"  element={
              <PublicRoute
                path="/"
                component={Login}
                isUserLoggedIn={isUserLoggedIn}
                redirectPath="/records"
              />
            } />
          
          <Route path="/" element={<Main />}>
            
            <Route
              path="/records/*"
              element={
                <PrivateRoute
                  path="/"
                  component={Records}
                  isUserLoggedIn={isUserLoggedIn}
                  redirectPath={"/"}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <CustomSnackBar />
    </>
  );
};

export default Router;
