import  { useCallback } from "react";
import { Link } from "lucide-react";
function LinkBtn({ editor }) {

  const setLink = useCallback(() => {

    const previousUrl = editor.getAttributes("link").href; // for 
    const url = window.prompt("enter URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e) {
      alert(e.message);
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  const toggleLink = () => {
    if (editor.isActive("link")) editor.chain().focus().unsetLink().run(); //unset the link
    else setLink(); //set link
  };

  return (
    <div className="border-r-2 border-gray-400  p-1 ">
      <button
        onClick={() => toggleLink()}
        className={` text-black  h-full w-full   text-sm  px-2 py-2   bg-white  flex items-center justify-center shadow-sm hover:bg-gray-200 rounded-md   ${
          editor.isActive("link") ? "is-active bg-gray-400" : ""
        }`}
      >
        <Link size={20}/>
      </button>
    </div>
  );
}

export default LinkBtn;
