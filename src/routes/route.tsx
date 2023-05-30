import { LazyExoticComponent, Suspense, lazy } from "react";
import { RouteObject } from "react-router-dom";
import SuspenseLoader from "@components/Loader/SuspenseLoader";
// import BaseLayout from 'src/layouts/BaseLayout';
import SidebarLayout from "@layout/SidebarLayout";
import BaseLayout from "@layout/BaseLayout";

const Loader = (Components: LazyExoticComponent<any>) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Components {...props} />
    </Suspense>
  );

// Pages

// Dashboards
const Dashboard = Loader(lazy(() => import("@/pages/Dashboard")));
// Orders
const Orders = Loader(lazy(() => import("@/pages/Orders")));

// Status
const Status404 = Loader(lazy(() => import("@/pages/Status/Status404")));

export const routes: RouteObject[] = [
  {
    path: "",
    element: <SidebarLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      // {
      //     path: '*',
      //     element: <Status404 />
      // }
    ],
  },
  {
    path: "",
    element: <BaseLayout />,
    children: [
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
];
