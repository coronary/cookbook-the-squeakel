import * as React from "react";

export default function Divider() {
  return (
    <div className="relative py-2">
      <div
        className="absolute inset-0 flex items-center justify-center"
        aria-hidden="true"
      >
        <div className="w-11/12 border-t border-slate-700"></div>
      </div>
    </div>
  );
}
