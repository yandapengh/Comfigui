import { nodeRegistry } from "@comfigui/shared/workflow";

export function NodePalette() {
  const nodes = Object.values(nodeRegistry);

  return (
    <aside style={{ width: 220, borderRight: "1px solid #ddd", padding: 12 }}>
      <h4>节点库</h4>
      {nodes.map((node) => (
        <div key={node.type} style={{ padding: "6px 0", fontSize: 13 }}>
          <strong>{node.label}</strong>
          <div style={{ color: "#666" }}>{node.type}</div>
        </div>
      ))}
    </aside>
  );
}
