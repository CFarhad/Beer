import { createSlice } from "@reduxjs/toolkit";
import Konva from "konva";

const slice = createSlice({
  name:"signature",
  initialState:{
    stage: null,
    layer: new Konva.Layer({}),
    line: {}
  },
  reducers:{
    createSignatureStage: (state,action)=>{
      let myStage = new Konva.Stage({
        container: action.payload.stage,
        width: 450,
        height: 250,
      })
      state.stage = myStage;
      state.stage.container().style.border = "1px dashed #1F2937";
      state.stage.add(state.layer);

      // Change the cursor when you enter and leave the mouse user
      state.stage.on('mouseenter',(e)=>{
        e.currentTarget.container().style.cursor = 'crosshair';
      })
      state.stage.on('mouseleave',(e)=>{
        e.currentTarget.container().style.cursor = 'default';
      })

    },
    addToSignatureLayer: (state,action)=>{
      state.layer.add(action.payload)
    },

    // When the delete selection button is clicked, the entire stage is cleared
    removeSignature: (state)=>{
      state.layer.children = [];
      state.layer.draw();
    },
    exportSignature: (state,action)=>{
      state.line = state.layer.toDataURL({
        pixelRatio: eval(action.payload.aspectRatio)
      })
      state.layer.children = [];
      state.layer.draw();
    }
  }
});

export const {createSignatureStage,addToSignatureLayer,removeSignature,exportSignature} = slice.actions;


export default slice.reducer