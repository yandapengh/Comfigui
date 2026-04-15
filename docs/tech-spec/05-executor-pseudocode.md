# 05. 执行器伪代码（Plugin 端）

## 5.1 主流程

```pseudo
function runWorkflow(workflow): RunSummary
  ctx = createExecutionContext()

  log(info, "RUN_START", "workflow run started")

  result = validateWorkflow(workflow)
  if result.valid == false
    for issue in result.issues
      log(error, "VALIDATION_FAILED", issue.message, issue)
    return failSummary(ctx)

  order = topologicalSort(workflow.nodes, workflow.edges)

  for nodeId in order
    if ctx.cancelled == true
      log(warn, "RUN_CANCELLED", "user cancelled")
      return cancelledSummary(ctx)

    node = getNodeById(workflow, nodeId)
    input = collectInputs(node, workflow.edges, ctx.nodeOutputs)

    log(info, "NODE_START", "start node", { nodeId, type: node.type })

    executor = nodeRegistry.get(node.type)
    if executor is null
      log(error, "EXECUTOR_NOT_FOUND", "unknown node type", { nodeId, type: node.type })
      return failSummary(ctx)

    try
      nodeResult = await executor({ node, input, ctx })
      ctx.nodeOutputs.set(nodeId, nodeResult.output)
      log(info, "NODE_SUCCESS", "node finished", { nodeId })
    catch err
      log(error, "NODE_ERROR", "node failed", { nodeId, err })
      return failSummary(ctx)

  log(info, "RUN_SUCCESS", "workflow finished")
  return successSummary(ctx)
```

## 5.2 图校验伪代码

```pseudo
function validateGraph(nodes, edges): ValidationIssue[]
  issues = []
  nodeIds = set(nodes.map(n => n.id))

  for e in edges
    if e.from not in nodeIds or e.to not in nodeIds
      issues.push(EDGE_NODE_MISSING)

  if hasCycle(nodes, edges)
    issues.push(GRAPH_HAS_CYCLE)

  if !allReachableFromSources(nodes, edges)
    issues.push(GRAPH_DISCONNECTED)

  return issues
```

## 5.3 节点执行示例

```pseudo
executor["filter.textMatch"] = async ({ node, input, ctx }) =>
  keyword = node.config.keyword
  field = node.config.field or "text"

  items = normalizeToArray(input)
  filtered = []

  for item in items
    value = readField(item, field)
    if contains(value, keyword)
      filtered.push(item)

  return { output: filtered }
```
