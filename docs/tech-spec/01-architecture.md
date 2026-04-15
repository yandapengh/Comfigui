# 01. 架构说明

## 1.1 目标

构建「外部网页节点编辑 + Figma 插件执行」的双端系统，确保：

- 编辑体验复杂度放在 Web 端
- 执行权限与 Figma API 调用留在 Plugin 端
- 通过标准化 JSON Workflow 打通链路

## 1.2 组件与职责

### Web Node Editor（本地运行）

- 节点库：展示可用节点类型
- 画布：拖拽、连线、参数编辑
- 导入/导出：Workflow JSON
- 校验：基础图校验（节点存在、连线合法）

### Figma Plugin

- 导入 Workflow JSON
- Workflow 版本与结构校验
- DAG 拓扑执行
- 结构化执行日志展示

### Figma API

- 数据读取（page/frame/text）
- 节点变更执行（text/color）

## 1.3 运行时流程

1. 用户在 Web 端创建并保存 `workflow.json`
2. 用户在 Figma 插件中导入该 JSON
3. Plugin 完成 `schema + graph + node config` 校验
4. Plugin 执行拓扑排序后的节点
5. 每个节点产生结构化日志并汇总展示

## 1.4 非目标（V1）

- 云端同步
- 多人协作冲突处理
- 循环/分支控制流
- 复杂事务回滚
