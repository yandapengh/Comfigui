import type { Workflow } from "@comfigui/shared/workflow";

export function PropertyPanel({ workflow }: { workflow: Workflow }) {
  return (
    <aside style={{ width: 320, borderLeft: "1px solid #ddd", padding: 12 }}>
      <h4>工作流属性</h4>
      <p><strong>Name:</strong> {workflow.name}</p>
      <p><strong>Version:</strong> {workflow.schemaVersion}</p>
      <p><strong>Nodes:</strong> {workflow.nodes.length}</p>
      <p><strong>Edges:</strong> {workflow.edges.length}</p>
    </aside>
  );
}
