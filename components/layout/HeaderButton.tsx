"use client";
import Button from "../ui/Button";

export default function HeaderButton() {
  return (
    <Button variant="primary" size="md" onClick={() => {
      console.log("Sugerir una herramienta");
    }}>
      Sugerir una herramienta
    </Button>
  );
}