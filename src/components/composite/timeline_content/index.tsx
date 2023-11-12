import { Component, For, JSX } from "solid-js";
import styles from "./timeline_content.module.scss";
import CompositeTimelineBars from "@/components/composite/timeline_bars";
import CompositeTimelineEvent from "@/components/composite/timeline_event";
import { Action, get_actions, line_height } from "@/stores/timeline";

type ActionComponent<P = { action: Action; index: number }> = (
  props: P
) => JSX.Element;

const CompositeTimelineContent: Component = () => {
  return (
    <div class={styles.content}>
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
        style={{ top: `${props.index * line_height}px` }}
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
