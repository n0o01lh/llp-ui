import React from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import UserMenu from "../UserMenu";
import { UserStoreState, useUserStore } from "@/store/userStore";

interface TopMenuProps {
  toggleSidebar?: () => void;
  title?: string;
}

const TopMenu: React.FC<TopMenuProps> = (props) => {
  const { toggleSidebar, title } = props;
  const userAuth = useUserStore((state: UserStoreState) => state.userAuth);
  const logout = useUserStore((state: UserStoreState) => state.clearUserAuth);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm p-4 flex items-center">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden mr-2"
        onClick={toggleSidebar}
      >
        <Menu className="h-6 w-6" />
      </Button>
      <h1 className="text-xl font-semibold dark:text-white">{title}</h1>
      <div className="ml-auto flex items-center space-x-2">
        <UserMenu userAuth={userAuth!} logout={logout} />
      </div>
    </header>
  );
};

export default TopMenu;
