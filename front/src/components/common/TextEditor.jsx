import Editor from "@draft-js-plugins/editor";
import createTextAlignmentPlugin from "@draft-js-plugins/text-alignment";
import createStaticToolbarPlugin from "@draft-js-plugins/static-toolbar";
import "@draft-js-plugins/text-alignment/lib/plugin.css";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";

import {
  ItalicButton,
  BoldButton,
  UnderlineButton,
} from "@draft-js-plugins/buttons";
import React from "react";

const textAlignmentPlugin = createTextAlignmentPlugin();
const staticToolbarPlugin = createStaticToolbarPlugin();

const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin, textAlignmentPlugin];

const TextEditor = ({ editorState, onChange, placeholder }) => (
  <div>
    <Editor editorState={editorState} onChange={onChange} plugins={plugins} />
  </div>
);

export default TextEditor;
