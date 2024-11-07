import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CheckCircle, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate, useParams } from "react-router";

const RegisterSuccess = () => {
  const params = useParams();
  const email = params["email"];
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Registration Successful!
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600 dark:text-gray-300">
            Thank you for registering. We've sent a verification email to:
          </p>
          <p className="font-semibold text-lg break-all">{email}</p>
          <div className="flex items-center justify-center space-x-2 text-gray-600 dark:text-gray-300">
            <Mail className="h-5 w-5" />
            <p>
              Please check your inbox and verify your email to access your
              account.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full" onClick={() => navigate(`/auth`)}>
            Back to Login
          </Button>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Didn't receive the email? Check your spam folder or click below to
            resend.
          </p>
          <Button
            variant="link"
            className="text-sm"
            onClick={() => console.log("Resend verification email")}
          >
            Resend Verification Email
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterSuccess;
