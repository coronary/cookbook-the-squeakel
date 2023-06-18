export const gfyTransform = (url: string) => {
  const urlObject = { thumbnail: url, giant: url, gif: url };
  const [thumb, size, mobile, mp4, giant] = [
    "thumbs.",
    "-size_restricted.gif",
    "-mobile.mp4",
    ".mp4",
    "giant.",
  ];

  if (url.includes(thumb)) {
    urlObject.giant = url.replace(thumb, giant);
  }

  if (url.includes(size)) {
    urlObject.thumbnail = urlObject.thumbnail.replace(size, mobile);
    urlObject.giant = urlObject.giant.replace(size, mp4);
  }

  if (url.includes(mp4) && !url.includes(mobile)) {
    urlObject.thumbnail = urlObject.thumbnail.replace(mp4, mobile);
    urlObject.gif = urlObject.gif.replace(mp4, size);
  } else if (url.includes(mobile)) {
    urlObject.giant = urlObject.giant.replace(mobile, mp4);
    urlObject.gif = urlObject.gif.replace(mobile, size);
  }

  if (url.includes(giant)) {
    urlObject.thumbnail = url.replace(giant, thumb);
    urlObject.gif = urlObject.gif.replace(giant, thumb);
  }

  return urlObject;
};
