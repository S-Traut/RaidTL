import { Component, For, JSX, createSignal, onMount } from "solid-js";
import styles from "./timeline_content.module.scss";
import CompositeTimelineBars from "@/components/composite/timeline_bars";
import CompositeTimelineEvent from "@/components/composite/timeline_event";
import {
  Action,
  get_actions,
  get_sidebar_width,
  line_height,
  set_inner_height,
} from "@/stores/timeline";

type ActionComponent<P = { action: Action; index: number }> = (
  props: P
) => JSX.Element;

const CompositeTimelineContent: Component = () => {
  let content: HTMLDivElement | undefined;

  function calculate_height() {
    if (content) {
      const height = get_actions.length * line_height;
      if (height > content.clientHeight) {
        set_inner_height(height);
      } else {
        set_inner_height(content.clientHeight);
      }
    }
  }

  onMount(calculate_height);
  window.addEventListener("resize", () => {
    calculate_height();
  });

  return (
    <div id="content" class={styles.content} ref={content}>
      <CompositeTimelineBars />
      <For each={get_actions}>
        {(action, i) => <PrivateAction action={action} index={i()} />}
      </For>
    </div>
  );
};

const PrivateAction: ActionComponent = (props) => {
  return (
    <>
      <div
        class={styles.action}
        style={{
          top: `${props.index * line_height}px`,
          width: `${get_sidebar_width()}px`,
        }}
      >
        <img src={props.action.icon} />
        <p>{props.action.name}</p>
      </div>
      <For each={props.action.events}>
        {(event, i) => (
          <CompositeTimelineEvent
            action={props.action}
            ai={props.index}
            ei={i()}
            event={event}
          />
        )}
      </For>
    </>
  );
};

export default CompositeTimelineContent;
