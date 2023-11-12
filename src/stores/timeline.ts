import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

export type Action = {
  events: number[];
  name: string;
  icon: string;
  cooldown: number;
  active?: number;
};

export const [get_time, set_time] = createSignal(0);
export const [get_tick, set_tick] = createSignal(1000);
export const [get_zoom, set_zoom] = createSignal(5);
export const [get_actions, set_actions] = createStore<Action[]>([
  {
    events: [0, 12000],
    name: "Jus de kardia",
    icon: "https://cdn.discordapp.com/attachments/968038016314667021/1167925917289554001/Kardia.png?ex=654fe6c5&is=653d71c5&hm=ee02dbb823b5fe2e0242cd1ab6be58634a31ca84e6b1e19183715ddd60dd05fe&",
    cooldown: 10000,
    active: 5000,
  },
  {
    events: [2000, 8000],
    name: "Fairy juice",
    icon: "https://cdn.discordapp.com/attachments/968038016314667021/1167925917289554001/Kardia.png?ex=654fe6c5&is=653d71c5&hm=ee02dbb823b5fe2e0242cd1ab6be58634a31ca84e6b1e19183715ddd60dd05fe&",
    cooldown: 5000,
    active: 3000,
  },
]);
export const zoom_factor = 0.01;
export const line_height = 40;
export const [get_sidebar_width, set_sidebar_width] = createSignal(100);
