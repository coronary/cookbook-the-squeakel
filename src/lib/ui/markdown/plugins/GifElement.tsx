"use client";

import * as React from "react";
import Image from "next/image";
import { debounce } from "@/lib/utils/Debounce";
import { MediaLoader } from "../../skeleton/MediaLoader";

const VALID_URL_REGEX =
  /(http(s)?:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

const imgurTransform = (src) => {
  const [mp4, gif] = [".mp4", ".gif"];
  if (!src.includes(mp4) && !src.includes(gif)) {
    src += mp4;
  }
  return src;
};

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

export const GifElement = ({ src }) => {
  const ref: any = React.useRef();
  const isVisible = useOnScreen(ref);
  const [loaded, setLoaded] = React.useState(false);
  const handleVideoLoaded = debounce(() => setLoaded(true));

  if (src.includes("imgur")) src = imgurTransform(src);

  if (!isValidUrl(src)) {
    console.log("🚀 ~ invalid url ~ src:", src);
    return (
      <div className={"relative aspect-video flex my-2 max-w-4xl"} ref={ref}>
        <MediaLoader />
      </div>
    );
  }

  return (
    <div className={"flex my-2 max-w-4xl"} ref={ref}>
      <div className={"flex w-full relative aspect-video"}>
        {src != null && (
          <>
            {!loaded && <MediaLoader />}

            {/(\.mp4)/g.test(src) ? (
              <video
                autoPlay
                loop
                muted
                disableRemotePlayback
                className={"rounded aspect-video bg-black"}
                onLoadedData={handleVideoLoaded}
              >
                {isVisible && <source src={src} type="video/mp4"></source>}
              </video>
            ) : (
              <>
                {isVisible && (
                  <Image
                    src={src.trim().replace(/(\r\n|\n|\r)/gm, "")}
                    alt="gif"
                    className="w-full rounded aspect-video bg-black"
                    width={0}
                    height={0}
                    onLoad={handleVideoLoaded}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
