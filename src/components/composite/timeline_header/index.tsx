import { Component, createSignal } from "solid-js";
import styles from "./timeline_header.module.scss";
import CommonModal from "@/components/common/modal";

const CompositeTimelineFooter: Component = () => {
  const [import_modal, set_import_modal] = createSignal(false);

  function import_fflogs(url: string) {
    console.log(url);
    set_import_modal(false);
  }

  return (
    <div class={styles.header}>
      <PrivateModalImport open={import_modal()} on_import={import_fflogs} />
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

interface ImportCallback {
  (url: string): void;
}

interface ModalProps {
  open: boolean;
  on_import: ImportCallback;
}

const PrivateModalImport: Component<ModalProps> = (props) => {
  const [url, setUrl] = createSignal("");

  function import_logs(event: Event) {
    event.preventDefault();
    props.on_import(url());
  }

  return (
    <CommonModal open={props.open}>
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
