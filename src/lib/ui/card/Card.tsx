import classNames from "classnames";
import * as React from "react";

export interface CardProps {
  children: any;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={classNames(
        "relative flex rounded-lg border border-slate-600 bg-slate-800 px-6 py-5 shadow-sm hover:border-slate-400",
        className,
      )}
    >
      {children}
    </div>
  );
}
