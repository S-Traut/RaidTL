import { Component } from "solid-js";
import styles from "./timeline_header.module.scss";

const CompositeTimelineFooter: Component = () => {
  return (
    <div class={styles.header}>
      <h1>RaidTL</h1>
      <button>NEW PROJECT</button>
    </div>
  );
};

export default CompositeTimelineFooter;
