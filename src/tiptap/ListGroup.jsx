import {
  ListOrdered,
  List,
  AlignRight,
  AlignLeft,
  AlignJustify,
} from "lucide-react";
import { useState } from "react";

function ListGroup({ editor }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!editor) return null;


  // Toggle dropdown  
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Handle alignment change
  const handleAlign = (alignment) => {
    editor.chain().focus().setTextAlign(alignment).run();
    setIsOpen(false); // Close the dropdown after selection
  };

  const getCurrentAlignmentIcon = () => {
    if (editor.isActive({ textAlign: "left" })) {
      return <AlignLeft />;
    } else if (editor.isActive({ textAlign: "center" })) {
      return <AlignJustify />;
    } else if (editor.isActive({ textAlign: "right" })) {
      return <AlignRight />;
    } else {
      return <AlignLeft />; // Default icon if no alignment is applied
    }
  };

  return (
    <div className=" flex justify-between items-center gap-1 px-2 border-r-2 border-gray-400 bg-white text-md font-medium text-gray-700  ">
      <div className="flex items-center justify-between gap-1">
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={` shadow-sm hover:bg-gray-200 p-1 rounded-md ${
            editor.isActive("bulletList") ? "is-active bg-gray-400" : ""
          }`}
        >
          <List />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={` shadow-sm hover:bg-gray-200 p-1 rounded-md ${
            editor.isActive("orderedList") ? "is-active bg-gray-400" : ""
          }`}
        >
          <ListOrdered />
        </button>
      </div>

      <div className="relative">
        <button
          onClick={toggleDropdown}
          className={`shadow-sm hover:bg-gray-200 p-1 rounded-md relative`}
        >
           {/* Display current alignment icon */}
          {getCurrentAlignmentIcon()}
          
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 24 24"
            fill="black"  
            className="lucide lucide-triangle-right absolute right-0 bottom-0 "
          >
            <path d="M22 18a2 2 0 0 1-2 2H3c-1.1 0-1.3-.6-.4-1.3L20.4 4.3c.9-.7 1.6-.4 1.6.7Z" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute left-3 z-10 mt-2  origin-top-right flex justify-between gap-2 rounded-md bg-white border-2 border-zinc-400 ">
            <button
              onClick={() => handleAlign("left")}
              className={`w-full p-2 text-sm  ${
                editor.isActive({ textAlign: "left" }) ? "bg-gray-400" : ""
              }`}
            >
              <AlignLeft />
            </button>
            <button
              onClick={() => handleAlign("center")}
              className={`w-full p-2 text-sm   ${
                editor.isActive({ textAlign: "center" }) ? "bg-gray-400" : ""
              }`}
            >
              <AlignJustify />
            </button>
            <button
              onClick={() => handleAlign("right")}
              className={`w-full p-2 text-sm ${
                editor.isActive({ textAlign: "right" }) ? "bg-gray-400" : ""
              }`}
            >
              <AlignRight />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListGroup;
