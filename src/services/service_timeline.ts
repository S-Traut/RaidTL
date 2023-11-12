import * as store from "@/stores/timeline";
import { produce } from "solid-js/store";

export function next_tick() {
  store.set_time(store.get_time() + store.get_tick());
}

export function prev_tick() {
  store.set_time(store.get_time() - store.get_tick());
}

export function increase_zoom() {
  const zoom = store.get_zoom();
  if (zoom < 10) {
    store.set_zoom(zoom + 1);
  }
}

export function decrease_zoom() {
  const zoom = store.get_zoom();
  if (zoom > 1) {
    store.set_zoom(zoom - 1);
  }
}

export function update_event(
  action_index: number,
  event_index: number,
  ms: number
) {
  store.set_actions(
    (_, i) => i === action_index,
    produce((action) => (action.events[event_index] = ms))
  );
}

export function get_timestamp(): string {
  let timestamp = store.get_time();
  const isNegative = timestamp < 0;
  timestamp = Math.abs(timestamp);

  const minutes = Math.floor(timestamp / 60000);
  const seconds = Math.floor((timestamp % 60000) / 1000);
  const milliseconds = timestamp % 1000;

  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  const formattedMilliseconds = milliseconds.toString().padStart(3, "0");

  return (
    (isNegative ? "-" : "") +
    `${formattedMinutes}:${formattedSeconds}:${formattedMilliseconds}`
  );
}

// CALCULATIONS //
export const zoom = () => store.get_zoom() * store.zoom_factor;
export const tick_zoom = () => store.get_tick() * zoom();

export function event_position(ms: number) {
  return (ms - store.get_time()) * zoom() + 100;
}

/**
 * Convert a pixel X positon to milliseconds on the timeline
 */
export function px_to_ms(px: number) {
  const position = (px - store.get_sidebar_width()) * 100;
  return position / store.get_zoom() + store.get_time();
}

export function snap(value: number, snap: number) {
  return (Math.round(value) / snap) * snap;
}

export const bar_width = () => store.get_tick() * zoom();
export function bar_count() {
  return Math.floor((window.innerWidth - 100) / (bar_width() * 2)) + 1;
}

export function bar_position() {}
