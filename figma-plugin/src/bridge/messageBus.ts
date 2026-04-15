export type PluginUIMessage =
  | { type: "IMPORT_WORKFLOW"; payload: string }
  | { type: "RUN_WORKFLOW" };

export type PluginMainMessage =
  | { type: "RUN_STATUS"; payload: "idle" | "running" | "success" | "failed" }
  | { type: "EXEC_LOG"; payload: string };
