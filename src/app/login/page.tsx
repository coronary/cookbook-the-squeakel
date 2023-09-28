"use client";
import * as React from "react";

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

export default function Login() {
  React.useEffect(() => {
    window.location.href = `${API_URL}/login`;
  }, []);
  return <div></div>;
}
