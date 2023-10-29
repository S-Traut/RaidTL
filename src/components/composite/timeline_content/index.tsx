import { Component, For, Show } from "solid-js";
import styles from "./timeline_content.module.scss";
import CompositeTimelineBars from "@/components/composite/timeline_bars";
import CompositeTimelineEvent from "@/components/composite/timeline_event";
import {
  Action,
  get_actions,
  get_tick,
  get_time,
  get_zoom,
} from "@/stores/timeline";

const CompositeTimelineContent: Component = () => {
  function event_position(time: number) {
    return (time - get_time()) * (get_zoom() * 0.01) + 100;
  }

  function in_viewport(action: Action, event: number) {
    const event_s = event_position(event);
    const event_e = event_position(event + action.cooldown);
    return event_e > 0 && event_s < window.innerWidth + get_tick();
  }

  return (
    <div class={styles.content}>
      <CompositeTimelineBars />
      <For each={get_actions}>
        {(action, i) => (
          <>
            <div class={styles.action} style={{ top: `${i() * 20}px` }}>
              <img src={action.icon} />
              <p>{action.name}</p>
            </div>
            <For each={action.events}>
              {(event, j) => (
                <Show when={in_viewport(action, event)}>
                  <CompositeTimelineEvent
                    action={action}
                    ai={i()}
                    ei={j()}
                    event={event}
                  />
                </Show>
              )}
            </For>
          </>
        )}
      </For>
    </div>
  );
};

export default CompositeTimelineContent;
