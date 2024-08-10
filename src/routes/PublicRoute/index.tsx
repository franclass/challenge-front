import React from 'react';
import { Route, Navigate, RouteProps, Routes} from 'react-router-dom';

type PublicRouteProps = {
    component: any;
    isUserLoggedIn: boolean;
    redirectPath: string;
  } & RouteProps;
  
  const PublicRoute: React.FC<PublicRouteProps> = ({
    component: Component,
    isUserLoggedIn,
    redirectPath,
    ...rest
  }) => {
    if (isUserLoggedIn && isUserLoggedIn !== null) {
        return <Navigate to={redirectPath} replace />;
    } 

    return <Routes>
        <Route {...rest} element={<Component />} />
        </Routes>;
  };

export default PublicRoute;
