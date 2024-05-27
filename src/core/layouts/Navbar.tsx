import { cn } from "@/core/libs/utils";
import useAuthStore from "@/stores/useAuthStore";
import { Button, Layout } from "antd";
import { Link, useLocation } from "react-router-dom";

interface Menu {
  label: string;
  link: string;
}

const Navbar = () => {
  const location = useLocation();
  const { clearTokens } = useAuthStore();
  const menus: Menu[] = [
    { link: "", label: "Home" },
    { link: "customers", label: "Customers" },
    { link: "repairs", label: "Repair" },
    { link: "spare-parts", label: "Spare Parts" },
    { link: "settings", label: "Settings" },
  ];

  return (
    <Layout.Header className="flex items-center gap-5">
      {menus.map((menu: Menu, index: number) => (
        <Link
          to={menu.link}
          key={index}
          className={cn(
            "font-medium",
            location.pathname.split("/")[1] === menu.link
              ? "text-blue-500"
              : "text-slate-300"
          )}
        >
          {menu.label}
        </Link>
      ))}
      <Button className="ml-auto" onClick={clearTokens}>
        Sign out
      </Button>
    </Layout.Header>
  );
};

export default Navbar;
