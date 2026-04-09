"use client";

import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";

export default function HeaderButton() {
  return (
    <Button variant="default" size="default" className="bg-primary text-primary-foreground hover:bg-primary-hover transition-colors duration-200" onClick={() => {
      console.log("Sugerir una herramienta");
    }}>
      <PlusIcon className="size-4" />
      Sugerir una herramienta
    </Button>
  );
}