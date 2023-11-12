import { Component, For, JSX } from "solid-js";
import styles from "./timeline_bars.module.scss";
import { get_tick, get_zoom, zoom_factor } from "@/stores/timeline";
import { bar_count, bar_width } from "@/services/service_timeline";

type BarComponent<P = { index: number }> = (props: P) => JSX.Element;

const CompositeTimelineContent: Component = () => {
  return (
    <For each={Array(bar_count()).fill(null)}>
      {(_, i) => <PrivateBar index={i()} />}
    </For>
  );
};

const PrivateBar: BarComponent = (props) => {
  function position() {
    return get_tick() * props.index * get_zoom() * 2 * zoom_factor + 100;
  }

  return (
    <div
      class={styles.bar}
      style={{
        left: `${position()}px`,
        width: `${bar_width()}px`,
      }}
    />
  );
};

export default CompositeTimelineContent;
