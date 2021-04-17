import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function AdminRoute({
  component: C,
  logged,
  role,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!logged) {
          return <Redirect to="/login" />;
        }
        if (role === 'ADMIN') {
          return <C {...props} />;
        }
        return <Redirect to="/" />;
      }}
    />
  );
}
