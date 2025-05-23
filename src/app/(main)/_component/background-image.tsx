"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

export default function BackgroundImage() {
    const { theme } = useTheme();
    const isMobile = useMediaQuery({
      query: "(max-width: 768px)",
    });
    return (
      <Image
        src={getImageSrc(theme || "dark", isMobile)}
        alt="Background"
        width={1000}
        height={600}
        className="absolute inset-x-0 w-full top-0 -z-10"
      />
    );
  }
  function getImageSrc(theme: string, isMobile: boolean) {
    if ((theme == "dark" || theme == "system") && isMobile) {
      return "/images/bg-mobile-dark.jpg";
    }
    if (theme == "light" && isMobile) {
      return "/images/bg-mobile-light.jpg";
    }
    if ((theme == "dark" || theme == "system") && !isMobile) {
      return "/images/bg-desktop-dark.jpg";
    }
    if (theme == "light" && !isMobile) {
      return "/images/bg-desktop-light.jpg";
    }
    return "/images/bg-desktop-dark.jpg";
  }