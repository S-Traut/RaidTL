import { JSX, createSignal, onCleanup } from "solid-js";
import styles from "./timeline_event.module.scss";
import { Action, get_tick, get_time, get_zoom } from "@/stores/timeline";
import { update_event } from "@/services/service_timeline";

type ComponentProps = {
  action: Action;
  event: number;
  ai: number;
  ei: number;
};

type Component<P = ComponentProps> = (props: P) => JSX.Element;
const CompositeTimelineEvent: Component = (props) => {
  const [get_drag, set_drag] = createSignal<number>(0);
  const [get_dragpos, set_dragpos] = createSignal<number | undefined>(
    undefined
  );

  function timestamp() {
    return ((event_position() - 100) * 100) / get_zoom() + get_time();
  }

  function event_size(duration: number) {
    return duration * get_zoom() * 0.01;
  }

  function event_position() {
    let position = (props.event - get_time()) * (get_zoom() * 0.01) + 100;
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
      const tick_real_size = get_tick() * (0.01 * get_zoom());
      set_drag(Math.round(position / tick_real_size) * tick_real_size);
    }
  }
  function mouse_down(event: MouseEvent) {
    set_dragpos(event.x);
    addEventListener("mousemove", drag);
  }

  function is_overlapping() {
    for (let i = 0; i < props.action.events.length; i++) {
      if (i == props.ei) continue;
      const event = props.action.events[i];
      const cd = props.action.cooldown;
      if (timestamp() + cd > event && timestamp() < event + cd) {
        return true;
      }
    }
    return false;
  }

  document.addEventListener("mouseup", mouse_up);
  function mouse_up() {
    if (get_dragpos() != undefined) {
      const snap = Math.round(timestamp() / get_tick()) * get_tick();
      update_event(props.ai, props.ei, snap);

      set_dragpos(undefined);
      removeEventListener("mousemove", drag);
    }
  }

  onCleanup(() => {
    document.removeEventListener("mouseup", mouse_up);
  });

  return (
    <div
      onMouseDown={mouse_down}
      class={`
        ${styles.event}
        ${get_dragpos() != undefined ? styles.drag : ""}
        ${is_overlapping() ? styles.overlaps : ""}
      `}
      style={{
        width: `${event_size(props.action.cooldown)}px`,
        left: `${event_position()}px`,
        top: `${props.ai * 20 + 1}px`,
      }}
    >
      <div
        class={`${styles.active}`}
        style={{ width: `${event_size(props.action.active ?? 10)}px` }}
      />
    </div>
  );
};

export default CompositeTimelineEvent;
