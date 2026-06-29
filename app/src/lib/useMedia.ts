import { useEffect, useState } from "react";

export function useMedia(query: string) {
  const [match, setMatch] = useState(() => typeof window !== "undefined" && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const fn = () => setMatch(mq.matches);
    mq.addEventListener("change", fn);
    setMatch(mq.matches);
    return () => mq.removeEventListener("change", fn);
  }, [query]);
  return match;
}
