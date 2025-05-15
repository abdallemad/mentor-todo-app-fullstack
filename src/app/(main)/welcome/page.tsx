"use client";
import { useSyncUser } from "@/react-query/hooks/use-sync-user";
import { Loader2 } from "lucide-react";
function WelcomePage() {
  const { isError } = useSyncUser();
  if (isError)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        Something went wrong
      </div>
    );
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Welcome to your todo app</h1>
      <p className="text-gray-500">Wait for a moment...</p>
      <Loader2 className="animate-spin" />
    </div>
  );
}

export default WelcomePage;
