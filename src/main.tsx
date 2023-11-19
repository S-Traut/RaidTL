/* @refresh reload */
import { render } from "solid-js/web";
import { Component, lazy } from "solid-js";
import { Route, Router, Routes } from "@solidjs/router";
import "$/scss/main.scss";

const timeline = lazy(() => import("@/views/timeline"));

const Application: Component = () => {
  return (
    <Router>
      <Routes>
        <Route path="/tl/:id?" component={timeline} />
      </Routes>
    </Router>
  );
};

render(() => <Application />, document.getElementById("root")!);
