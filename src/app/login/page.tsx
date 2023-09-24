"use client";
import * as React from "react";

export default function Login() {
  React.useEffect(() => {
    window.location.href = "https://api.dev-cookbook.com/login";
  }, []);
  return <div></div>;
}
