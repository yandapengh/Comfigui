import type { Workflow } from "@comfigui/shared/workflow";

export function exportWorkflow(workflow: Workflow): string {
  return JSON.stringify(workflow, null, 2);
}
