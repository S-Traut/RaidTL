import { Component, createSignal } from "solid-js";
import styles from "./timeline_header.module.scss";
import CommonModal from "@/components/common/modal";
import { process_fflog_url } from "@/services/service_fflogs";

const CompositeTimelineFooter: Component = () => {
  return (
    <div class={styles.header}>
      <PrivateModalImport />
      <h1>RaidTL</h1>
      <div class={styles.menu}>
        <button onClick={() => set_import_modal(true)}>
          IMPORT FFLOGS RAID
        </button>
        <button>NEW PROJECT</button>
      </div>
    </div>
  );
};

export const [import_modal, set_import_modal] = createSignal(false);
const PrivateModalImport: Component = () => {
  const [url, setUrl] = createSignal("");

  function import_logs(event: Event) {
    event.preventDefault();
    process_fflog_url(url())
    set_import_modal(false);
  }

  return (
    <CommonModal open={import_modal()} click_outside={() => set_import_modal(false)}>
      <h2>Enter an FFLogs fight URL</h2>
      <form onSubmit={import_logs}>
        <input
          type="text"
          value={url()}
          onInput={(e) => setUrl(e.target.value)}
        />
        <input type="submit" />
      </form>
    </CommonModal>
  );
};

export default CompositeTimelineFooter;
