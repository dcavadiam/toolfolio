/**
 * Capas de fondo animadas (solo CSS). Fijo detrás del contenido vía layout.
 */
export default function DynamicBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-background" />

      <div className="toolfolio-mesh-layer absolute inset-0 opacity-85 dark:opacity-95" />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_85%_50%_at_50%_-18%,rgba(99,102,241,0.22),transparent_58%)] dark:bg-[radial-gradient(ellipse_85%_48%_at_50%_-12%,rgba(99,102,241,0.18),transparent_55%)]" />

      <div className="absolute left-1/2 top-[38%] -translate-x-1/2 -translate-y-1/2">
        <div
          className="size-[min(125vw,920px)] rounded-full bg-[conic-gradient(from_200deg_at_50%_50%,rgba(99,102,241,0.38),transparent_22%,rgba(192,132,252,0.22)_42%,transparent_58%,rgba(244,114,182,0.16)_78%,transparent)] opacity-55 blur-[100px] motion-safe:animate-[spin_140s_linear_infinite] motion-reduce:animate-none dark:opacity-35"
        />
      </div>

      <div className="absolute -left-32 top-[16%] size-[28rem] rounded-full bg-primary/18 blur-3xl motion-safe:animate-toolfolio-float motion-reduce:animate-none dark:bg-primary/14" />
      <div className="absolute -right-28 top-[30%] size-[24rem] rounded-full bg-fuchsia-500/14 blur-3xl motion-safe:animate-toolfolio-float motion-reduce:animate-none [animation-delay:-3.5s] dark:bg-fuchsia-600/11" />
      <div className="absolute bottom-[8%] left-[12%] size-[22rem] rounded-full bg-sky-400/11 blur-3xl motion-safe:animate-toolfolio-float motion-reduce:animate-none [animation-delay:-6s] dark:bg-sky-500/13" />
      <div className="absolute -bottom-16 right-[8%] size-[26rem] rounded-full bg-violet-500/12 blur-3xl motion-safe:animate-toolfolio-float motion-reduce:animate-none [animation-delay:-2s] dark:bg-violet-600/10" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.035)_1px,transparent_1px)] bg-[size:44px_44px] dark:bg-[linear-gradient(rgba(99,102,241,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.07)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_78%_68%_at_50%_48%,rgba(0,0,0,0.5),transparent)]" />

      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
    </div>
  );
}
