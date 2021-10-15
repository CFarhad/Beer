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
    }),
    pdfPages:{
      total:1,
      now:1
    }
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
      state.layer.add(state.transformer);
    },
    addToLayer: (state,action)=>{
      state.layer.add(action.payload)
    },
    addImage: (state,action)=>{
      let dataURL = action.payload.dataURL
      ;
      console.log(dataURL);
      let newImage = new Image();
      newImage.src = dataURL;
      let image = new Konva.Image({
        image: newImage,
        x: 0,
        y: 0,
        name: 'image',
        draggable: true,
      });
      let newTransformer = state.transformer;
      let newStage = state.stage;
      image.on('click', (e) => {
        newTransformer.nodes([image]);
        newTransformer.moveToTop();
        newStage.on('click', (e) => {
          if (e.target === newStage) {
            newTransformer.nodes([]);
          }
        });
      });
      
      image.on('dragstart', function () {
        this.moveToTop();
      });
      state.layer.add(image);
    },
    updateSize: (state,action)=>{
      state.size = {width:action.payload.width,height:action.payload.height,aspectRatio: action.payload.aspectRatio,scale:action.payload.scale};

      state.stage.width(+action.payload.width);
      state.stage.height(+action.payload.height);
      state.stage.scale({x:+action.payload.scale , y:+action.payload.scale});
    },
    setPdfTotalPage: (state,action)=>{
      state.pdfPages.total = action.payload;
    },
    setPdfNowPage: (state,action)=>{
      state.pdfPages.now = action.payload;
    },
    pdfNextPage: (state)=>{
      state.pdfPages.now++;
    },
    pdfPrevPage: (state)=>{
      state.pdfPages.now--;
    },
    pdfSetPage: (state,action)=>{
      state.pdfPages.now = action.payload;
    },
  }
})

export const {
  createStage,
  addToLayer,
  updateSize,
  setPdfTotalPage,
  setPdfNowPage,
  pdfNextPage,
  pdfPrevPage,
  addImage,
  pdfSetPage} = slice.actions;

export default slice.reducer;