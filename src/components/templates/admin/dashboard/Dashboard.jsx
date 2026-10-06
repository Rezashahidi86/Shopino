import {
  FiUsers,
  FiShoppingBag,
  FiPackage,
  FiDollarSign,
} from "react-icons/fi";
import AreaChartUsers from "./charts/AreaChartUsers";
import BarUsersOrders from "./charts/BarChartOrders";
import AreaChartSell from "./charts/AreaChartSell";
import CartInfo from "./fragments/CartInfo";

const stats = [
  {
    title: "اعضای سایت",
    value: "12,580",
    change: "12.5%",
    positive: true,
    icon: FiUsers,
  },
  {
    title: "سفارش‌های امروز",
    value: "248",
    change: "8.2%",
    positive: true,
    icon: FiShoppingBag,
  },
  {
    title: "محصولات",
    value: "1,842",
    change: "4.6%",
    positive: true,
    icon: FiPackage,
  },
  {
    title: "فروش امروز",
    value: "86,450,000",
    change: "3.1%",
    positive: false,
    icon: FiDollarSign,
  },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800 dark:text-white">
          داشبورد مدیریت
        </h1>

        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          نمای کلی وضعیت فروشگاه و فعالیت کاربران
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <CartInfo key={item.title} item={item}></CartInfo>
        ))}
      </div>

      <div className="grid gap-6">
        <AreaChartUsers></AreaChartUsers>
        <BarUsersOrders></BarUsersOrders>
        <AreaChartSell></AreaChartSell>
      </div>
    </div>
  );
};

export default AdminDashboard;
