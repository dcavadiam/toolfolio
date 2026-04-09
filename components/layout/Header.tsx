import Link from "next/link";
import HeaderButton from "./HeaderButton";

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b border-border-default py-4 shadow-lg shadow-foreground/5 px-4">
      <section className="flex items-center justify-between gap-4 w-full max-w-6xl mx-auto">
        <h1 className="font-headline text-2xl font-bold tracking-tight font-heading">
          <span className="text-primary">Toolfol</span>.io
        </h1>
        {/* <nav className="flex items-center gap-8 ">
          <Link href="/">Inicio</Link>
          <Link href="/">Acerca de</Link>
          <Link href="/">Contacto</Link>
        </nav> */}
        <HeaderButton />
      </section>
    </header>
  );
}
