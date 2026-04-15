import { useMemo } from "react";
import ReactFlow, { Background, Controls, type Edge, type Node } from "reactflow";
import "reactflow/dist/style.css";
import type { Workflow } from "@comfigui/shared/workflow";

function toFlowNodes(workflow: Workflow): Node[] {
  return workflow.nodes.map((n, i) => ({
    id: n.id,
    data: { label: `${n.label} (${n.type})` },
    position: { x: i * 220, y: 80 }
  }));
}

function toFlowEdges(workflow: Workflow): Edge[] {
  return workflow.edges.map((e) => ({ id: e.id, source: e.from, target: e.to }));
}

export function WorkflowCanvas({ workflow }: { workflow: Workflow }) {
  const nodes = useMemo(() => toFlowNodes(workflow), [workflow]);
  const edges = useMemo(() => toFlowEdges(workflow), [workflow]);

  return (
    <div style={{ flex: 1, height: 640 }}>
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
