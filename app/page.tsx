export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-background px-6 py-16">
      <main className="flex max-w-lg flex-col items-center text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          Próximamente
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
          toolfol<span className="text-zinc-400 dark:text-zinc-500">.</span>io
        </h1>
        <p className="mt-6 text-pretty text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          Estamos preparando algo nuevo. Vuelve pronto.
        </p>
        <div
          className="mt-10 h-px w-24 bg-gradient-to-r from-transparent via-zinc-300 to-transparent dark:via-zinc-600"
          aria-hidden
        />
      </main>
    </div>
  );
}
