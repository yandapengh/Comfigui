import type { WorkflowNodeType } from "./types";

export type NodeDefinition = {
  type: WorkflowNodeType;
  label: string;
  category: "read" | "filter" | "update" | "output";
  configSchemaHint: string;
};

export const nodeRegistry: Record<WorkflowNodeType, NodeDefinition> = {
  "read.page": {
    type: "read.page",
    label: "Read Page",
    category: "read",
    configSchemaHint: "{}"
  },
  "read.frame": {
    type: "read.frame",
    label: "Read Frame",
    category: "read",
    configSchemaHint: "{ frameName?: string }"
  },
  "filter.textMatch": {
    type: "filter.textMatch",
    label: "Filter Text Match",
    category: "filter",
    configSchemaHint: "{ keyword: string; field?: 'text' }"
  },
  "update.text": {
    type: "update.text",
    label: "Update Text",
    category: "update",
    configSchemaHint: "{ value: string }"
  },
  "update.color": {
    type: "update.color",
    label: "Update Color",
    category: "update",
    configSchemaHint: "{ value: string /* hex */ }"
  },
  output: {
    type: "output",
    label: "Output",
    category: "output",
    configSchemaHint: "{}"
  }
};

export const allNodeTypes = Object.keys(nodeRegistry) as WorkflowNodeType[];
