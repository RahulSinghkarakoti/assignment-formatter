import { useDispatch } from "react-redux";
import Accordion from "./Accordion";
import { addQuestionTemplate } from "../../store/DataSlice";
import DownlodeBtn from "./DownlodeBtn";

function Form() {

   

  const questiontemplate={  // inintal value of form
    question: "",
    code: "",
    output: "",
  }

  const dispatch = useDispatch();

  

  return (
    <div className=" w-2/5 h-full ">
      <div className="border-2 border-zinc-300 rounded-md p-2">
        <div className="space-y-4">
          <div className="text-3xl font-semibold">Input</div>
          <div className="question-dropdown">
            <Accordion   />
          </div>
          <div>
            <button
              className="bg-black hover:bg-zinc-800 text-white font-bold py-2 px-4 rounded-md"
              onClick={() => dispatch(addQuestionTemplate(questiontemplate))}   // initalize an empty question form
            >
              Add Question
            </button>
          </div>

           <DownlodeBtn/>
        </div>
      </div>
    </div>
  );
}

export default Form;
