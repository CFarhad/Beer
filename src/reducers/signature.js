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
      let newStage = state.stage;
      let myStage = new Konva.Stage({
        container: action.payload.stage,
        width: 450,
        height: 250,
      })


      state.stage = myStage;
      state.stage.container().style.border = "1px dashed #6B7280";
      state.stage.add(state.layer);
    },
    addToSignatureLayer: (state,action)=>{
      state.layer.add(action.payload)
    },
    removeSignature: (state)=>{
      state.layer.children = [];
      state.layer.draw();
    },
    exportSignature: (state,action)=>{
      state.line = state.layer.toDataURL({
        pixelRatio: eval(action.payload.aspectRatio)
      })
    }
  }
});

export const {createSignatureStage,addToSignatureLayer,removeSignature,exportSignature} = slice.actions;


export default slice.reducer