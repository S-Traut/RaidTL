import CompositeTimeline from "@/components/composite/timeline";
import { Component } from "solid-js";
import RTLSocket, { set_socket } from "@/services/service_socket"
import { useParams } from "@solidjs/router";

const TimelineView: Component = () => {

  const params = useParams();
  const socket = new RTLSocket(params.id);
  set_socket(socket)

  return <CompositeTimeline />;
};

export default TimelineView;
