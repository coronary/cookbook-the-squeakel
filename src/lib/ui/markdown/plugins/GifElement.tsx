"use client";

import * as React from "react";
import { gfyTransform } from "@/lib/utils/GfycatUtils";
import Image from "next/image";
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
  const [videoSrc, setVideoSrc] = React.useState(
    <source src={src} type="video/mp4"></source>
  );

  React.useEffect(() => {
    const init = async () => {
      let newUrl = src;
      if (
        src &&
        src.includes("gfy") &&
        !src.includes(".mp4") &&
        !src.includes(".gif")
      ) {
        try {
          newUrl = await HttpService.post(Routes.GFYCAT, {
            url: src,
          });
        } catch (err) {
          console.log("🚀 ~ file: GifElement.tsx:50 ~ init ~ err:", err);
        }
      }

      if (value.includes("gfycat") && newUrl != null) {
        const { thumbnail } = gfyTransform(newUrl);
        newUrl = thumbnail;
      }
      setVideoSrc(<source src={newUrl} type="video/mp4"></source>);
    };
    init();
  }, [src, value]);

  return (
    <div className={"flex my-2 max-w-4xl"} ref={ref}>
      {value.includes("gfycat") ? (
        <video autoPlay loop muted disableRemotePlayback className={"rounded"}>
          {isVisible && videoSrc}
        </video>
      ) : (
        <Image src={src} alt="gif" className="rounded" width={0} height={0} />
      )}
    </div>
  );
};
