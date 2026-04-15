# 03. 接口定义

## 3.1 Workflow 核心类型（逻辑定义）

```ts
export type Workflow = {
  schemaVersion: "1.0.0";
  id: string;
  name: string;
  createdAt: string;   // ISO8601
  updatedAt: string;   // ISO8601
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
};

export type WorkflowNode = {
  id: string;
  type: "read.page" | "read.frame" | "filter.textMatch" | "update.text" | "update.color" | "output";
  label: string;
  config: Record<string, unknown>;
};

export type WorkflowEdge = {
  id: string;
  from: string;
  to: string;
};
```

## 3.2 Plugin UI ↔ Plugin Main 消息接口

```ts
type UIToMainMessage =
  | { type: "IMPORT_WORKFLOW"; payload: Workflow }
  | { type: "VALIDATE_WORKFLOW"; payload: Workflow }
  | { type: "RUN_WORKFLOW"; payload: { workflowId: string } }
  | { type: "CANCEL_RUN" };

type MainToUIMessage =
  | { type: "VALIDATION_RESULT"; payload: ValidationResult }
  | { type: "RUN_STATUS"; payload: { status: "idle" | "running" | "success" | "failed" | "cancelled" } }
  | { type: "EXEC_LOG"; payload: ExecLog }
  | { type: "RUN_SUMMARY"; payload: RunSummary };
```

## 3.3 执行上下文接口

```ts
type ExecutionContext = {
  runId: string;
  startedAt: string;
  selection: readonly SceneNode[];
  nodeOutputs: Map<string, unknown>;
  logs: ExecLog[];
  cancelled: boolean;
};

type ExecLog = {
  ts: string;
  level: "info" | "warn" | "error";
  nodeId?: string;
  action: string;
  message: string;
  detail?: unknown;
};
```

## 3.4 节点执行器接口

```ts
type NodeExecutor = (args: {
  node: WorkflowNode;
  input: unknown;
  ctx: ExecutionContext;
}) => Promise<{
  output: unknown;
}>;
```

## 3.5 校验返回接口

```ts
type ValidationIssue = {
  code:
    | "SCHEMA_INVALID"
    | "UNSUPPORTED_VERSION"
    | "UNKNOWN_NODE_TYPE"
    | "EDGE_NODE_MISSING"
    | "GRAPH_HAS_CYCLE"
    | "GRAPH_DISCONNECTED";
  message: string;
  nodeId?: string;
  edgeId?: string;
};

type ValidationResult = {
  valid: boolean;
  issues: ValidationIssue[];
};
```
