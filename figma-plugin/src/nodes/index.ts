import type { WorkflowNode } from "@comfigui/shared/workflow";
import type { ExecutionContext } from "../core/context";

export type NodeExecutor = (args: {
  node: WorkflowNode;
  input: unknown;
  ctx: ExecutionContext;
}) => Promise<{ output: unknown }>;

const readPage: NodeExecutor = async () => ({ output: [] });
const readFrame: NodeExecutor = async () => ({ output: [] });

const filterTextMatch: NodeExecutor = async ({ node, input }) => {
  const items = Array.isArray(input) ? input : [];
  const keyword = String(node.config.keyword ?? "");
  return {
    output: items.filter((item) => String((item as { text?: string }).text ?? "").includes(keyword))
  };
};

const updateText: NodeExecutor = async ({ input, node }) => ({
  output: {
    affected: Array.isArray(input) ? input.length : 0,
    value: node.config.value
  }
});

const updateColor: NodeExecutor = async ({ input, node }) => ({
  output: {
    affected: Array.isArray(input) ? input.length : 0,
    value: node.config.value
  }
});

const output: NodeExecutor = async ({ input }) => ({ output: input });

export const executors = {
  "read.page": readPage,
  "read.frame": readFrame,
  "filter.textMatch": filterTextMatch,
  "update.text": updateText,
  "update.color": updateColor,
  output
} satisfies Record<WorkflowNode["type"], NodeExecutor>;
