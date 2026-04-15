import { allNodeTypes } from "./nodeRegistry";
import type { ValidationIssue, ValidationResult, Workflow } from "./types";

const supportedVersion = "1.0.0";

function hasCycle(workflow: Workflow): boolean {
  const inDegree = new Map<string, number>();
  const graph = new Map<string, string[]>();

  workflow.nodes.forEach((n) => {
    inDegree.set(n.id, 0);
    graph.set(n.id, []);
  });

  workflow.edges.forEach((e) => {
    graph.get(e.from)?.push(e.to);
    inDegree.set(e.to, (inDegree.get(e.to) ?? 0) + 1);
  });

  const queue = [...inDegree.entries()].filter(([, deg]) => deg === 0).map(([id]) => id);
  let visited = 0;

  while (queue.length > 0) {
    const cur = queue.shift()!;
    visited += 1;
    for (const next of graph.get(cur) ?? []) {
      const deg = (inDegree.get(next) ?? 0) - 1;
      inDegree.set(next, deg);
      if (deg === 0) queue.push(next);
    }
  }

  return visited !== workflow.nodes.length;
}

export function validateWorkflow(workflow: Workflow): ValidationResult {
  const issues: ValidationIssue[] = [];

  if (workflow.schemaVersion !== supportedVersion) {
    issues.push({
      code: "UNSUPPORTED_VERSION",
      message: `Unsupported schemaVersion: ${workflow.schemaVersion}`
    });
  }

  const nodeIds = new Set(workflow.nodes.map((n) => n.id));

  for (const node of workflow.nodes) {
    if (!allNodeTypes.includes(node.type)) {
      issues.push({
        code: "UNKNOWN_NODE_TYPE",
        nodeId: node.id,
        message: `Unknown node type: ${node.type}`
      });
    }
  }

  for (const edge of workflow.edges) {
    if (!nodeIds.has(edge.from) || !nodeIds.has(edge.to)) {
      issues.push({
        code: "EDGE_NODE_MISSING",
        edgeId: edge.id,
        message: `Edge ${edge.id} references missing node(s): ${edge.from} -> ${edge.to}`
      });
    }
  }

  if (workflow.nodes.length > 0 && hasCycle(workflow)) {
    issues.push({
      code: "GRAPH_HAS_CYCLE",
      message: "Workflow graph has cycle, but V1 only supports DAG"
    });
  }

  return {
    valid: issues.length === 0,
    issues
  };
}
