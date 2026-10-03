import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createRootRouteWithContext, useRouter, HeadContent, Scripts, type ErrorComponentProps } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[color:var(--color-siryc-dark)] px-4 text-white">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Página no encontrada</h2>
        <p className="mt-2 text-sm text-white/70">La página que buscas no existe o fue movida.</p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[color:var(--color-siryc-red)] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:opacity-90"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight">Ocurrió un error</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          No pudimos cargar esta página. Puedes reintentar o volver al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
          >
            Reintentar
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border px-5 py-2 text-sm font-medium"
          >
            Inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SIRYC — Ingeniería en refrigeración, climatización y electricidad" },
      {
        name: "description",
        content:
          "Más de 20 años en refrigeración industrial, climatización y electricidad para centros comerciales, edificios corporativos e instituciones en Chile.",
      },
      { name: "author", content: "SIRYC" },
      { property: "og:title", content: "SIRYC — Ingeniería en refrigeración, climatización y electricidad" },
      {
        property: "og:description",
        content:
          "Más de 20 años en refrigeración industrial, climatización y electricidad para centros comerciales, edificios corporativos e instituciones en Chile.",
      },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "SIRYC" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "SIRYC — Ingeniería en refrigeración, climatización y electricidad" },
      {
        name: "twitter:description",
        content:
          "Más de 20 años en refrigeración industrial, climatización y electricidad para centros comerciales, edificios corporativos e instituciones en Chile.",
      },
      {
        property: "og:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8d089586-70ac-4ce8-b071-bf3df8990fd6/id-preview-cb0b100a--677beb3d-3aa9-420d-b1fe-e8cfb67f3218.lovable.app-1785033716609.png",
      },
      {
        name: "twitter:image",
        content:
          "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/8d089586-70ac-4ce8-b071-bf3df8990fd6/id-preview-cb0b100a--677beb3d-3aa9-420d-b1fe-e8cfb67f3218.lovable.app-1785033716609.png",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Exo+2:wght@500;600;700&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es-CL">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <ScrollProgress />
        <SiteHeader />
        <main className="flex-1">
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
  );
}
