import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export default function UnauthenticatedRoute({
  component: C,
  logged,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={(props) => (
        !logged ? <C {...props} /> : <Redirect to="/" />)}
    />
  );
}
