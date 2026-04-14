import toolsES from "@/lib/data/tools.es.json";
import type { ToolItem } from "@/types";

export type ToolPromptEntry = Pick<
  ToolItem,
  "title" | "description" | "category" | "subCategory" | "type" | "tags" | "link"
>;

/**
 * Catálogo mínimo para el prompt del modelo (solo datos públicos del sitio).
 */
export function getToolCatalogForPrompt(): ToolPromptEntry[] {
  return toolsES.map((tool) => ({
    title: tool.title as string,
    description: tool.description as string,
    category: tool.category as string,
    subCategory: tool.subCategory as string,
    type: tool.type as ToolItem["type"],
    tags: tool.tags as string[],
    link: tool.link as string,
  }));
}

export function getToolCatalogJson(): string {
  return JSON.stringify(getToolCatalogForPrompt());
}
