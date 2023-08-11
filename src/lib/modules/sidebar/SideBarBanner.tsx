"use client";

import * as React from "react";
import Image from "next/image";
import { MediaLoader } from "@/lib/ui/skeleton/MediaLoader";
import { debounce } from "@/lib/utils/Debounce";

export const SibdeBarBanner = ({ bannerUrl, name }) => {
  const [loaded, setLoaded] = React.useState(false);
  const handleOnLoad = debounce(() => setLoaded(true));

  return (
    <div className="relative aspect-video">
      {!loaded && <MediaLoader />}
      <Image
        className="w-auto rounded"
        src={bannerUrl}
        alt={name}
        width={300}
        height={300}
        onLoad={handleOnLoad}
      />
    </div>
  );
};
