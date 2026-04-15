import type { Workflow } from "@comfigui/shared/workflow";

export function topologicalSort(workflow: Workflow): string[] {
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

  const queue = [...inDegree.entries()].filter(([, d]) => d === 0).map(([id]) => id);
  const order: string[] = [];

  while (queue.length) {
    const cur = queue.shift()!;
    order.push(cur);
    for (const next of graph.get(cur) ?? []) {
      const nd = (inDegree.get(next) ?? 0) - 1;
      inDegree.set(next, nd);
      if (nd === 0) queue.push(next);
    }
  }

  return order;
}

export function collectInputData(nodeId: string, workflow: Workflow, outputs: Map<string, unknown>): unknown {
  const incoming = workflow.edges.filter((e) => e.to === nodeId).map((e) => outputs.get(e.from));
  if (incoming.length <= 1) return incoming[0] ?? null;
  return incoming;
}
