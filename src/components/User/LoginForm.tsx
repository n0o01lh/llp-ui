import React from "react";
import { Label } from "../ui/label";
import { Lock, Mail } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ValidationFields from "../ValidationFields";

interface LoginFormProps {
  handleSubmit: (event: React.FormEvent, action: "login" | "register") => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  isError: boolean;
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { handleSubmit, setEmail, setPassword, isError } = props;

  return (
    <form onSubmit={(e) => handleSubmit(e, "login")}>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              placeholder="m@example.com"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10"
              required
            />
          </div>
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      {isError && (
        <ValidationFields
          title="Error"
          missingFields={["user or password incorrect"]}
        />
      )}
    </form>
  );
};

export default LoginForm;
