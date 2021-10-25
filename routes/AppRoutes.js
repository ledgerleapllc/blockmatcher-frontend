import React, { Suspense, lazy } from "react";
import { Switch, Route } from "react-router-dom";

const Dashboard = lazy(() => import("../views/app/dashboard"));
const BatchDetail = lazy(() => import("../views/app/dashboard/admin/batch/detail"));

export default function AppRoutes() {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path="/app" exact component={Dashboard} />
        <Route path="/app/batches/:batch_id" exact component={BatchDetail} />
      </Switch>
    </Suspense>
  );
}
