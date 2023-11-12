import { JSX, Show, createSignal, onCleanup } from "solid-js";
import styles from "./timeline_event.module.scss";
import { Action, get_tick, line_height } from "@/stores/timeline";
import {
  event_position,
  px_to_ms,
  snap,
  tick_zoom,
  update_event,
  zoom,
} from "@/services/service_timeline";

type Component<
  P = {
    action: Action;
    event: number;
    ai: number;
    ei: number;
  }
> = (props: P) => JSX.Element;
const CompositeTimelineEvent: Component = (props) => {
  const [get_drag, set_drag] = createSignal<number>(0);
  const [get_dragpos, set_dragpos] = createSignal<number | undefined>(
    undefined
  );

  function event_size(duration: number) {
    return duration * zoom();
  }

  function get_position() {
    let position = event_position(props.event);
    const drag = get_drag();
    if (drag) {
      position -= drag;
    }
    return position;
  }

  function drag(event: MouseEvent) {
    const drag_pos = get_dragpos();
    if (drag_pos) {
      const position = drag_pos - event.x;
      const tick = tick_zoom();
      set_drag(Math.round(position / tick) * tick);
    }
  }

  function is_overlapping() {
    for (let i = 0; i < props.action.events.length; i++) {
      if (i == props.ei) continue;
      const event = props.action.events[i];
      const cd = props.action.cooldown;
      const time = px_to_ms(get_position());
      if (time + cd > event && time < event + cd) {
        return true;
      }
    }
    return false;
  }

  function in_viewport() {
    const start = event_position(props.event);
    const end = event_position(props.event + props.action.cooldown);
    return end > 0 && start < window.innerWidth + get_tick();
  }

  function mouse_down(event: MouseEvent) {
    set_dragpos(event.x);
    addEventListener("mousemove", drag);
  }

  document.addEventListener("mouseup", mouse_up);
  function mouse_up() {
    if (get_dragpos() != undefined) {
      const snap_value = snap(px_to_ms(get_position()), get_tick());

      update_event(props.ai, props.ei, snap_value);
      set_dragpos(undefined);
      removeEventListener("mousemove", drag);
    }
  }

  function classes() {
    return [
      styles.event,
      ...(get_dragpos() ? [styles.drag] : []),
      ...(is_overlapping() ? [styles.overlaps] : []),
    ].join(" ");
  }

  function style(): JSX.CSSProperties {
    return {
      width: `${event_size(props.action.cooldown)}px`,
      left: `${get_position()}px`,
      top: `${props.ai * line_height + 5}px`,
    };
  }

  onCleanup(() => {
    document.removeEventListener("mouseup", mouse_up);
  });

  return (
    <Show when={in_viewport()}>
      <div onMouseDown={mouse_down} class={classes()} style={style()}>
        <div
          class={styles.active}
          style={{ width: `${event_size(props.action.active ?? 10)}px` }}
        />
      </div>
    </Show>
  );
};

export default CompositeTimelineEvent;
