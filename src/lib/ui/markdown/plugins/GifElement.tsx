"use client";

import * as React from "react";
import { gfyTransform } from "@/lib/utils/GfycatUtils";
import Image from "next/image";
import HttpService from "@/lib/utils/HttpService";
import { Routes } from "@/lib/constants/ApiRoutes";

const VALID_URL_REGEX =
  /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

function isValidUrl(url: string | null) {
  if (url == null) return false;

  return VALID_URL_REGEX.test(url);
}

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
  const [url, setUrl] = React.useState(null);

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
      setUrl(newUrl);
    };
    init();
  }, [src, value]);

  if (!isValidUrl(url))
    return <div className={"flex my-2 max-w-4xl"} ref={ref}></div>;

  return (
    <div className={"flex my-2 max-w-4xl"} ref={ref}>
      {url != null && (
        <>
          {/(\.mp4)/g.test(value) ? (
            <video
              autoPlay
              loop
              muted
              disableRemotePlayback
              className={"rounded"}
            >
              {isVisible && <source src={url} type="video/mp4"></source>}
            </video>
          ) : (
            <Image
              src={url}
              alt="gif"
              className="rounded"
              width={0}
              height={0}
            />
          )}
        </>
      )}
    </div>
  );
};
