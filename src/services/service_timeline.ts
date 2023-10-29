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

export function getTimestamp(): string {
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
