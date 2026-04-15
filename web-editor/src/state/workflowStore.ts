import type { Workflow } from "@comfigui/shared/workflow";

export const defaultWorkflow: Workflow = {
  schemaVersion: "1.0.0",
  id: "wf-demo-001",
  name: "Update Text Color",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  nodes: [
    { id: "1", type: "read.page", label: "Read Page", config: {} },
    { id: "2", type: "filter.textMatch", label: "Filter Text", config: { keyword: "Button" } },
    { id: "3", type: "update.color", label: "Update Color", config: { value: "#0000FF" } },
    { id: "4", type: "output", label: "Output", config: {} }
  ],
  edges: [
    { id: "e1", from: "1", to: "2" },
    { id: "e2", from: "2", to: "3" },
    { id: "e3", from: "3", to: "4" }
  ]
};
