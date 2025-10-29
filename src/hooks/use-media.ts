import React from 'react';

const useMedia = (media: string): boolean => {
  const [match, setMatch] = React.useState<boolean>(false);

  React.useEffect(() => {
    const mql = window.matchMedia(media);

    function changeMatch(event?: MediaQueryListEvent) {
      const matches = event ? event.matches : mql.matches;
      setMatch(matches);
    }

    // set initial value
    changeMatch();

    // Prefer the media query's change event for accuracy and performance.
    if (mql.addEventListener) {
      mql.addEventListener('change', changeMatch);
    } else {
      // Older browsers use addListener/removeListener - use a safe any-cast
      (mql as any).addListener(changeMatch);
    }

    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener('change', changeMatch);
      } else {
        (mql as any).removeListener(changeMatch);
      }
    };
  }, [media]);

  return match;
}

export default useMedia;