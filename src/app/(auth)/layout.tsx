import React from "react";

function MainLayout({ children }: { children: React.ReactNode }) {

  return <main className="min-h-screen flex items-center justify-center w-screen">{children}</main>;
}

export default MainLayout;
