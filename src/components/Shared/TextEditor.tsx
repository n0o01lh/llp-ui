import React, { useMemo, useRef } from "react";
import JoditEditor from "jodit-react";

interface TextEditorProps {
  onChange: (value: string) => void;
  value?: string;
}

const TextEditor: React.FC<TextEditorProps> = (props) => {
  const { onChange, value } = props;
  const editor = useRef(null);
  const options = [
    "bold",
    "italic",
    "|",
    "ul",
    "ol",
    "|",
    "font",
    "fontsize",
    "|",
    "outdent",
    "indent",
    "align",
    "|",
    "hr",
    "|",
    "fullsize",
    "brush",
    "|",
    "image",
    "table",
    "link",
    "|",
    "undo",
    "redo",
  ];
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "",
      defaultActionOnPaste: "insert_as_html",
      defaultLineHeight: 1.5,
      enter: "div",
      // options that we defined in above step.
      buttons: options,
      buttonsMD: options,
      buttonsSM: options,
      buttonsXS: options,
      statusbar: false,
      sizeLG: 900,
      sizeMD: 700,
      sizeSM: 400,
      toolbarAdaptive: false,
    }),
    []
  );

  return (
    <div className="border-2 rounded-md">
      <JoditEditor
        ref={editor}
        value={value || ""}
        config={config}
        onChange={onChange}
      />
    </div>
  );
};

export default TextEditor;
