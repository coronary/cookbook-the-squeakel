import classNames from "classnames";
import * as React from "react";

export default function Divider(
  { className, innerClassName }: {
    className?: string;
    innerClassName?: string;
  },
) {
  return (
    <div className={classNames("relative py-2", className)}>
      <div
        className={classNames(
          "absolute inset-0 flex items-center justify-center",
          innerClassName,
        )}
        aria-hidden="true"
      >
        <div className="w-11/12 border-t border-slate-700"></div>
      </div>
    </div>
  );
}
