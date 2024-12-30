import { Undo, Redo } from "lucide-react";
function UndoRedo({ editor }) {
  return (
    <div className="h-full">
        <div className=" text-black   w-full gap-2  px-2 py-2 text-sm     bg-white  flex items-center justify-center  ">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            className=" shadow-sm hover:bg-gray-200 p-1 rounded-md "
          >
            <Undo />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            className=" shadow-sm hover:bg-gray-200 p-1 rounded-md "
            disabled={!editor.can().redo()}
          >
            <Redo />
          </button>
      </div>
    </div>
  );
}

export default UndoRedo;
