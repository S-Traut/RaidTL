/* @refresh reload */
import { render } from "solid-js/web";
import { Component, lazy } from "solid-js";
import { Route, Router, Routes } from "@solidjs/router";
import "$/scss/main.scss";

const home = lazy(() => import("@/views/home"));

const Application: Component = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" component={home} />
      </Routes>
    </Router>
  );
};

render(() => <Application />, document.getElementById("root")!);
