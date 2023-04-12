import { useEffect, useState } from "react";

export const useNavColor = ({
  sectionHeight,
}: {
  sectionHeight: number | null;
}) => {
  const [navBg, setNavBg] = useState("transparent");

  useEffect(() => {
    if (window) {
      window.addEventListener("scroll", () => {
        if (sectionHeight) {
          if (window.scrollY > sectionHeight && navBg === "transparent") {
            setNavBg("dark");
          }
          if (window.scrollY < sectionHeight && navBg === "dark") {
            setNavBg("transparent");
          }
        }
      });
    }
  }, [navBg, sectionHeight]);

  return { navBg };
};
