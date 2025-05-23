/** @format */

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Lock,
  Home,
  LogOut,
  Compass,
  ChefHat,
  CookingPot,
} from "lucide-react";
import { Outlet, NavLink } from "react-router-dom";
import { WrapperDelete } from "@/components/WrapperDelete";
import { TooltipWrapper } from "@/components/TooltipWrapper";
import { useHandleLogout, useIsAuthenticated } from "@/features/authHooks";

export default function DashboardLayout() {
  useIsAuthenticated();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const logout = useHandleLogout();

  const tabs = [
    { name: "home", label: "Home" },
    { name: "product", label: "Products" },
    { name: "order", label: "Orders" },
    { name: "account", label: "Account" },
    { name: "map", label: "Maps" },
    // { name: "appearance", label: "Appearance" },
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const MemoizedHomeIcon = useMemo(() => <Home className="mr-2 h-4 w-4" />, []);

  return (
    <div className="flex h-screen bg-gray-100" id="fancyPattern">
      {/* Sidebar */}
      <aside
        id="sidebar"
        className={`bg-white w-64 min-h-screen flex flex-col border border-dashed ${
          isSidebarOpen ? "block" : "hidden"
        } md:block`}
      >
        <WrapperDelete />
        <div className="p-4 border-b">
          <h2 className="text-2xl font-semibold">Settings</h2>
        </div>
        <nav className="flex-grow">
          <ul className="p-2 space-y-2">
            {tabs.map((tab) => (
              <li key={tab.name}>
                <NavLink
                  onClick={toggleSidebar}
                  to={`${tab.name}`}
                  className={({ isActive }) =>
                    `w-full flex items-center justify-start p-2 rounded ${
                      isActive ? "bg-zinc-100 text-black" : "text-black"
                    }`
                  }
                >
                  {tab.name === "product" && (
                    <ChefHat className="mr-2 h-4 w-4" />
                  )}
                  {tab.name === "home" && MemoizedHomeIcon}
                  {tab.name === "account" && <Lock className="mr-2 h-4 w-4" />}
                  {tab.name === "map" && <Compass className="mr-2 h-4 w-4" />}
                  {tab.name === "order" && (
                    <CookingPot className="mr-2 h-4 w-4" />
                  )}
                  {/* {tab.name === "appearance" && (
                    <Palette className="mr-2 h-4 w-4" />
                  )} */}
                  {tab.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-grow overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex justify-between w-full">
              <h1 className="text-2xl font-semibold text-gray-900">
                User Settings
              </h1>
              <TooltipWrapper message="logout">
                <LogOut
                  size={18}
                  className="cursor-pointer"
                  onClick={() => logout.logout()}
                />
              </TooltipWrapper>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
          {/* <div className="mt-6 flex justify-end">
            <Button>Save Changes</Button>
          </div> */}
        </main>
      </div>
    </div>
  );
}
