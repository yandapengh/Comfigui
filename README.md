# ComfigUI

V1 开发脚手架（进行中）：

- `shared/`：双端共享类型、节点注册表、工作流校验
- `web-editor/`：外部节点编辑器基础 UI（React + React Flow）
- `figma-plugin/`：插件 UI 与执行器骨架
- `docs/tech-spec/`：技术规格文档

## 下一步

1. 安装依赖：`npm install`
2. Web 编辑器本地运行：`npm run -w @comfigui/web-editor dev`
3. 完善 plugin build pipeline（产出 `dist/code.js` / `dist/ui.html`）
4. 接入真实 Figma API 节点执行逻辑
