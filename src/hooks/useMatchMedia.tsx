import { useState, useEffect } from "react";

export function useMatchMedia(query: string) {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);
  useEffect(() => {
    const matchQueryList = window.matchMedia(query);
    function handleChange(event: MediaQueryListEvent) {
      setMatches(event.matches);
    }
    matchQueryList.addEventListener("change", handleChange);
    return () => {
      matchQueryList.removeEventListener("change", handleChange);
    };
  }, [query]);
  return matches;
}
