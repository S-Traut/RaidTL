import { Component, For, JSX } from "solid-js";
import styles from "./timeline_raid.module.scss";
import { RaidAction, get_raid_actions } from "@/stores/timeline";
import { event_position } from "@/services/service_timeline";

type RaidActionComponent<P = { action: RaidAction }> = (
  props: P
) => JSX.Element;

const CompositeTimelineRaid: Component = () => {
  return (
    <div class={styles.raid}>
      <For each={get_raid_actions}>
        {(action) => <PrivateRaidAction action={action} />}
      </For>
    </div>
  );
};

const PrivateRaidAction: RaidActionComponent = (props) => {
  function position() {
    return event_position(props.action.timestamp) - 8;
  }

  return (
    <div class={styles.action} style={{ left: `${position()}px` }}>
      <p>{props.action.name}</p>
    </div>
  );
};

export default CompositeTimelineRaid;
