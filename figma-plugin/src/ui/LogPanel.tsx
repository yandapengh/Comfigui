import type { ExecLog } from "../core/context";

export function LogPanel({ logs }: { logs: ExecLog[] }) {
  return (
    <section style={{ marginTop: 12, borderTop: "1px solid #ddd", paddingTop: 12 }}>
      <h4>执行日志</h4>
      {logs.length === 0 && <div style={{ color: "#666" }}>暂无日志</div>}
      {logs.map((log, idx) => (
        <div key={`${log.ts}-${idx}`} style={{ fontSize: 12, marginBottom: 6 }}>
          [{log.level.toUpperCase()}] {log.action} {log.nodeId ? `(${log.nodeId})` : ""} - {log.message}
        </div>
      ))}
    </section>
  );
}
