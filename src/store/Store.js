import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./DataSlice.js";
import editorReducer from "./EditorSlice.js"

export default configureStore({
  reducer: {
    data: dataReducer,  // for questions data
    editor: editorReducer // for editor data

  }
});

