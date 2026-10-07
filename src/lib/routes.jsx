import { createBrowserRouter, redirect, RouterProvider } from "react-router";
import Home from "../page/Home";
import AppLayout from "../layouts/AppLayout";
import Communication from "../page/Communication";
import AboutUs from "../page/AboutUs";
import Category from "../page/Category";
import Product from "../page/product";
import Cart from "../page/Cart";
import NotFound from "../page/NotFound";
import Auth from "../page/Auth";
import AdminLayout from "../layouts/AdminLayout";
import AdminUsers from "../page/admin/AdminUsers";
import CategoryAndSubCategory from "../page/admin/CategoryAndSubCategory";
import AdminDashboard from "../components/templates/admin/dashboard/Dashboard";
import AdminProducts from "../page/admin/AdminProducts";

const routes = createBrowserRouter(
  [
    {
      path: "/",
      Component: AppLayout,
      loader: async () => {
        try {
          const { data } = await getMe();
          console.log(data);
          return data.data.user;
        } catch (error) {
          return null;
        }
      },
      children: [
        { index: true, Component: Home },
        { path: "communication", Component: Communication },
        { path: "about-us", Component: AboutUs },
        {
          path: "category/:idCategory",
          Component: Category,
        },
        {
          path: "subCategory/:idCategory",
          Component: Category,
        },
        {
          path: "products",
          Component: Category,
        },
        {
          path: "product/:idProduct",
          Component: Product,
        },
        {
          path: "cart",
          Component: Cart,
        },
        {
          path: "*",
          Component: NotFound,
        },
      ],
    },

    {
      path: "/login",
      Component: Auth,
    },

    {
      path: "/admin",
      Component: AdminLayout,
      loader: async () => {
        try {
          const { infoUser } = await getMe();

          if (infoUser.roles.join("").includes("ADMIN")) {
            return infoUser;
          }

          return redirect("/");
        } catch (error) {
          return redirect("/login");
        }
      },
      children: [
        { index: true, Component: AdminDashboard },
        { path: "users", Component: AdminUsers },
        { path: "products", Component: AdminProducts },
        { path: "categories", Component: CategoryAndSubCategory },
      ],
    },
  ],
  {
    basename: "/Shopino/",
  },
);

export default routes;
