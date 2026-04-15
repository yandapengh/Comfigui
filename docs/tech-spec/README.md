# ComfigUI 可开发技术规格包（V1）

本规格包将 PRD 转换为可落地的工程文档，覆盖：

1. 目录结构
2. 接口定义（Web 编辑器 ↔ Plugin）
3. Workflow JSON Schema（V1）
4. 执行器伪代码
5. 里程碑拆分

## 文档索引

- `01-architecture.md`：系统架构与运行时职责
- `02-directory-structure.md`：建议目录结构与模块边界
- `03-interfaces.md`：数据与消息接口定义
- `04-workflow-schema.json`：Workflow JSON Schema（draft 2020-12）
- `05-executor-pseudocode.md`：执行器核心流程伪代码
- `06-milestones.md`：V1 里程碑、验收标准、风险

## V1 约束

- 仅支持 DAG（不支持循环/分支）
- AI 仅用于生成/优化建议，不直接执行
- 存储以本地 JSON 文件为主，不含云端协作
