import { useEffect, useState } from "react";

const useWindowWidth = (breakpoint: number) => {
  const [isBreakpoint, setIsBreakpoint] = useState<boolean>(
    window.innerWidth > breakpoint
  );
  useEffect(() => {
    const handleResize = () => {
      setIsBreakpoint(window.innerWidth > breakpoint);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return isBreakpoint;
};

export default useWindowWidth;
