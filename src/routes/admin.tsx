import { createFileRoute, Outlet } from "@tanstack/react-router";

import { AdminGate } from "@/components/admin/AdminGate";

/**
 * Catalog manager layout.
 *
 * Rendered on the client only: the sign-in session lives in the browser, and
 * the catalog data behind it is protected in the database by row-level
 * security rather than by this component.
 */
export const Route = createFileRoute("/admin")({
  ssr: false,
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <AdminGate>
      <Outlet />
    </AdminGate>
  );
}
