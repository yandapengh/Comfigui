import type { Workflow } from "@comfigui/shared/workflow";

export function importWorkflow(text: string): Workflow {
  return JSON.parse(text) as Workflow;
}
