import React from 'react';
import {
  RouteProps as ReactRouteProps,
  Route as ReactRoute,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactRouteProps {
  isPrivete?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivete = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactRoute
      {...rest}
      render={({ location }) => {
        return isPrivete === !!user ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivete ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
