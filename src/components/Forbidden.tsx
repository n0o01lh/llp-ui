import React from "react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";

const Forbidden = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative h-1/4 w-full">
        <img
          style={{ height: "600px" }}
          src="/src/assets/forbidden.png"
          alt="Person lost in a maze of code"
          className="w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-[url('data:image/svg+xml;charset=utf-8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 1440 320%22><path fill=%22%23ffffff%22 fill-opacity=%221%22 d=%22M0,32L48,53.3C96,75,192,117,288,144C384,171,480,181,576,165.3C672,149,768,107,864,85.3C960,64,1056,64,1152,80C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z%22></path></svg>')] bg-repeat-x bg-bottom" />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-4xl font-bold mb-2">Forbidden</h1>
        <p className="text-xl mb-4">
          Oops! Looks like you've wandered into the digital wilderness.
        </p>
        <p className="mb-8">You don't be here, hurry up and:</p>
        <Button onClick={() => navigate("/")}>Return to Homepage</Button>
      </div>
    </div>
  );
};

export default Forbidden;
