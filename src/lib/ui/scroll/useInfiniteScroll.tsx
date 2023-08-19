"use client";

import * as React from "react";

export default function useInfiniteScroll(setPage) {
  const loadMoreRef = React.useRef(null);

  const handleObserver = React.useCallback((entries) => {
    const [target] = entries;
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  React.useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, { threshold: 1 });

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [loadMoreRef]);

  return { loadMoreRef };
}
