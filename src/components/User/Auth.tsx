import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Facebook, Instagram } from "lucide-react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { useLogin, useRegister } from "@/hooks/useAuthApi";
import { useNavigate } from "react-router";
import { UserStoreState, useUserStore } from "@/store/userStore";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const {
    mutate: registerMutate,
    isSuccess: registerSuccess,
    isError: registerError,
  } = useRegister();
  const {
    mutate: loginMutate,
    data: loginData,
    isSuccess: loginSuccess,
    isError: loginError,
  } = useLogin();
  const navigate = useNavigate();
  const setUserAuth = useUserStore(
    (state: UserStoreState) => state.setUserAuth
  );

  const handleSubmit = (
    event: React.FormEvent,
    action: "login" | "register"
  ) => {
    event.preventDefault();
    if (action === "register") {
      registerMutate({ username, email, password });
    }
    if (action === "login") {
      loginMutate({ email, password });
    }
    console.log(`${action} submitted with:`, { email, password });
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  if (registerSuccess) {
    navigate(`/auth/register/${email}`);
  }

  if (loginSuccess) {
    setUserAuth(loginData);
    navigate(`/resources`);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to your account or create a new one
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm
                handleSubmit={handleSubmit}
                setEmail={setEmail}
                setPassword={setPassword}
                isError={loginError}
              />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm
                handleSubmit={handleSubmit}
                setUsername={setUsername}
                setEmail={setEmail}
                setPassword={setPassword}
                isError={registerError}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-gray-800 px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin("Google")}
            >
              <svg
                className="mr-2 h-4 w-4"
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="google"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 488 512"
              >
                <path
                  fill="currentColor"
                  d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                ></path>
              </svg>
              Google
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin("Facebook")}
            >
              <Facebook className="mr-2 h-4 w-4" />
              Facebook
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => handleSocialLogin("Instagram")}
            >
              <Instagram className="mr-2 h-4 w-4" />
              Instagram
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
