import { Outlet } from "react-router";
import "./App.css";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { ChevronDown, LogOut, Menu, User } from "lucide-react";
import { useState } from "react";
import { UserStoreState, useUserStore } from "./store/userStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";

function App() {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || ""
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userAuth = useUserStore((state: UserStoreState) => state.userAuth);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`flex h-screen bg-gray-100 dark:bg-gray-900`}>
      <div>
        <Sidebar
          setActiveTab={setActiveTab}
          setIsSidebarOpen={setIsSidebarOpen}
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          activeTab={activeTab}
        />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <h1 className="text-xl font-semibold dark:text-white">
            {activeTab.toLocaleUpperCase()}
          </h1>
          <div className="ml-auto flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8 border border-black">
                    <AvatarImage src="/placeholder.svg" alt="User avatar" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <span className="font-medium dark:text-white">
                    {userAuth!.username}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex-1 p-8 overflow-auto bg-gray-100 dark:bg-gray-900">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
