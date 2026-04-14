import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  const suggestMailtoHref = `mailto:diegocamodev@gmail.com?subject=${encodeURIComponent("Sugerencia de herramienta")}`;

  return (
    <footer className="border-t border-border px-4 py-10">
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 text-center md:flex-row md:items-center md:justify-between md:text-left">
        <div className="flex max-w-md flex-col items-center gap-2 md:items-start">
          <p className="font-headline text-lg font-bold tracking-tight font-heading">
            <span className="text-primary">Toolfol</span>.io
          </p>
          <p className="text-sm text-muted-foreground max-w-md">
            Herramientas web para desarrollo, diseño y marketing.
          </p>
          <p className="text-sm text-muted-foreground">© {year} Toolfolio</p>
        </div>

        <nav
          aria-label="Enlaces del sitio"
          className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm md:justify-end"
        >
          <Link className="text-muted-foreground hover:text-foreground transition-colors" href="/">
            Inicio
          </Link>
          <Link className="text-muted-foreground hover:text-foreground transition-colors" href="#categories">
            Categorías
          </Link>
          <a className="text-muted-foreground hover:text-foreground transition-colors" href={suggestMailtoHref}>
            Sugerir herramienta
          </a>
          <Link
            className="text-muted-foreground hover:text-foreground transition-colors"
            href="https://github.com/dcavadiam/toolfolio"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </Link>
        </nav>
      </section>
    </footer>
  );
}

