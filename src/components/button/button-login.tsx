"use client";
import { signIn } from "@/lib/auth-client";
import { FileVideo } from "lucide-react";
import React from "react";

export default function ButtonLogin() {
  const handleSignInWithGoogle = () => {
    signIn();
  };
  const handleSignOutWithGoogle = () => {
    signIn();
  };
  return (
    <div>
      <div className="p-5 bg-green-200" onClick={handleSignInWithGoogle}>
        Sign In
      </div>
      <div className="p-5 bg-red-200" onClick={handleSignOutWithGoogle}>
        Sign Out
      </div>
    </div>
  );
}
