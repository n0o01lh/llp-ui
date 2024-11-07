import React from "react";
import { Label } from "../ui/label";
import { Lock, Mail, User } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ValidationFields from "../ValidationFields";

interface RegisterFormProps {
  handleSubmit: (event: React.FormEvent, action: "login" | "register") => void;
  setEmail: (email: string) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
  isError: boolean;
}

const RegisterForm: React.FC<RegisterFormProps> = (props) => {
  const { handleSubmit, setEmail, setUsername, setPassword, isError } = props;

  return (
    <form onSubmit={(e) => handleSubmit(e, "register")}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="register-username">Username</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="register-username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="register-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="register-email"
              placeholder="m@example.com"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="register-password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="register-password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        <Button type="submit" className="w-full">
          Register
        </Button>
      </div>
      {isError && (
        <ValidationFields
          title="Error"
          missingFields={["can't register with this email address"]}
        />
      )}
    </form>
  );
};

export default RegisterForm;
