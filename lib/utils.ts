/** Une clases CSS omitiendo valores falsy (patrón tipo clsx, sin dependencia extra). */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
