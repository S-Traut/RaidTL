import { Component, Show } from "solid-js";
import styles from "./timeline_modal.module.scss";
import { Portal } from "solid-js/web";
import { JSX } from "solid-js/web/types/jsx";

interface ModalProps {
  children: JSX.Element;
  open: boolean;
}

const CommonModal: Component<ModalProps> = (props) => {
  return (
    <Portal>
      <Show when={props.open}>
        <div class={styles.modal}>
          <div class={styles.content}>{props.children}</div>
        </div>
      </Show>
    </Portal>
  );
};

export default CommonModal;
