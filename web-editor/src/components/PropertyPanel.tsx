import type { Workflow } from "@comfigui/shared/workflow";

export function PropertyPanel({
  workflow,
  selectedNodeId,
  onWorkflowNameChange,
  onNodeLabelChange,
  onNodeConfigChange
}: {
  workflow: Workflow;
  selectedNodeId: string | null;
  onWorkflowNameChange: (name: string) => void;
  onNodeLabelChange: (nodeId: string, label: string) => void;
  onNodeConfigChange: (nodeId: string, configText: string) => void;
}) {
  const selectedNode = workflow.nodes.find((node) => node.id === selectedNodeId);

  return (
    <aside style={{ width: 360, borderLeft: "1px solid #ddd", padding: 12 }}>
      <h4>工作流属性</h4>
      <label style={{ display: "block", marginBottom: 10 }}>
        <div style={{ marginBottom: 4 }}>名称</div>
        <input
          value={workflow.name}
          onChange={(event) => onWorkflowNameChange(event.target.value)}
          style={{ width: "100%" }}
        />
      </label>

      <p><strong>Version:</strong> {workflow.schemaVersion}</p>
      <p><strong>Nodes:</strong> {workflow.nodes.length}</p>
      <p><strong>Edges:</strong> {workflow.edges.length}</p>

      <hr style={{ margin: "12px 0" }} />
      <h4>节点属性</h4>
      {!selectedNode ? (
        <p style={{ color: "#666" }}>请在画布中选中一个节点后编辑。</p>
      ) : (
        <>
          <p><strong>ID:</strong> {selectedNode.id}</p>
          <p><strong>Type:</strong> {selectedNode.type}</p>
          <label style={{ display: "block", marginBottom: 10 }}>
            <div style={{ marginBottom: 4 }}>Label</div>
            <input
              value={selectedNode.label}
              onChange={(event) => onNodeLabelChange(selectedNode.id, event.target.value)}
              style={{ width: "100%" }}
            />
          </label>
          <label style={{ display: "block" }}>
            <div style={{ marginBottom: 4 }}>Config（JSON）</div>
            <textarea
              defaultValue={JSON.stringify(selectedNode.config, null, 2)}
              onBlur={(event) => onNodeConfigChange(selectedNode.id, event.target.value)}
              rows={10}
              style={{ width: "100%", fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}
            />
          </label>
        </>
      )}
    </aside>
  );
}
