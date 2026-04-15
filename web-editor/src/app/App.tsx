import { useMemo, useState } from "react";
import { validateWorkflow } from "@comfigui/shared/workflow";
import { exportWorkflow } from "../io/exportWorkflow";
import { defaultWorkflow } from "../state/workflowStore";
import { NodePalette } from "../components/NodePalette";
import { WorkflowCanvas } from "../components/WorkflowCanvas";
import { PropertyPanel } from "../components/PropertyPanel";

export default function App() {
  const [workflow] = useState(defaultWorkflow);
  const validation = useMemo(() => validateWorkflow(workflow), [workflow]);

  return (
    <main style={{ display: "flex", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      <NodePalette />
      <section style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <header style={{ padding: 12, borderBottom: "1px solid #ddd", display: "flex", gap: 12 }}>
          <strong>ComfigUI Editor</strong>
          <button onClick={() => navigator.clipboard.writeText(exportWorkflow(workflow))}>复制 JSON</button>
          <span style={{ color: validation.valid ? "green" : "crimson" }}>
            {validation.valid ? "Workflow 校验通过" : `存在 ${validation.issues.length} 个问题`}
          </span>
        </header>
        <WorkflowCanvas workflow={workflow} />
      </section>
      <PropertyPanel workflow={workflow} />
    </main>
  );
}
