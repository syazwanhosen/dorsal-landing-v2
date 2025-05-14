import { useRoutes } from "react-router-dom";
import { appRoutes } from "./routes";
import { Suspense } from "react";

export default function AppRouter() {
  const routes = useRoutes(appRoutes);

  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      {routes}
    </Suspense>
  );
}
