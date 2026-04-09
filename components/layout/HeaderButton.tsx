"use client";

import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";

export default function HeaderButton() {
  const mailtoHref = `mailto:diegocamodev@gmail.com?subject=${encodeURIComponent("Sugerencia de herramienta")}`;

  return (
    <Button
      variant="default"
      size="default"
      className="bg-primary text-primary-foreground hover:bg-primary-hover transition-colors duration-200"
      onClick={() => {
        window.location.href = mailtoHref;
      }}
    >
      <PlusIcon className="size-4" />
      Sugerir una herramienta
    </Button>
  );
}