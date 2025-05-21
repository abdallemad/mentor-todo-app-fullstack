import React from "react";
import { SignedIn, SignedOut, SignOutButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function MainPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center flex-col gap-2">
        <h1 className="text-2xl font-bold">Todo App</h1>
        <p className="text-gray-500">Manage your tasks and stay productive</p>
        <SignedIn>
          <div className="flex items-center flex-col gap-4 min-w-42 w-full">
            <Button className="mt-2 w-full" asChild>
              <Link href="/todos">Go to todos</Link>
            </Button>
            <Button variant="outline" className="w-full" asChild>
              <SignOutButton>Sign Out</SignOutButton>
            </Button>
          </div>
        </SignedIn>
        <SignedOut>
          <Button className="mt-2 w-full" asChild>
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </SignedOut>
      </div>
    </div>
  );
}

export default MainPage;
