# 02. 目录结构（建议）

```text
Comfigui/
├─ docs/
│  └─ tech-spec/
│     ├─ README.md
│     ├─ 01-architecture.md
│     ├─ 02-directory-structure.md
│     ├─ 03-interfaces.md
│     ├─ 04-workflow-schema.json
│     ├─ 05-executor-pseudocode.md
│     └─ 06-milestones.md
├─ shared/
│  └─ workflow/
│     ├─ types.ts              # Workflow/Node/Edge 类型
│     ├─ nodeRegistry.ts       # 节点注册表（双端共用）
│     └─ validators.ts         # schema/graph/config 校验
├─ web-editor/
│  ├─ src/
│  │  ├─ app/
│  │  ├─ components/
│  │  │  ├─ NodePalette.tsx
│  │  │  ├─ WorkflowCanvas.tsx
│  │  │  └─ PropertyPanel.tsx
│  │  ├─ io/
│  │  │  ├─ importWorkflow.ts
│  │  │  └─ exportWorkflow.ts
│  │  └─ state/
│  │     └─ workflowStore.ts
│  └─ package.json
├─ figma-plugin/
│  ├─ src/
│  │  ├─ ui/
│  │  │  ├─ App.tsx
│  │  │  └─ LogPanel.tsx
│  │  ├─ core/
│  │  │  ├─ executor.ts
│  │  │  ├─ graph.ts
│  │  │  └─ context.ts
│  │  ├─ nodes/
│  │  │  ├─ readPage.ts
│  │  │  ├─ filterText.ts
│  │  │  ├─ updateText.ts
│  │  │  └─ updateColor.ts
│  │  └─ bridge/
│  │     └─ messageBus.ts
│  └─ manifest.json
└─ package.json
```

## 模块边界原则

- `shared` 只放纯类型/纯函数，不依赖 UI 或 Figma runtime
- `web-editor` 不直接包含执行器逻辑
- `figma-plugin` 不承担节点图编辑职责
