import { nodeRegistry, type WorkflowNodeType } from "@comfigui/shared/workflow";

export function NodePalette({ onAddNode }: { onAddNode: (type: WorkflowNodeType) => void }) {
  const nodes = Object.values(nodeRegistry);

  return (
    <aside style={{ width: 240, borderRight: "1px solid #ddd", padding: 12 }}>
      <h4>节点库</h4>
      {nodes.map((node) => (
        <div key={node.type} style={{ padding: "8px 0", fontSize: 13, borderBottom: "1px dashed #eee" }}>
          <strong>{node.label}</strong>
          <div style={{ color: "#666", marginBottom: 6 }}>{node.type}</div>
          <button onClick={() => onAddNode(node.type)}>添加节点</button>
        </div>
      ))}
    </aside>
  );
}
