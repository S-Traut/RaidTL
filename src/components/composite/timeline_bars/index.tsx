import { Component, For, JSX, createSignal } from "solid-js";
import styles from "./timeline_bars.module.scss";
import {
  get_inner_height,
  get_sidebar_width,
  get_tick,
  get_zoom,
  zoom_factor,
} from "@/stores/timeline";
import { bar_width } from "@/services/service_timeline";

type BarComponent<P = { index: number }> = (props: P) => JSX.Element;

const CompositeTimelineBars: Component = () => {
  const [get_vw, set_vw] = createSignal(window.innerWidth);
  window.addEventListener("resize", () => {
    set_vw(window.innerWidth);
  });

  function bar_count() {
    const sidebar_width = get_sidebar_width();
    return Math.floor((get_vw() - sidebar_width) / (bar_width() * 2)) + 1;
  }

  return (
    <For each={Array(bar_count()).fill(null)}>
      {(_, i) => <PrivateBar index={i()} />}
    </For>
  );
};

const PrivateBar: BarComponent = (props) => {
  function position() {
    return (
      get_tick() * props.index * get_zoom() * 2 * zoom_factor +
      get_sidebar_width()
    );
  }

  return (
    <div
      class={styles.bar}
      style={{
        left: `${position()}px`,
        width: `${bar_width()}px`,
        height: `${get_inner_height()}px`,
      }}
    />
  );
};

export default CompositeTimelineBars;
