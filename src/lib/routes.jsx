import { createBrowserRouter } from "react-router";
import AppLayout from "../layouts/AppLayout";
import Auth from "../page/Auth";
import { getMe } from "../services/auth/auth.service";
import Home from "../page/Home";
import Communication from "../page/Communication";
import AboutUs from "../page/AboutUs";
import Category from "../page/Category";
import Product from "../page/product";
import Cart from "../page/Cart";
import NotFound from "../page/NotFound";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    loader: async () => {
      try {
        const { data } = await getMe();
        return data.data.user;
      } catch (error) {
        return null;
      }
    },
    children: [
      { index: true, Component: Home },
      { path: "/communication", Component: Communication },
      { path: "/about-us", Component: AboutUs },
      {
        path: "/category/:idCategory",
        Component: Category,
      },
      {
        path: "/subCategory/:idCategory",
        Component: Category,
      },
      {
        path: "/products",
        Component: Category,
      },
      {
        path: "/product/:idProduct",
        Component: Product,
      },
      {
        path: "/cart",
        Component: Cart,
      },
      {
        path: "/*",
        Component: NotFound,
      },
    ],
  },
  {
    path: "/login",
    Component: Auth,
  },
],{
  basename:"Shopino"
});

export default routes;
