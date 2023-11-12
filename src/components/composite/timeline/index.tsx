import { Component, For, onCleanup } from "solid-js";
import styles from "./timeline.module.scss";
import { next_tick, prev_tick } from "@/services/service_timeline";
import CompositeTimelineHeader from "@/components/composite/timeline_header";
import CompositeTimelineContent from "@/components/composite/timeline_content";
import CompositeTimelineFooter from "@/components/composite/timeline_footer";

const CompositeTimeline: Component = () => {
  document.addEventListener("wheel", handleScroll);

  onCleanup(() => {
    document.removeEventListener("wheel", handleScroll);
  });

  function handleScroll(event: WheelEvent) {
    if (!event.shiftKey) return;
    if (event.deltaY > 0) {
      next_tick();
    } else prev_tick();
  }

  return (
    <div class={styles.timeline}>
      <CompositeTimelineHeader />
      <CompositeTimelineContent />
      <CompositeTimelineFooter />
    </div>
  );
};

export default CompositeTimeline;
