import { nanoid } from "nanoid";
import { createSignal } from "solid-js";
import { update_event } from "./service_timeline";
import { useNavigate } from "@solidjs/router";
import { set_actions } from "@/stores/timeline";
import { produce } from "solid-js/store";

const SOCKET_URL = "wss://ffxiv-timeline-api.shuttleapp.rs/websocket";

export const [get_socket, set_socket] = createSignal<RTLSocket>();
export default class RTLSocket {
  public room_id: string;
  private socket: WebSocket;

  constructor(room_id?: string) {
    if (!room_id) {
      this.room_id = nanoid();
    } else {
      this.room_id = room_id;
    }

    this.socket = new WebSocket(SOCKET_URL);
    this.socket.onopen = () => {
      this.socket.send(JSON.stringify({ channel: this.room_id }));
    };

    this.socket.onmessage = this.on_message;

    if (!room_id) {
      const navigate = useNavigate();
      navigate(this.room_id);
    }
  }

  private on_message(event: MessageEvent) {
    const data = JSON.parse(event.data);
    switch (data.code) {
      case "update_event":
        return ws_update_event(data.data);
    }
  }

  public send_event_move(action_id: number, event_id: number, value: number) {
    this.socket.send(
      JSON.stringify({
        code: "update_event",
        data: {
          action_id,
          event_id,
          value,
        },
      })
    );
  }
}

type WSUpdateEvent = {
  action_id: number;
  event_id: number;
  value: number;
};

function ws_update_event(data: WSUpdateEvent) {
  set_actions(
    (_, i) => i === data.action_id,
    produce((action) => (action.events[data.event_id] = data.value))
  );
}
