import { LazyExoticComponent, Suspense, lazy } from "react";
import { RouteObject } from "react-router-dom";
import SuspenseLoader from "src/components/Loader/SuspenseLoader";
// import BaseLayout from 'src/layouts/BaseLayout';
import SidebarLayout from "src/layout/SidebarLayout";

const Loader = (Components: LazyExoticComponent<any>) => (props: any) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Components {...props} />
    </Suspense>
  );

// Pages

// Dashboards
const Dashboard = Loader(lazy(() => import("src/pages/Dashboard")));
// Orders
const Orders = Loader(lazy(() => import("src/pages/Orders")));

// Status
// const Status404 = Loader(
//   lazy(() => import('src/content/pages/Status/Status404'))
// );

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
];
