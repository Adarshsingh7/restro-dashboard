/** @format */

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import DashboardLayout from "./pages/DashboardLayout";
import Account from "./pages/Account";
import DashboardPage from "./pages/DashboardPage";
import Product from "./pages/Product";
import Order from "./pages/Order";
import AuthFormComponent from "./pages/AuthPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Protect from "./components/Protect";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Wrapper from "./pages/Wrapper";
import InteractiveMap from "./pages/InteractiveMap";
import { useMemo } from "react"; // Import useMemo
import LandingPage from "./pages/LandingPage";

const router = createBrowserRouter([
  {
    path: "login",
    element: <AuthFormComponent />,
  },
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <Protect>
        <DashboardLayout />
      </Protect>
    ),
    children: [
      {
        path: "account",
        element: <Account />,
      },
      {
        path: "home",
        element: <DashboardPage />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "order",
        element: <Order />,
      },
      {
        path: "map",
        element: <InteractiveMap />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const devtools = useMemo(
    () =>
      process.env.NODE_ENV === "development" ? (
        <div>
          <ReactQueryDevtools initialIsOpen={false} />
        </div>
      ) : null,
    [],
  );
  const routerProvider = useMemo(
    () => <RouterProvider router={router} />,
    [router],
  );

  return (
    <QueryClientProvider client={queryClient}>
      {devtools}
      <Wrapper>{routerProvider}</Wrapper>
    </QueryClientProvider>
  );
}

export default App;
