"use client";

import * as React from "react";
import { gfyTransform } from "@/lib/utils/GfycatUtils";
import Image from "next/image";

function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return isIntersecting;
}

export const GifElement = ({ value, src }) => {
  const ref: any = React.useRef();
  const isVisible = useOnScreen(ref);

  let gifElement;

  if (value.includes("gfycat")) {
    const { thumbnail } = gfyTransform(src);

    gifElement = (
      <video autoPlay loop muted disableRemotePlayback className={"rounded"}>
        {isVisible && <source src={thumbnail} type="video/mp4"></source>}
      </video>
    );
  } else {
    gifElement = (
      <Image src={src} alt="gif" className="rounded" width={0} height={0} />
    );
  }

  return (
    <div className={"flex my-2 max-w-4xl"} ref={ref}>
      {gifElement}
    </div>
  );
};
