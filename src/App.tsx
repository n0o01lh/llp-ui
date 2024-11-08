import { Outlet } from "react-router";
import "./App.css";
import Sidebar from "@/components/Sidebar";
import { useState } from "react";

import TopMenu from "./components/Shared/TopMenu";

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
        <TopMenu
          title={activeTab.toLocaleUpperCase()}
          toggleSidebar={toggleSidebar}
        />
        <div className="flex-1 p-8 overflow-auto bg-gray-100 dark:bg-gray-900">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default App;
