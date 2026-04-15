# 06. 里程碑拆分（V1）

## M0 - 基础脚手架（1 周）

### 目标
- 搭建 `web-editor`、`figma-plugin`、`shared` 三模块结构
- 建立统一 lint/format/typecheck

### 验收标准
- 两端工程可本地启动
- `shared` 类型可被双端引用

---

## M1 - Web 编辑器 MVP（1.5 周）

### 目标
- 支持节点拖拽、连线
- 支持属性编辑
- 支持导入/导出 Workflow JSON

### 验收标准
- 可构建最小链路：`read -> filter -> update -> output`
- 导出的 JSON 可通过 schema 校验

---

## M2 - Plugin 执行器 MVP（1.5 周）

### 目标
- 导入并校验 Workflow
- 拓扑执行节点
- 输出结构化日志

### 验收标准
- 能对 Figma 文本节点执行过滤 + 文本/颜色更新
- 失败节点可定位（nodeId + error message）

---

## M3 - 端到端联调与稳定性（1 周）

### 目标
- 打通 Web 导出到 Plugin 执行全链路
- 增加异常场景测试

### 验收标准
- 覆盖主要失败路径：无效 schema、未知节点、图有环
- 执行日志可用于快速排障

---

## 风险与缓解

1. **节点配置失配**：通过 `nodeRegistry + config schema` 约束。
2. **图复杂度上升**：V1 限制 DAG，先不支持分支/循环。
3. **插件运行时限制**：将复杂编辑交互留在 Web 端，Plugin 专注执行。
