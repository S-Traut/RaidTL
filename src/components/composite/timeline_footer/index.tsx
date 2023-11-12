import { Component, For } from "solid-js";
import styles from "./timeline_footer.module.scss";
import * as timeline from "@/services/service_timeline";
import { get_time } from "@/stores/timeline";

const CompositeTimelineFooter: Component = () => {
  return (
    <div class={styles.footer}>
      <div class={styles.time}>
        <p class={styles.seconds}>{timeline.get_timestamp()}</p>
        <p class={styles.timestamp}>{get_time()}</p>
      </div>
      <button onclick={timeline.increase_zoom}>+</button>
      <button onclick={timeline.decrease_zoom}>-</button>
      <div class={styles.timebar}></div>
    </div>
  );
};

export default CompositeTimelineFooter;
