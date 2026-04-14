import ToolRecommendationChat from "@/components/chat/ToolRecommendationChat";
import Header from "@/components/layout/Header";
import ToolCard from "@/components/layout/ToolCard";
import type { ToolItem } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatLabel } from "@/lib/utils";
import toolsES from "@/lib/data/tools.es.json";

const toolsData: ToolItem[] = [
  ...toolsES.map((tool) => ({
    title: tool.title as string,
    description: tool.description as string,
    category: tool.category as string,
    subCategory: tool.subCategory as string,
    type: tool.type as "free" | "paid",
    tags: tool.tags as string[],
    icon: (tool as { icon?: string }).icon,
    link: tool.link as string,
  })),
];

const toolsByCategory = toolsData.reduce<Record<string, ToolItem[]>>((acc, tool) => {
  (acc[tool.category] ??= []).push(tool);
  return acc;
}, {});

export default function Home() {
  return (
    <>
      <Header />
      <main className="relative flex min-h-0 flex-col items-center justify-center gap-4 overflow-hidden p-4">
        <section className="relative flex w-full max-w-6xl flex-col items-center justify-center gap-5 pb-10 pt-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-heading font-bold uppercase tracking-[0.2em] text-primary shadow-sm ring-1 ring-primary/10 backdrop-blur-sm dark:bg-primary/10">
            Bienvenido a Toolfolio
          </span>
          <h1 className="max-w-4xl bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl md:text-6xl md:leading-[1.08]">
            Encuentra la herramienta perfecta para tu trabajo
          </h1>
          <p className="mb-4 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Descubre una amplia gama de herramientas diseñadas para simplificar
            tus tareas diarias y mejorar tu productividad.
          </p>
          {/* Search and filter */}
          {/* <div className="relative min-w-0 flex-1 w-full">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-5 text-muted-foreground -translate-y-1/2"
              aria-hidden
            />
            <Input
              type="search"
              placeholder="Buscar herramienta"
              aria-label="Buscar herramienta"
              className="border border-transparent bg-surface-search p-7 pl-10 pr-3 text-lg text-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40 dark:border-border/40"
            />
          </div> */}
        </section>
        {/* Tools list */}
        <section
          id="categories"
          className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-14 pb-24"
        >
          {Object.entries(toolsByCategory).map(([category, categoryTools]) => (
            <div key={category} className="flex w-full flex-col gap-5 text-left">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                  {formatLabel(category)}
                </h2>
                <div className="h-1 w-12 rounded-full bg-gradient-to-r from-primary to-violet-500 md:w-16" />
              </div>
              <Carousel className="w-full">
                <CarouselContent>
                  {categoryTools.map((tool) => (
                    <CarouselItem
                      key={`${category}-${tool.title}`}
                      className="basis-full sm:basis-1/2 md:basis-1/3"
                    >
                      <ToolCard
                        title={tool.title}
                        description={tool.description}
                        category={tool.category}
                        subCategory={tool.subCategory}
                        tags={tool.tags}
                        type={tool.type}
                        link={tool.link}
                        icon={tool.icon}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {categoryTools.length > 4 && (
                  <>
                    <CarouselPrevious className="border-primary/25 bg-background/90 text-primary shadow-lg shadow-primary/10 backdrop-blur-sm transition-all hover:border-primary/45 hover:bg-primary/8 hover:shadow-primary/20" />
                    <CarouselNext className="border-primary/25 bg-background/90 text-primary shadow-lg shadow-primary/10 backdrop-blur-sm transition-all hover:border-primary/45 hover:bg-primary/8 hover:shadow-primary/20" />
                  </>
                )}
              </Carousel>
            </div>
          ))}
        </section>
      </main>
      <ToolRecommendationChat />
    </>
  );
}
