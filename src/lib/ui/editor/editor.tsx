import React, { useCallback, useEffect } from "react";
import { EditorState } from "@codemirror/state";
import useCodeMirror from "./useCodemirror";

import { initialDoc } from "./initialDoc";

interface EditorProps {
  body: string;
  onChange: (text: string) => void;
}

export const Editor = ({ body, onChange }: EditorProps) => {
  const handleChange = useCallback((state: EditorState) => {
    onChange(state.sliceDoc(state.doc[0], state.doc[state.doc.length - 1]));
  }, []);
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialDoc: body ?? initialDoc,
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
