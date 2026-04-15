import { useMemo, useState } from "react";
import {
  nodeRegistry,
  validateWorkflow,
  type Workflow,
  type WorkflowEdge,
  type WorkflowNodeType
} from "@comfigui/shared/workflow";
import { exportWorkflow } from "../io/exportWorkflow";
import { importWorkflow } from "../io/importWorkflow";
import { defaultWorkflow } from "../state/workflowStore";
import { NodePalette } from "../components/NodePalette";
import { WorkflowCanvas } from "../components/WorkflowCanvas";
import { PropertyPanel } from "../components/PropertyPanel";

type NodePositionMap = Record<string, { x: number; y: number }>;

function buildInitialPositions(workflow: Workflow): NodePositionMap {
  return Object.fromEntries(
    workflow.nodes.map((node, index) => [node.id, { x: 80 + (index % 3) * 240, y: 80 + Math.floor(index / 3) * 160 }])
  );
}

export default function App() {
  const [workflow, setWorkflow] = useState<Workflow>(defaultWorkflow);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [positions, setPositions] = useState<NodePositionMap>(() => buildInitialPositions(defaultWorkflow));
  const validation = useMemo(() => validateWorkflow(workflow), [workflow]);

  const addNode = (type: WorkflowNodeType) => {
    const createdAt = new Date().toISOString();
    const id = `n-${Date.now()}`;
    const definition = nodeRegistry[type];

    setWorkflow((prev) => ({
      ...prev,
      updatedAt: createdAt,
      nodes: [
        ...prev.nodes,
        {
          id,
          type,
          label: definition.label,
          config: {}
        }
      ]
    }));

    setPositions((prev) => ({
      ...prev,
      [id]: { x: 120 + Object.keys(prev).length * 24, y: 100 + Object.keys(prev).length * 18 }
    }));
  };

  const updateEdges = (edges: WorkflowEdge[]) => {
    setWorkflow((prev) => ({ ...prev, updatedAt: new Date().toISOString(), edges }));
  };

  const updateWorkflowName = (name: string) => {
    setWorkflow((prev) => ({ ...prev, updatedAt: new Date().toISOString(), name }));
  };

  const updateNodeLabel = (nodeId: string, label: string) => {
    setWorkflow((prev) => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      nodes: prev.nodes.map((node) => (node.id === nodeId ? { ...node, label } : node))
    }));
  };

  const updateNodeConfig = (nodeId: string, configText: string) => {
    try {
      const config = JSON.parse(configText) as Record<string, unknown>;
      setWorkflow((prev) => ({
        ...prev,
        updatedAt: new Date().toISOString(),
        nodes: prev.nodes.map((node) => (node.id === nodeId ? { ...node, config } : node))
      }));
    } catch {
      // ignore invalid json until user fixes it
    }
  };

  const copyJson = async () => {
    await navigator.clipboard.writeText(exportWorkflow(workflow));
  };

  const importFromPrompt = () => {
    const raw = window.prompt("粘贴 Workflow JSON");
    if (!raw) return;

    try {
      const imported = importWorkflow(raw);
      setWorkflow(imported);
      setPositions(buildInitialPositions(imported));
      setSelectedNodeId(null);
    } catch {
      window.alert("JSON 解析失败，请检查格式");
    }
  };

  return (
    <main style={{ display: "flex", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      <NodePalette onAddNode={addNode} />
      <section style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <header style={{ padding: 12, borderBottom: "1px solid #ddd", display: "flex", gap: 12 }}>
          <strong>ComfigUI Editor</strong>
          <button onClick={copyJson}>复制 JSON</button>
          <button onClick={importFromPrompt}>导入 JSON</button>
          <span style={{ color: validation.valid ? "green" : "crimson" }}>
            {validation.valid ? "Workflow 校验通过" : `存在 ${validation.issues.length} 个问题`}
          </span>
        </header>
        <WorkflowCanvas
          workflow={workflow}
          positions={positions}
          onPositionsChange={setPositions}
          onEdgesChange={updateEdges}
          onNodeSelect={setSelectedNodeId}
        />
      </section>
      <PropertyPanel
        workflow={workflow}
        selectedNodeId={selectedNodeId}
        onWorkflowNameChange={updateWorkflowName}
        onNodeLabelChange={updateNodeLabel}
        onNodeConfigChange={updateNodeConfig}
      />
    </main>
  );
}
