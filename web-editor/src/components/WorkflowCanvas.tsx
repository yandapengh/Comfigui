import { useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  type Connection,
  type Edge,
  type EdgeChange,
  type Node,
  type NodeChange,
  type OnSelectionChangeParams
} from "reactflow";
import "reactflow/dist/style.css";
import type { Workflow, WorkflowEdge } from "@comfigui/shared/workflow";

type NodePositionMap = Record<string, { x: number; y: number }>;

function toFlowNodes(workflow: Workflow, positions: NodePositionMap): Node[] {
  return workflow.nodes.map((node, index) => ({
    id: node.id,
    data: { label: `${node.label} (${node.type})` },
    position: positions[node.id] ?? { x: 80 + (index % 3) * 240, y: 80 + Math.floor(index / 3) * 160 }
  }));
}

function toFlowEdges(workflow: Workflow): Edge[] {
  return workflow.edges.map((edge) => ({ id: edge.id, source: edge.from, target: edge.to }));
}

function toWorkflowEdges(edges: Edge[]): WorkflowEdge[] {
  return edges.map((edge) => ({
    id: edge.id,
    from: edge.source,
    to: edge.target
  }));
}

export function WorkflowCanvas({
  workflow,
  positions,
  onPositionsChange,
  onEdgesChange,
  onNodeSelect
}: {
  workflow: Workflow;
  positions: NodePositionMap;
  onPositionsChange: (next: NodePositionMap) => void;
  onEdgesChange: (edges: WorkflowEdge[]) => void;
  onNodeSelect: (nodeId: string | null) => void;
}) {
  const nodes = useMemo(() => toFlowNodes(workflow, positions), [workflow, positions]);
  const edges = useMemo(() => toFlowEdges(workflow), [workflow]);

  const handleNodesChange = (changes: NodeChange[]) => {
    const updatedNodes = applyNodeChanges(changes, nodes);
    const nextPositions = { ...positions };

    for (const node of updatedNodes) {
      nextPositions[node.id] = node.position;
    }

    onPositionsChange(nextPositions);
  };

  const handleEdgesChange = (changes: EdgeChange[]) => {
    const nextEdges = applyEdgeChanges(changes, edges);
    onEdgesChange(toWorkflowEdges(nextEdges));
  };

  const handleConnect = (connection: Connection) => {
    const id = `e-${connection.source}-${connection.target}-${Date.now()}`;
    const nextEdges = addEdge({ ...connection, id }, edges);
    onEdgesChange(toWorkflowEdges(nextEdges));
  };

  const handleSelectionChange = ({ nodes: selectedNodes }: OnSelectionChangeParams) => {
    onNodeSelect(selectedNodes?.[0]?.id ?? null);
  };

  return (
    <div style={{ flex: 1, height: 640 }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        onNodesChange={handleNodesChange}
        onEdgesChange={handleEdgesChange}
        onConnect={handleConnect}
        onSelectionChange={handleSelectionChange}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
