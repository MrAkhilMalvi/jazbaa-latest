import Layout from "@/components/Layout";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import RequireAuth from "@/components/RequireAuth";

// Lazy-loaded pages
const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Events = lazy(() => import("@/pages/Events"));
const Join = lazy(() => import("@/pages/Join"));
const Landing = lazy(() => import("@/pages/Landing"));

// Page loader skeleton
function PageLoader() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        <span className="text-xs font-mono text-muted-foreground tracking-wider uppercase">
          Loading...
        </span>
      </div>
    </div>
  );
}

// Route tree
const rootRoute = createRootRoute({
  component: Layout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Home />
    </Suspense>
  ),
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <About />
    </Suspense>
  ),
});

const eventsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/events",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      {/* <RequireAuth> */}
        <Events />
      {/* </RequireAuth> */}
    </Suspense>
  ),
});

const joinRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/join",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Join />
    </Suspense>
  ),
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/landing",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Landing />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  eventsRoute,
  joinRoute,
  landingRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
