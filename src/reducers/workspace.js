import { createSlice } from "@reduxjs/toolkit"
import Konva from "konva"

const slice = createSlice({
  name: 'workspace',
  initialState: {
    stage: null,
    layer: new Konva.Layer({}),
    size:{
      width: 0,
      height:0,
      aspectRatio: '',
      scale: 0,
    },
    transformer: new Konva.Transformer({
      padding: 14,
      borderStrokeWidth: 1,
      anchorSize: 13,
      rotateAnchorOffset: 25,
      anchorFill: '#4338CA',
      anchorStroke: '#6366F1',
      anchorStrokeWidth: 2,
      anchorCornerRadius: 100,
    })
  },
  reducers: {
    createStage: (state,action)=>{
      let myStage = new Konva.Stage({
        container: action.payload.stage,
        width: state.size.width,
        height: state.size.height,
        scale: {x: 0.73 , y:0.73}
      })
      state.stage = myStage;
      state.stage.add(state.layer);
    },
    addToLayer: (state,action)=>{
      state.layer.add(action.payload)
    },
    updateSize: (state,action)=>{
      state.size = {width:action.payload.width,height:action.payload.height,aspectRatio: action.payload.aspectRatio,scale:action.payload.scale};

      state.stage.width(+action.payload.width);
      state.stage.height(+action.payload.height);
      state.stage.scale({x:+action.payload.scale , y:+action.payload.scale});
    }
  }
})

export const {createStage,addToLayer,updateSize} = slice.actions;

export default slice.reducer;