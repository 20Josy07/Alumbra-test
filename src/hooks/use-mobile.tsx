import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => {
      setMatches(mql.matches);
    };
    mql.addEventListener("change", onChange);
    setMatches(mql.matches); // Set initial value
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}
