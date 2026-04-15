import { useState } from "react";
import type { Workflow } from "@comfigui/shared/workflow";
import { runWorkflow } from "../core/executor";
import { LogPanel } from "./LogPanel";

export default function App() {
  const [workflow, setWorkflow] = useState<Workflow | null>(null);
  const [logs, setLogs] = useState<Awaited<ReturnType<typeof runWorkflow>>["logs"]>([]);
  const [status, setStatus] = useState("idle");

  const loadWorkflow = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setWorkflow(JSON.parse(String(e.target?.result ?? "{}")) as Workflow);
      setLogs([]);
      setStatus("loaded");
    };
    reader.readAsText(file);
  };

  const execute = async () => {
    if (!workflow) return;
    setStatus("running");
    const result = await runWorkflow(workflow);
    setLogs(result.logs);
    setStatus(result.status);
  };

  return (
    <main style={{ padding: 12, fontFamily: "Inter, system-ui, sans-serif" }}>
      <h3>ComfigUI Plugin</h3>
      <input type="file" accept="application/json" onChange={(e) => e.target.files?.[0] && loadWorkflow(e.target.files[0])} />
      <button onClick={execute} disabled={!workflow} style={{ marginLeft: 8 }}>
        Run
      </button>
      <div style={{ marginTop: 8, color: "#555" }}>状态: {status}</div>
      <LogPanel logs={logs} />
    </main>
  );
}
