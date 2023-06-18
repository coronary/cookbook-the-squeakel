"use client";

import React, { useCallback, useEffect } from "react";
import { EditorState } from "@codemirror/state";
import useCodeMirror from "./useCodemirror";

import { initialDoc } from "./initialDoc";

interface EditorProps {}

export const Editor = () => {
  const handleChange = useCallback((state: EditorState) => {}, []);
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: initialDoc,
    onChange: handleChange,
  });

  useEffect(() => {
    if (editorView) {
      // Do nothing for now
    } else {
      // loading editor
    }
  }, [editorView]);

  return <div className={"flex-1 bg-transparent"} ref={refContainer}></div>;
};
