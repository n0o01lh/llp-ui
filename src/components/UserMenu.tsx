import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BookAudio, ChevronDown, LogOut, User } from "lucide-react";
import { UserAuth } from "./User/Auth.interfaces";
import { jwtDecode } from "jwt-decode";
import { ROLES } from "./Shared/Constants";
import { useNavigate } from "react-router";

interface UserMenuProps {
  userAuth: UserAuth;
  logout: () => void;
}

const UserMenu: React.FC<UserMenuProps> = (props) => {
  const { userAuth, logout } = props;
  const decodedToken = jwtDecode(userAuth?.token as string) as { role: number };
  const navigate = useNavigate();

  return (
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
        {ROLES.TEACHER == decodedToken.role && (
          <DropdownMenuItem>
            <BookAudio className="mr-2 h-4 w-4" />
            <a onClick={() => navigate("/dashboard/sales")}>
              Your Resources and Courses
            </a>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <a
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
            Logout
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
