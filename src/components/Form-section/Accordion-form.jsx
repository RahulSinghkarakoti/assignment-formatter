 
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { deleteQuestion, updteQuestion } from "../../store/DataSlice";
function AccordionForm({ props }) {

  const { register,watch  } = useForm() //used react-hook form to manage form states
  const { question, code, output,id } = props;
  
  const formWatch=watch() //real time value of form

  const dispatch=useDispatch();


  useEffect(()=>{
   dispatch(updteQuestion({id:id,...formWatch})) //update store
   
   },[formWatch,dispatch,id])

  return (
    <div className="p-4 text-sm text-gray-600 space-y-2">

      <div className="flex flex-col  space-y-2 justify-between">
        <span>Question</span>
        <textarea
          name="question"
          {...register("question")}
          defaultValue={question}
          className="border-2 border-zinc-300 p-2 rounded-md text-xl outline-none"
        />
      </div>

      <div className="flex flex-col  space-y-2 justify-between">
        <span>Code</span>
        <textarea
          name="code"
           
            {...register("code")}
            defaultValue={code}
          className="border-2 border-zinc-300 p-2 rounded-md text-xl outline-none"
        />
      </div>
      <div className="flex flex-col  space-y-2 justify-between">
        <span>Output</span>
        <textarea
          name="output" 
            {...register("output")}
            defaultValue={output}
          className="border-2 border-zinc-300 p-2 rounded-md text-xl outline-none"
        />
      </div>
      <button
      onClick={()=>dispatch(deleteQuestion({id}))}
       className="bg-red-500 w-full text-white text-center text-xl p-2 rounded-md">
        Delete 
      </button>
    </div>
  );
}

export default AccordionForm;
