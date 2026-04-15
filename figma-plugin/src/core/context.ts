export type ExecLog = {
  ts: string;
  level: "info" | "warn" | "error";
  nodeId?: string;
  action: string;
  message: string;
  detail?: unknown;
};

export type ExecutionContext = {
  runId: string;
  startedAt: string;
  nodeOutputs: Map<string, unknown>;
  logs: ExecLog[];
  cancelled: boolean;
};

export function createExecutionContext(runId: string): ExecutionContext {
  return {
    runId,
    startedAt: new Date().toISOString(),
    nodeOutputs: new Map<string, unknown>(),
    logs: [],
    cancelled: false
  };
}

export function pushLog(ctx: ExecutionContext, log: Omit<ExecLog, "ts">): ExecLog {
  const item: ExecLog = { ...log, ts: new Date().toISOString() };
  ctx.logs.push(item);
  return item;
}
