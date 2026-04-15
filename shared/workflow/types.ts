export type SchemaVersion = "1.0.0";

export type WorkflowNodeType =
  | "read.page"
  | "read.frame"
  | "filter.textMatch"
  | "update.text"
  | "update.color"
  | "output";

export type WorkflowNode = {
  id: string;
  type: WorkflowNodeType;
  label: string;
  config: Record<string, unknown>;
};

export type WorkflowEdge = {
  id: string;
  from: string;
  to: string;
};

export type Workflow = {
  schemaVersion: SchemaVersion;
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
};

export type ValidationIssueCode =
  | "SCHEMA_INVALID"
  | "UNSUPPORTED_VERSION"
  | "UNKNOWN_NODE_TYPE"
  | "EDGE_NODE_MISSING"
  | "GRAPH_HAS_CYCLE"
  | "GRAPH_DISCONNECTED";

export type ValidationIssue = {
  code: ValidationIssueCode;
  message: string;
  nodeId?: string;
  edgeId?: string;
};

export type ValidationResult = {
  valid: boolean;
  issues: ValidationIssue[];
};
