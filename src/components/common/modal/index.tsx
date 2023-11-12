import { Component, Show } from "solid-js";
import styles from "./timeline_modal.module.scss";
import { Portal } from "solid-js/web";
import { JSX } from "solid-js/web/types/jsx";

interface ClickOutsideCallback {
  (event: MouseEvent): void;
}

interface ModalProps {
  children: JSX.Element;
  open: boolean;
  click_outside?: ClickOutsideCallback;
}

const CommonModal: Component<ModalProps> = (props) => {

  let content: HTMLDivElement;

  function click_outside(event: MouseEvent) {
    content.contains(event.target as Node) || props.click_outside?.(event);
  }

  return (
    <Portal>
      <Show when={props.open}>
        <div class={styles.modal} onClick={click_outside}>
          <div class={styles.content} ref={content!}>{props.children}</div>
        </div>
      </Show>
    </Portal>
  );
};

export default CommonModal;