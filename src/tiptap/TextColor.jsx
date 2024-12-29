import { useState } from "react";
import { ChevronDown } from "lucide-react";

const TextColor = ({  editor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("bg-black");

  const colors = [
    { label: "Black", value: "#000000", tailwind: "bg-black" },
    { label: "Red", value: "#EF4444", tailwind: "bg-red-500" },
    { label: "Green", value: "#10B981", tailwind: "bg-green-500" },
    { label: "Blue", value: "#3B82F6", tailwind: "bg-blue-500" },
  ];
 
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    editor.chain().focus().setColor(selectedColor).run();
  };

  const handleSelect = (color) => {
    const { value, tailwind } = color;
    setSelectedColor(tailwind);
    setIsOpen(false); 
    editor.chain().focus().setColor(value).run();
  };

 
  return (
    <div className="relative   text-left  ">
      <div>
        <div
          className="flex justify-around items-center gap-2 px-1 py-1 border-r-2 border-gray-400  bg-white text-gray-700"
          onClick={toggleDropdown}
        >
          <div
            className={`flex justify-around w-10 h-8 rounded-md   ${selectedColor}`}
          ></div>
          <ChevronDown className={`${isOpen?"rotate-180":""}`} />
        </div>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 p-2 origin-top-right flex justify-between gap-2 rounded-md bg-white  border-2 border-zinc-400  "
          role="menu"
        >
          {colors.map((color, index) => (
            <div
              key={index}
              className={`w-10 h-10 rounded-md ${color.tailwind}`}
              role="menuitem"
              name={color.label}
              onClick={() => handleSelect(color)}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TextColor;
