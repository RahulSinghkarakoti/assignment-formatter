import  { useState } from 'react';
import {ChevronDown } from "lucide-react"
import AccordionForm from './Accordion-form';
import { useSelector } from 'react-redux';

const Accordion = () => {
  const [openIndex, setOpenIndex] = useState(null); //only one accordion is open at a time
  const questions = useSelector((state) => state.data.data);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-full space-y-2 py-4 border-b-2 border-zinc-400">
      {questions && questions.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg shadow-sm"
        >
          <button
            onClick={() => toggleItem(index)}
            className="w-full flex justify-between items-center outline-none p-4 rounded-lg text-left  "
          >
            <span className="text-xl font-medium text-gray-800">{"Question"} {index+1}</span>
           <ChevronDown/>
          </button>
          {openIndex === index && (
            <>
             
            <AccordionForm props={item}/>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Accordion;