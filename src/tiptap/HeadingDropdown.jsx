import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const HeadingDropdown = ({ editor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Heading");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  //run editor as of for heading..... and close dropdown 
  const handleSelect = (e, heading) => {
    if (!editor) return;
    e.preventDefault();

    setIsOpen(false);

    if (heading === "0") {
      editor.commands.setParagraph();
      setSelectedOption(e.target.name);
    } else {
      editor
        .chain()
        .focus()
        .setHeading({ level: parseInt(heading) })
        .run();  
      setSelectedOption(e.target.name);
    }
  };

  //get the selected heading value for the cursor position
  const getSelectedOption = () => {
    if (!editor) return;

    const { $from } = editor.state.selection; // Current cursor position
    const tagName = $from.parent.type.name;  
 

    //  update selectedOption based on the tag name
    if (tagName === "heading") {
      const headingLevel = editor.getAttributes("heading").level;
       
      switch (headingLevel) {
        case 1:
          setSelectedOption("Title");
          break;
        case 2:
          setSelectedOption("Heading");
          break;
        case 3:
          setSelectedOption("SubTitle");
          break;
      }
    } else if (tagName === "paragraph") {
      setSelectedOption("Paragraph");
    }
  };

  useEffect(() => {
    if (editor) {
      editor.on("selectionUpdate", () => {
        getSelectedOption(); // Log the tag name whenever the selection changes
      });
    }
  }, [editor]);

  return (
    <div className="relative  w-32   ">
      <div>
        <button
          type="button"
          className="flex justify-around items-center gap-3 w-full px-2 py-2  border-r-2 border-gray-400 bg-white text-md font-medium text-gray-700  "
          onClick={toggleDropdown}
        >
          {" "}
          {selectedOption}
          <ChevronDown className={`${isOpen?"rotate-180":""}`} />
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
        >
          <div className="py-1" role="none">
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              name="Title"
              onClick={(e) => handleSelect(e, "1")}
            >
              Title
            </button>
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              name="Heading"
              onClick={(e) => handleSelect(e, "2")}
            >
              Heading
            </button>
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              name="Subtitle"
              onClick={(e) => handleSelect(e, "3")}
            >
              Subtitle
            </button>
            <button
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              name="Normal"
              onClick={(e) => handleSelect(e, "0")}
            >
              Normal Text
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeadingDropdown;
