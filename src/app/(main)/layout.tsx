
import Header from "@/components/header";
import React from "react";
import BackgroundImage from "./_component/background-image";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="w-screen relative">
      <BackgroundImage />
      <div className="z-10 container pt-24">
        <Header />
        {children}
      </div>
    </main>
  );
}


export default MainLayout;
