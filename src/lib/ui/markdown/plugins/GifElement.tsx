"use client";

import * as React from "react";
import { gfyTransform } from "@/lib/utils/GfycatUtils";
import Image from "next/image";
import axios from "axios";
import HttpService from "@/lib/utils/HttpService";
import { Routes } from "@/lib/constants/ApiRoutes";

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
  const [url, setUrl] = React.useState(src);

  let gifElement;

  React.useEffect(() => {
    const init = async () => {
      if (
        src &&
        src.includes("gfy") &&
        !src.includes(".mp4") &&
        !src.includes(".gif")
      ) {
        try {
          const res = await HttpService.post(Routes.GFYCAT, {
            url: src,
          });
          console.log("🚀 ~ file: GifElement.tsx:46 ~ init ~ res:", res);

          setUrl(res.data);
        } catch (err) {
          console.log("🚀 ~ file: GifElement.tsx:50 ~ init ~ err:", err);
        }
      }
    };
    init();
  }, [src]);

  if (value.includes("gfycat")) {
    const { thumbnail } = gfyTransform(url);

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
    <p className={"flex my-2 max-w-4xl"} ref={ref}>
      {gifElement}
    </p>
  );
};
