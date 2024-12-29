import { createSlice } from "@reduxjs/toolkit";

const EditorSlice=createSlice({
    name:"editor",
    initialState:{
        editor:"",
    },
    reducers:{
        setEditor(state,action){
            state.editor=action.payload;
            }
        }  
})

export const {setEditor} =EditorSlice.actions

export default EditorSlice.reducer;
