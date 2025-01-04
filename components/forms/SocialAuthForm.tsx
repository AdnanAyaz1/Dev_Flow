"use client";
import Image from "next/image";
import React from "react";

import { Button } from "../ui/button";
import { toast } from "@/hooks/use-toast";
import { signIn } from "next-auth/react";
import { Routes } from "@/constants/routes";

const SocialAuthForm = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [clickedButton, setClickedButton] = React.useState<string | null>(null);
  const buttonClass =
    "background-dark400_light900 body-medium text-dark200_light800 min-h-12 flex-1 rounded-2 px-4 py-3.5";

  const handleSignIn = async (provider: "github" | "google") => {
    try {
      setIsLoading(true);
      setClickedButton(provider);
      await signIn(provider, {
        callbackUrl: Routes.Home,
        redirect: false,
      });
    } catch (error) {
      toast({
        title: "Sign-In Failed",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred while signing in",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-10 flex flex-wrap gap-2.5">
      <Button
        className={buttonClass}
        onClick={() => handleSignIn("github")}
        disabled={isLoading && clickedButton === "github"}
      >
        <Image
          src="/icons/github.svg"
          alt="Github Logo"
          width={20}
          height={20}
          className="invert-colors mr-2.5 object-contain"
        />
        <span>
          {isLoading && clickedButton == "github"
            ? "Redirecting...."
            : "Log in with GitHub"}
        </span>
      </Button>

      <Button
        className={buttonClass}
        onClick={() => handleSignIn("google")}
        disabled={isLoading && clickedButton === "google"}
      >
        <Image
          src="/icons/google.svg"
          alt="Google Logo"
          width={20}
          height={20}
          className="mr-2.5 object-contain"
        />
        <span>
          {isLoading && clickedButton == "google"
            ? "Redirecting...."
            : "Log in with Google"}
        </span>
      </Button>
    </div>
  );
};

export default SocialAuthForm;
