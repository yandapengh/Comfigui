import { validateWorkflow, type Workflow } from "@comfigui/shared/workflow";
import { createExecutionContext, pushLog } from "./context";
import { collectInputData, topologicalSort } from "./graph";
import { executors } from "../nodes";

export type RunSummary = {
  status: "success" | "failed" | "cancelled";
  runId: string;
  logs: ReturnType<typeof pushLog>[];
};

export async function runWorkflow(workflow: Workflow): Promise<RunSummary> {
  const ctx = createExecutionContext(`run-${Date.now()}`);
  pushLog(ctx, { level: "info", action: "RUN_START", message: "Workflow execution started" });

  const validation = validateWorkflow(workflow);
  if (!validation.valid) {
    for (const issue of validation.issues) {
      pushLog(ctx, {
        level: "error",
        action: issue.code,
        nodeId: issue.nodeId,
        message: issue.message,
        detail: issue
      });
    }
    return { status: "failed", runId: ctx.runId, logs: ctx.logs };
  }

  const order = topologicalSort(workflow);

  for (const nodeId of order) {
    if (ctx.cancelled) {
      pushLog(ctx, { level: "warn", action: "RUN_CANCELLED", message: "Workflow cancelled" });
      return { status: "cancelled", runId: ctx.runId, logs: ctx.logs };
    }

    const node = workflow.nodes.find((n) => n.id === nodeId);
    if (!node) continue;

    const exec = executors[node.type];
    const input = collectInputData(node.id, workflow, ctx.nodeOutputs);

    try {
      pushLog(ctx, { level: "info", nodeId: node.id, action: "NODE_START", message: `Executing ${node.type}` });
      const result = await exec({ node, input, ctx });
      ctx.nodeOutputs.set(node.id, result.output);
      pushLog(ctx, { level: "info", nodeId: node.id, action: "NODE_SUCCESS", message: "Node executed" });
    } catch (error) {
      pushLog(ctx, {
        level: "error",
        nodeId: node.id,
        action: "NODE_ERROR",
        message: "Node execution failed",
        detail: error
      });
      return { status: "failed", runId: ctx.runId, logs: ctx.logs };
    }
  }

  pushLog(ctx, { level: "info", action: "RUN_SUCCESS", message: "Workflow execution finished" });
  return { status: "success", runId: ctx.runId, logs: ctx.logs };
}
