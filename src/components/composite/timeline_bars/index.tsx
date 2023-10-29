import { Component, For, createSignal } from "solid-js";
import styles from "./timeline_bars.module.scss";
import { get_tick, get_zoom } from "@/stores/timeline";

const CompositeTimelineContent: Component = () => {
  const f = 0.01;

  function bar_position(index: number) {
    return get_tick() * index * get_zoom() * 2 * f + 100;
  }

  function bar_count() {
    return Math.floor((window.innerWidth - 100) / (bar_width() * 2)) + 1;
  }

  function bar_width() {
    return get_tick() * get_zoom() * f;
  }

  return (
    <For each={Array(bar_count()).fill(null)}>
      {(_, i) => (
        <div
          class={styles.bar}
          style={{
            left: `${bar_position(i())}px`,
            width: `${bar_width()}px`,
          }}
        />
      )}
    </For>
  );
};

export default CompositeTimelineContent;
