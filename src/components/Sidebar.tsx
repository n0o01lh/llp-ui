import React, { useState } from "react";
import {
  X,
  BookOpen,
  Layers,
  GraduationCap,
  Moon,
  Sun,
  BarChart,
} from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";

interface SidebarProps {
  setActiveTab: (x: string) => void;
  setIsSidebarOpen: (x: boolean) => void;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const { setActiveTab, setIsSidebarOpen, toggleSidebar } = props;
  const [activeTab] = useState("resources");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`flex h-screen bg-gray-100 dark:bg-gray-900 ${
        isDarkMode ? "dark" : ""
      }`}
    >
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-blue-800 dark:bg-blue-900 text-white p-6 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="flex flex-col items-center mb-8">
          <BookOpen className="h-12 w-12 mb-2" />
          <h1 className="text-2xl font-bold">Course Creator</h1>
        </div>
        <nav className="space-y-2">
          <button
            className={`w-full text-left py-2 px-4 rounded flex items-center ${
              activeTab === "resources" ? "bg-blue-700 dark:bg-blue-800" : ""
            }`}
            onClick={() => {
              setActiveTab("resources");
              navigate("/resources");
              if (window.innerWidth < 768) setIsSidebarOpen(false);
            }}
          >
            <Layers className="h-5 w-5 mr-2" />
            Resources
          </button>
          <button
            className={`w-full text-left py-2 px-4 rounded flex items-center ${
              activeTab === "courses" ? "bg-blue-700 dark:bg-blue-800" : ""
            }`}
            onClick={() => {
              setActiveTab("courses");
              navigate("/courses");
              if (window.innerWidth < 768) setIsSidebarOpen(false);
            }}
          >
            <GraduationCap className="h-5 w-5 mr-2" />
            Courses
          </button>
          <button
            className={`w-full text-left py-2 px-4 rounded flex items-center ${
              activeTab === "data" ? "bg-blue-700 dark:bg-blue-800" : ""
            }`}
            onClick={() => {
              setActiveTab("data");
              navigate("/sales");
              if (window.innerWidth < 768) setIsSidebarOpen(false);
            }}
          >
            <BarChart className="h-5 w-5 mr-2" />
            Data
          </button>
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 md:hidden"
          onClick={toggleSidebar}
        >
          <X className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
          onClick={toggleDarkMode}
        >
          {isDarkMode ? (
            <Sun className="h-6 w-6" />
          ) : (
            <Moon className="h-6 w-6" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
