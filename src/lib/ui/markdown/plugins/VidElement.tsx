"use client";

import * as React from "react";
import { debounce } from "@/lib/utils/Debounce";
import { MediaLoader } from "../../skeleton/MediaLoader";

const VALID_URL_REGEX =
  /(http(s)?:\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;

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

function formatUrl(url) {
  let urlEnd = url.split("/").pop();
  urlEnd = urlEnd.includes("?") ? urlEnd.split("?")[0] : urlEnd;

  if (url.includes("twitch")) {
    if (url.includes("clips.") || url.includes("/clip/")) {
      return `https://clips.twitch.tv/embed?clip=${urlEnd}&parent=${ENV.twitch_parent}`;
    } else if (url.includes("/videos/")) {
      return `https://player.twitch.tv/?video=${urlEnd}&parent=${ENV.twitch_parent}&autoplay=false`;
    }
  }

  if (url.includes("youtube")) {
    const ytbReg = /watch\?v=(\w*)/;
    return `https://www.youtube.com/embed/${url.match(ytbReg)[1]}`;
  }

  if (url.includes("youtu.be")) {
    return `https://www.youtube.com/embed/${urlEnd}`;
  }

  return url;
}

export const VidElement = ({ src }) => {
  const ref: any = React.useRef();
  const isVisible = useOnScreen(ref);
  const [loaded, setLoaded] = React.useState(false);
  const handleVideoLoaded = debounce(() => setLoaded(true), 200);
  const url = formatUrl(src);

  if (!isValidUrl(url)) {
    return (
      <div className={"relative aspect-video flex my-2 max-w-4xl"} ref={ref}>
        <MediaLoader />
      </div>
    );
  }

  return (
    <div className={"flex my-2 max-w-3xl"} ref={ref}>
      <div className={"flex w-full relative aspect-video"}>
        {src != null && (
          <>
            {!loaded && <MediaLoader />}
            {isVisible && (
              <iframe
                className="rounded aspect-video bg-black"
                frameBorder="0"
                allowFullScreen={true}
                scrolling="no"
                src={url}
                onLoad={handleVideoLoaded}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};
