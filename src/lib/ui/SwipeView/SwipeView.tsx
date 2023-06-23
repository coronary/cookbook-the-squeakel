"use client";

import classNames from "classnames";
import * as React from "react";
import { useSwipeable } from "react-swipeable";

export const SwipeView = ({ children }) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const handlers = useSwipeable({
    onSwipedLeft: () => setIsOpen(false),
    onSwipedRight: () => setIsOpen(true),
    delta: 1,
  });
  return (
    <div {...handlers} className="flex flex-1">
      {children(isOpen)}
    </div>
  );
};
