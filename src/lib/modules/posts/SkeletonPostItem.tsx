import * as React from "react";

export default function SkeletonPostItem() {
  return (
    <div className="animate-pulse flex flex-1 gap-x-4 w-full">
      <div className="bg-gray-300 rounded-full dark:bg-gray-800 w-10 h-10" />
      <div className="w-full">
        <div className="bg-gray-300 rounded dark:bg-gray-800 h-4 w-48"></div>
        <div className="my-4 bg-gray-300 rounded dark:bg-gray-800 h-4 w-64"></div>
        <div className="my-4 bg-gray-300 rounded dark:bg-gray-800 h-4 w-80"></div>
        <div className="bg-gray-300 rounded dark:bg-gray-800 aspect-video max-w-3xl"></div>
      </div>
    </div>
  );
}
