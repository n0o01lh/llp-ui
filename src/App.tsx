import { Outlet } from "react-router";
import "./App.css";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

function App() {
  const [activeTab, setActiveTab] = useState(
    localStorage.getItem("activeTab") || ""
  );
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        </header>
        <div className="flex-1 p-8 overflow-auto bg-gray-100 dark:bg-gray-900">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
