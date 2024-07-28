import { useState, useEffect } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(
        window.innerWidth <= parseInt(fullConfig.theme.screens.sm, 10)
      );
    };

    // Check screen size on mount and whenever the window is resized
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    // Clean up event listener on unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return isMobile;
};
