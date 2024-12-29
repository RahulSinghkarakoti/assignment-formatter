import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Highlighter,
} from "lucide-react";
function TextFormattingToolbar({ editor }) {
  return (
    <div className="flex justify-around items-center gap-1 rounded-md    ">
      <div className=" flex justify-between items-center gap-3 px-2 py-1 border-r-2 border-gray-400 bg-white   text-gray-700  ">
        <div
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`shadow-sm hover:bg-gray-200 p-1 rounded-md ${
            editor.isActive("bold") ? "is-active  bg-gray-400" : ""
          }`}
        >
          <Bold />
        </div>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`shadow-sm hover:bg-gray-200 p-1 rounded-md ${
            editor.isActive("italic") ? "is-active  bg-gray-400" : ""
          }`}
        >
          <Italic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={`shadow-sm hover:bg-gray-200 p-1 rounded-md ${
            editor.isActive("strike") ? "is-active  bg-gray-400" : ""
          }`}
        >
          <Strikethrough />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`shadow-sm hover:bg-gray-200 p-1 rounded-md ${
            editor.isActive("underline") ? "is-active  bg-gray-400" : ""
          }`}
        >
          <Underline />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          className={`shadow-sm hover:bg-gray-200 p-1 rounded-md ${
            editor.isActive("highlight") ? "is-active  bg-gray-400" : ""
          }`}
        >
          <Highlighter />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`shadow-sm hover:bg-gray-200 p-1 rounded-md ${
            editor.isActive("codeBlock") ? "is-active  bg-gray-400" : ""
          }`}
        >
          <Code />
        </button>
      </div>
    </div>
  );
}

export default TextFormattingToolbar;
