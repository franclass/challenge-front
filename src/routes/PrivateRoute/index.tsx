import React from 'react';
import { Navigate, Route, RouteProps, Routes } from 'react-router-dom';

type PrivateRouteProps = {
    component: any;
    isUserLoggedIn: boolean;
    redirectPath: string;
  } & RouteProps;
  
  const PrivateRoute: React.FC<PrivateRouteProps> = ({
    component: Component,
    isUserLoggedIn,
    redirectPath,
    ...rest
  }) => {

    if (!isUserLoggedIn && isUserLoggedIn !== null) {
        return <Navigate to={redirectPath} replace />;
    } 
    return <Routes><Route {...rest} element={<Component />} /></Routes>;
   
  };

export default PrivateRoute;
