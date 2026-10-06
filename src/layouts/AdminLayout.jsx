import { useState } from "react";
import {
  FiBox,
  FiGrid,
  FiLayers,
  FiMessageCircle,
  FiPackage,
  FiShoppingBag,
  FiShoppingCart,
  FiUsers,
} from "react-icons/fi";
import { useNavigate } from "react-router";
import Header from "../components/common/admin/Header";
import Aside from "../components/common/admin/Aside";
import { AuthProvider } from "../context/AuthProvider";
import ScrollToTop from "../components/common/ScrollToTop";
import AppToaster from "../components/common/AppToaster";
import ThemeToggle from "../components/common/Themetoggele";

const menuItems = [
  {
    title: "داشبورد",
    path: "/admin",
    icon: FiGrid,
    end: true,
  },
  {
    title: "محصولات",
    path: "/admin/products",
    icon: FiBox,
  },
  {
    title: "دسته‌بندی‌ها",
    path: "/admin/categories",
    icon: FiLayers,
  },
  {
    title: "فروشندگان",
    path: "/admin/sellers",
    icon: FiShoppingBag,
  },
  {
    title: "سفارش‌ها",
    path: "/admin/orders",
    icon: FiShoppingCart,
  },
  {
    title: "کاربران",
    path: "/admin/users",
    icon: FiUsers,
  },
  {
    title: "نظرات",
    path: "/admin/comments",
    icon: FiMessageCircle,
  },
  {
    title: "انبار",
    path: "/admin/inventory",
    icon: FiPackage,
  },
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <AuthProvider>
      <div
        dir="rtl"
        className="min-h-screen bg-slate-100 text-slate-800 dark:bg-[#0f172a] dark:text-slate-200"
      >
        <div
          className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden ${
            sidebarOpen
              ? "visible opacity-100"
              : "pointer-events-none invisible opacity-0"
          }`}
          onClick={() => setSidebarOpen(false)}
        />
        <Aside
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          menuItems={menuItems}
        ></Aside>
        <Header setSidebarOpen={setSidebarOpen}></Header>
      </div>
      <ScrollToTop></ScrollToTop>
      <AppToaster></AppToaster>
      <ThemeToggle></ThemeToggle>
    </AuthProvider>
  );
};

export default AdminLayout;
