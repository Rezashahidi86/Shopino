import { createBrowserRouter, RouterProvider } from "react-router";
const routes = createBrowserRouter(
  [
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
          const { data } = await getMe();

          if (data.data.user.roles.join("").includes("ADMIN")) {
            return data.data.user;
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
