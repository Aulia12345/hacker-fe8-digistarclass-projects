import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductsDetail, {
  loader as productLoader,
} from "./pages/ProductsDetail";

import Dashboard from "./pages/dashboard/Dashboard";
import Users from "./pages/dashboard/Users";
import Setting from "./pages/dashboard/Settings";
import Login, { loader as loginLoader } from "./pages/dashboard/Login";
import Root, { loader as rootLoader } from "./pages/dashboard/Root";
import ErrorPage from "./pages/ErrorPage";
import Celengan from "./pages/tabungan/Celengan";
import Atm from "./pages/tabungan/Atm";

const router = createBrowserRouter([
  // basic
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/products",
    element: <Products />,
  },

  {
    path: "/celengan",
    element: <Celengan />,
  },
  {
    path: "/atm",
    element: <Atm />,
  },

  // parameter
  {
    path: "/products/:id",
    element: <ProductsDetail />,
    loader: productLoader,
  },
  {
    path: "/login",
    element: <Login />,
    loader: loginLoader,
  },
  // nested routes
  {
    path: "/dashboard",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },

      {
        path: "/dashboard/users",
        element: <Users />,
      },
      {
        path: "/dashboard/settings",
        element: <Setting />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
