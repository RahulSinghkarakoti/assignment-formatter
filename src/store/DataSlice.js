import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [
    
  {
      id: "m5yde6902",
      question: "Write a function to reverse a string in JavaScript",
      code: `function reverseString(str) {
return str.split('').reverse().join('');
}

const reversedString = reverseString('hello');
console.log(reversedString);`,
      output: "olleh"
  }, 
  ],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    addQuestionTemplate(state, action) {
      const id = Math.random().toString(36).substr(2, 9);
      const newQuestionTemplate = {
        id,
        ...action.payload,
      };
      state.data.push(newQuestionTemplate);
    },
    updteQuestion(state, action) {
      const { id, question, code, output } = action.payload;
// check for existing question
      const existingQuestion = state.data.find(
        (question) => question.id === id
      );
      if (existingQuestion) {  
        existingQuestion.question = question;
        existingQuestion.code = code;
        existingQuestion.output = output;
      }
    },
    deleteQuestion(state, action) {
      const { id } = action.payload;
      state.data = state.data.filter((question) => question.id != id);
    },
  },
});

export const { addQuestionTemplate, updteQuestion, deleteQuestion } =
  dataSlice.actions;
export default dataSlice.reducer;
