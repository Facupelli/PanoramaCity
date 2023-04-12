import { useEffect, useRef, useState } from "react";

export const useSectionHeight = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [sectionHeight, setSectionHeight] = useState<number | null>(null);

  useEffect(() => {
    if (sectionRef.current) {
      setSectionHeight(sectionRef.current.getBoundingClientRect().height);
    }
  }, []);

  return { sectionRef, sectionHeight };
};
