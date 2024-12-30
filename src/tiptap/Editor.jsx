import { useEditor, EditorContent, BubbleMenu } from "@tiptap/react";
import { Bold } from "@tiptap/extension-bold";
import { Heading } from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import HeadingDropdown from "./HeadingDropdown";
import { Document } from "@tiptap/extension-document";
import { Text } from "@tiptap/extension-text";
import TextColor from "./TextColor";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Underline  from "@tiptap/extension-underline";
import { CodeBlock } from "@tiptap/extension-code-block";
import Italic from "@tiptap/extension-italic";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Strike from "@tiptap/extension-strike";
import TextFormattingToolbar from "./TextFormattingToolbar";
import ListGroup from "./ListGroup";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import LinkBtn from "./LinkBtn";
import UndoRedo from "./UndoRedo";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Placeholder from '@tiptap/extension-placeholder' 

import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon, 
  Highlighter ,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setEditor } from "../store/EditorSlice";
import { CustomDiv } from "./CustomDiv";

function Editor() {

  //all the tiptap extensions to be used
  const extensions = [
    CustomDiv,
    StarterKit,
    Document,
    Bold,
    Paragraph,
    Text,
    TextStyle,
    TextAlign.configure({
      types: ["heading", "paragraph"],
    }),
    Color,
    Highlight.configure({ multicolor: true }),
    Heading.configure({
      levels: [1, 2, 3],
    }),
    Placeholder.configure({
      placeholder: 'Write something …',
    }),
    CodeBlock,
    Bold,
    Italic,
    Strike,
    Underline,
    HorizontalRule,
    Link.configure({
      openOnClick: false,
      autolink: true,
      defaultProtocol: "https",
      protocols: ["http", "https"],
      
    }),
  ];

  //create editor
  const editor = useEditor({
    extensions,
    content: "",
    autofocus: false, 
  });

  //get the question data from redux store
  const data = useSelector((state) => state.data.data);
  const dispatch = useDispatch();

  //presenting the content according to the question data in store
  useEffect(() => {
    if (editor && data) {
      const content = data
        .map((item, index) => {
          return `
          <div data-type="custom-div" class="customDiv" >
            <h2><strong>Question ${index + 1}:</strong></h2>
            <p>${item.question}</p>
          </div>
          <div data-type="custom-div" class="classDiv">
            <h2><strong>Code:</strong></h2>
            <pre><code>${item.code}</code></pre>
          </div>
          <div data-type="custom-div" class="classDiv">
            <h2><strong>Output:</strong></h2>
            <pre><code>${item.output}</code></pre>
          </div>
          <p></p>
          
        `;
        })
        .join("<hr>"); // Join the array into a single string of HTML content seperated by hr.

      editor.commands.setContent(content);
    }

    if (editor) dispatch(setEditor(editor)); //dispatch the ediotr 
  }, [editor, data]);


  if (!editor) {
    return null;
  }

  return (
    <div>

      {/* bubble menu  */}
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }} >
          <div className="  bg-white p-1 border-2 border-zinc-300 shadow-lg shadow-black flex gap-2 rounded-md">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`shadow-sm hover:bg-gray-200 p-1 rounded-md ${
                editor.isActive("bold") ? "is-active  bg-gray-400" : ""
              }`}
            >
              <BoldIcon/>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`shadow-sm hover:bg-gray-200 p-1 rounded-md ${
                editor.isActive("italic") ? "is-active  bg-gray-400" : ""
              }`}
            >
              <ItalicIcon/>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={`shadow-sm hover:bg-gray-200 p-1 rounded-md ${
                editor.isActive("highlight") ? "is-active  bg-gray-400" : ""
              }`}
            >
              <Highlighter/>
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`shadow-sm hover:bg-gray-200 p-1 rounded-md ${
                editor.isActive("underline") ? "is-active  bg-gray-400" : ""
              }`}
            >
              <UnderlineIcon/>
            </button>
          </div>
        </BubbleMenu>
      )}

      {/* toolbar of editor */}
      <div className="   shadow-md shadow-zinc-700 flex  justify-between items-center rounded-md p-1 gap-1 ">
        <HeadingDropdown editor={editor} />
        <TextColor editor={editor} />
        <TextFormattingToolbar editor={editor} />
        <ListGroup editor={editor} />
        <LinkBtn editor={editor} />
        <UndoRedo editor={editor} />
      </div>

      {/* textarea of editor */}
      {editor && (
        <EditorContent
          ref={editor.editorRef}
          className=" rounded-md my-2 px-2 border-2 border-gray-300  bg-gray-100    "
          editor={editor}
        />
      )}
    </div>
  );
}

export default Editor;
