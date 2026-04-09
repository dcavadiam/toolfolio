export type ToolItem = {
    title: string;
    description: string;
    category: string;
    subCategory: string;
    type: "free" | "paid";
    tags: string[];
    icon?: string;
    link: string;
  };