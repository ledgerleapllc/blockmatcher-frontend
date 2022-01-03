import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import PublicRoute from "./PublicRoute";

const LoginView = lazy(() => import("../views/account/Login"));
const RegisterView = lazy(() => import("../views/account/Register"));
const ForgotPasswordView = lazy(() => import("../views/account/ForgotPassword"));

const ResetPasswordView = lazy(() =>
  import("../views/account/ResetPassword")
);

export default function LandingRoutes({ auth }) {

  if (auth && auth.id) return <Redirect to="/app" />
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route exact path="/">
          {auth && auth.id ?
            <Redirect to="/app" /> :
            <Redirect to="/login" />
          }
        </Route>
        <PublicRoute auth={auth} exact path="/login">
          <LoginView />
        </PublicRoute>
        <PublicRoute auth={auth} exact path="/register">
          <RegisterView />
        </PublicRoute>
        <PublicRoute auth={auth} exact path="/forgot-password">
          <ForgotPasswordView />
        </PublicRoute>
        <PublicRoute auth={auth} exact path="/password/reset/:token">
          <ResetPasswordView />
        </PublicRoute>
        <Route>
          <h2 className="text-center mt-4 mb-3">Not Found</h2>
        </Route>
      </Switch>
    </Suspense>
  );
}
