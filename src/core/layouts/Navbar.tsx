import { cn } from "@/core/libs/utils";
import useAuthStore from "@/stores/useAuthStore";
import { Layout } from "antd";
import { useState } from "react";
import {
  PiAlignLeftDuotone,
  PiAlignTopDuotone,
  PiSignOutDuotone,
} from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";

interface Menu {
  label: string;
  link: string;
}

const Navbar = () => {
  const location = useLocation();
  const { clearTokens } = useAuthStore();
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
  const menus: Menu[] = [
    { link: "customers", label: "Customers" },
    { link: "repairs", label: "Repair" },
    { link: "spare-parts", label: "Spare Parts" },
    { link: "settings", label: "Settings" },
  ];

  return (
    <div className="flex flex-col">
      <Layout.Header
        className={cn(
          "flex items-center gap-5 p-0 px-5 rounded-b-xl",
          isOpenMenu ? "rounded-none" : undefined
        )}
      >
        <button
          className="text-xl bg-slate-100 p-1 rounded-md text-slate-950 sm:flex md:hidden"
          onClick={() => setIsOpenMenu(!isOpenMenu)}
        >
          {isOpenMenu ? <PiAlignTopDuotone /> : <PiAlignLeftDuotone />}
        </button>
        <Link to="/" className="text-white">
          Profixify
        </Link>
        <div className="xs:hidden md:flex items-center gap-2 ">
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
        </div>
        <button
          className="text-xl bg-slate-100 p-1 rounded-md text-slate-950 ml-auto flex items-center gap-2 px-2"
          onClick={clearTokens}
        >
          <PiSignOutDuotone />
          <span className="xs:hidden md:flex !text-xs"> Sign Out</span>
        </button>
        {/* <Button className="ml-auto" onClick={clearTokens}>
        </Button> */}
      </Layout.Header>
      {isOpenMenu ? (
        <Layout.Header className="xs:flex md:hidden flex-col h-auto pb-5 rounded-b-xl px-5 gap-2">
          {menus.map((menu: Menu, index: number) => (
            <Link
              to={menu.link}
              key={index}
              onClick={() => setIsOpenMenu(false)}
              className={cn(
                "font-medium leading-6 px-2 py-1 flex items-center hover:bg-slate-800 rounded-md",
                location.pathname.split("/")[1] === menu.link
                  ? "text-blue-500"
                  : "text-slate-300"
              )}
            >
              {menu.label}
            </Link>
          ))}
        </Layout.Header>
      ) : undefined}
    </div>
  );
};

export default Navbar;
