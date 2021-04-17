import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function AuthenticatedRoute({
  component: C,
  logged,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => (
        logged ? <C {...props} /> : <Redirect to="/login" />
      )}
    />
  );
}
