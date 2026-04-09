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
      <main className="flex min-h-0 flex-col items-center justify-center gap-4 bg-background p-4">
        <section className="flex flex-col items-center justify-center gap-4 pt-24 pb-8 w-full max-w-6xl mx-auto text-center">
          <span className="text-sm text-primary uppercase tracking-[0.2em] font-heading font-bold">
            Bienvenido a Toolfolio
          </span>
          <h1 className="text-6xl font-extrabold">
            Encuentra la herramienta perfecta para tu trabajo
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
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
        <section id="categories" className="flex flex-col items-center justify-center gap-12 pb-24 w-full max-w-6xl mx-auto">
          {Object.entries(toolsByCategory).map(([category, categoryTools]) => (
            <div key={category} className="flex w-full flex-col gap-4 text-left">
              <h2 className="text-2xl font-bold tracking-tight">
                {formatLabel(category)}
              </h2>
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
                    <CarouselPrevious />
                    <CarouselNext />
                  </>
                )}
              </Carousel>
            </div>
          ))}
        </section>
      </main>
    </>
  );
}
